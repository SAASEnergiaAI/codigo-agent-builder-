#pragma once

#include <chrono>

namespace Onyx {

class Timer {
public:
    Timer();

    void Update();
    void Reset();

    float GetDeltaTime() const;
    float GetElapsedTime() const;
    float GetFPS() const;

private:
    using Clock = std::chrono::high_resolution_clock;
    using TimePoint = Clock::time_point;

    TimePoint m_StartTime;
    TimePoint m_LastFrameTime;
    float m_DeltaTime;
    float m_FPS;

    int m_FrameCount;
    float m_FPSTimer;
};

} // namespace Onyx
