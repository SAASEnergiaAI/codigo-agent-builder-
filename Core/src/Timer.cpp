#include "onyx/core/Timer.h"

namespace Onyx {

Timer::Timer()
    : m_StartTime(Clock::now())
    , m_LastFrameTime(Clock::now())
    , m_DeltaTime(0.0f)
    , m_FPS(0.0f)
    , m_FrameCount(0)
    , m_FPSTimer(0.0f) {}

void Timer::Update() {
    auto now = Clock::now();
    m_DeltaTime = std::chrono::duration<float>(now - m_LastFrameTime).count();
    m_LastFrameTime = now;

    m_FrameCount++;
    m_FPSTimer += m_DeltaTime;

    if (m_FPSTimer >= 1.0f) {
        m_FPS = static_cast<float>(m_FrameCount) / m_FPSTimer;
        m_FrameCount = 0;
        m_FPSTimer = 0.0f;
    }
}

void Timer::Reset() {
    m_StartTime = Clock::now();
    m_LastFrameTime = m_StartTime;
    m_DeltaTime = 0.0f;
    m_FPS = 0.0f;
    m_FrameCount = 0;
    m_FPSTimer = 0.0f;
}

float Timer::GetDeltaTime() const {
    return m_DeltaTime;
}

float Timer::GetElapsedTime() const {
    auto now = Clock::now();
    return std::chrono::duration<float>(now - m_StartTime).count();
}

float Timer::GetFPS() const {
    return m_FPS;
}

} // namespace Onyx
