#pragma once

#include <string>
#include <unordered_map>

namespace Onyx {

using SoundID = unsigned int;

class AudioEngine {
public:
    static bool Init();
    static void Shutdown();

    static SoundID LoadSound(const std::string& path);
    static void Play(SoundID sound, float volume = 1.0f, bool loop = false);
    static void Stop(SoundID sound);
    static void SetMasterVolume(float volume);

    static bool IsInitialized();

private:
    static bool s_Initialized;
    static float s_MasterVolume;
};

} // namespace Onyx
