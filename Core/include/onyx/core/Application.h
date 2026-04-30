#pragma once

#include "onyx/core/Types.h"
#include "onyx/core/Timer.h"
#include "onyx/core/Logger.h"

#include <string>

struct GLFWwindow;

namespace Onyx {

struct WindowConfig {
    std::string title = "ONYX ENGINE";
    int width = 1280;
    int height = 720;
    bool vsync = true;
    bool resizable = true;
};

class Application {
public:
    Application(const WindowConfig& config = {});
    virtual ~Application();

    void Run();
    void Quit();

    GLFWwindow* GetWindow() const { return m_Window; }
    int GetWindowWidth() const { return m_Width; }
    int GetWindowHeight() const { return m_Height; }
    float GetDeltaTime() const { return m_Timer.GetDeltaTime(); }
    float GetFPS() const { return m_Timer.GetFPS(); }

    static Application& Get() { return *s_Instance; }

protected:
    virtual void OnInit() {}
    virtual void OnUpdate(float dt) {}
    virtual void OnRender() {}
    virtual void OnShutdown() {}
    virtual void OnResize(int width, int height) {}

private:
    bool InitWindow(const WindowConfig& config);
    void ShutdownWindow();

    static void FramebufferSizeCallback(GLFWwindow* window, int width, int height);

    GLFWwindow* m_Window = nullptr;
    int m_Width = 1280;
    int m_Height = 720;
    bool m_Running = false;
    Timer m_Timer;

    static Application* s_Instance;
};

} // namespace Onyx
