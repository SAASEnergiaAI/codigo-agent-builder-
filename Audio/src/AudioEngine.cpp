#include "onyx/audio/AudioEngine.h"
#include "onyx/core/Logger.h"

#ifdef ONYX_AUDIO_ENABLED
#include <AL/al.h>
#include <AL/alc.h>
#endif

#include <vector>
#include <fstream>
#include <cstring>

namespace Onyx {

bool AudioEngine::s_Initialized = false;
float AudioEngine::s_MasterVolume = 1.0f;

#ifdef ONYX_AUDIO_ENABLED
static ALCdevice* s_Device = nullptr;
static ALCcontext* s_Context = nullptr;
static std::unordered_map<SoundID, ALuint> s_Buffers;
static std::unordered_map<SoundID, ALuint> s_Sources;
static SoundID s_NextID = 1;
#endif

bool AudioEngine::Init() {
#ifdef ONYX_AUDIO_ENABLED
    s_Device = alcOpenDevice(nullptr);
    if (!s_Device) {
        ONYX_ERROR("Failed to open audio device");
        return false;
    }

    s_Context = alcCreateContext(s_Device, nullptr);
    if (!s_Context) {
        ONYX_ERROR("Failed to create audio context");
        alcCloseDevice(s_Device);
        return false;
    }

    alcMakeContextCurrent(s_Context);
    s_Initialized = true;
    ONYX_INFO("AudioEngine initialized (OpenAL)");
    return true;
#else
    ONYX_WARN("AudioEngine: OpenAL not available, audio disabled");
    return false;
#endif
}

void AudioEngine::Shutdown() {
#ifdef ONYX_AUDIO_ENABLED
    for (auto& [id, source] : s_Sources) {
        alDeleteSources(1, &source);
    }
    for (auto& [id, buffer] : s_Buffers) {
        alDeleteBuffers(1, &buffer);
    }
    s_Sources.clear();
    s_Buffers.clear();

    if (s_Context) {
        alcMakeContextCurrent(nullptr);
        alcDestroyContext(s_Context);
        s_Context = nullptr;
    }
    if (s_Device) {
        alcCloseDevice(s_Device);
        s_Device = nullptr;
    }
    s_Initialized = false;
    ONYX_INFO("AudioEngine shut down");
#endif
}

SoundID AudioEngine::LoadSound(const std::string& path) {
#ifdef ONYX_AUDIO_ENABLED
    if (!s_Initialized) return 0;

    // Simple WAV loader
    std::ifstream file(path, std::ios::binary);
    if (!file.is_open()) {
        ONYX_ERROR("Failed to open audio file: " + path);
        return 0;
    }

    char riff[4];
    file.read(riff, 4);
    if (std::strncmp(riff, "RIFF", 4) != 0) {
        ONYX_ERROR("Invalid WAV file: " + path);
        return 0;
    }

    uint32_t fileSize;
    file.read(reinterpret_cast<char*>(&fileSize), 4);

    char wave[4];
    file.read(wave, 4);

    char fmt[4];
    file.read(fmt, 4);

    uint32_t fmtSize;
    file.read(reinterpret_cast<char*>(&fmtSize), 4);

    uint16_t audioFormat, numChannels;
    uint32_t sampleRate, byteRate;
    uint16_t blockAlign, bitsPerSample;

    file.read(reinterpret_cast<char*>(&audioFormat), 2);
    file.read(reinterpret_cast<char*>(&numChannels), 2);
    file.read(reinterpret_cast<char*>(&sampleRate), 4);
    file.read(reinterpret_cast<char*>(&byteRate), 4);
    file.read(reinterpret_cast<char*>(&blockAlign), 2);
    file.read(reinterpret_cast<char*>(&bitsPerSample), 2);

    if (fmtSize > 16) {
        file.seekg(fmtSize - 16, std::ios::cur);
    }

    char dataHeader[4];
    uint32_t dataSize;
    file.read(dataHeader, 4);
    file.read(reinterpret_cast<char*>(&dataSize), 4);

    while (std::strncmp(dataHeader, "data", 4) != 0) {
        file.seekg(dataSize, std::ios::cur);
        file.read(dataHeader, 4);
        file.read(reinterpret_cast<char*>(&dataSize), 4);
        if (file.eof()) {
            ONYX_ERROR("No data chunk in WAV: " + path);
            return 0;
        }
    }

    std::vector<char> audioData(dataSize);
    file.read(audioData.data(), dataSize);

    ALenum format = AL_FORMAT_MONO16;
    if (numChannels == 1 && bitsPerSample == 8)
        format = AL_FORMAT_MONO8;
    else if (numChannels == 1 && bitsPerSample == 16)
        format = AL_FORMAT_MONO16;
    else if (numChannels == 2 && bitsPerSample == 8)
        format = AL_FORMAT_STEREO8;
    else if (numChannels == 2 && bitsPerSample == 16)
        format = AL_FORMAT_STEREO16;

    ALuint buffer;
    alGenBuffers(1, &buffer);
    alBufferData(buffer, format, audioData.data(), dataSize, sampleRate);

    ALuint source;
    alGenSources(1, &source);
    alSourcei(source, AL_BUFFER, buffer);

    SoundID id = s_NextID++;
    s_Buffers[id] = buffer;
    s_Sources[id] = source;

    ONYX_INFO("Loaded audio: " + path);
    return id;
#else
    return 0;
#endif
}

void AudioEngine::Play(SoundID sound, float volume, bool loop) {
#ifdef ONYX_AUDIO_ENABLED
    if (!s_Initialized) return;
    auto it = s_Sources.find(sound);
    if (it == s_Sources.end()) return;

    alSourcef(it->second, AL_GAIN, volume * s_MasterVolume);
    alSourcei(it->second, AL_LOOPING, loop ? AL_TRUE : AL_FALSE);
    alSourcePlay(it->second);
#endif
}

void AudioEngine::Stop(SoundID sound) {
#ifdef ONYX_AUDIO_ENABLED
    if (!s_Initialized) return;
    auto it = s_Sources.find(sound);
    if (it == s_Sources.end()) return;
    alSourceStop(it->second);
#endif
}

void AudioEngine::SetMasterVolume(float volume) {
    s_MasterVolume = volume;
}

bool AudioEngine::IsInitialized() {
    return s_Initialized;
}

} // namespace Onyx
