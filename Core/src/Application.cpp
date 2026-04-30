#include "onyx/core/Application.h"
#include "onyx/core/Event.h"

#include <GL/glew.h>
#include <GLFW/glfw3.h>
#include <stdexcept>
#include <sstream>

namespace Onyx {

Application* Application::s_Instance = nullptr;

Application::Application(const WindowConfig& config) {
    if (s_Instance) {
        throw std::runtime_error("Application already exists");
    }
    s_Instance = this;

    ONYX_INFO("=== ONYX ENGINE v0.1.0 ===");
    ONYX_INFO("Initializing...");

    if (!InitWindow(config)) {
        throw std::runtime_error("Failed to initialize window");
    }
}

Application::~Application() {
    ShutdownWindow();
    s_Instance = nullptr;
}

bool Application::InitWindow(const WindowConfig& config) {
    if (!glfwInit()) {
        ONYX_FATAL("Failed to initialize GLFW");
        return false;
    }

    glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
    glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 3);
    glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);
    glfwWindowHint(GLFW_RESIZABLE, config.resizable ? GLFW_TRUE : GLFW_FALSE);

    m_Width = config.width;
    m_Height = config.height;

    m_Window = glfwCreateWindow(m_Width, m_Height, config.title.c_str(), nullptr, nullptr);
    if (!m_Window) {
        ONYX_FATAL("Failed to create GLFW window");
        glfwTerminate();
        return false;
    }

    glfwMakeContextCurrent(m_Window);
    glfwSetWindowUserPointer(m_Window, this);
    glfwSetFramebufferSizeCallback(m_Window, FramebufferSizeCallback);

    if (config.vsync) {
        glfwSwapInterval(1);
    }

    GLenum err = glewInit();
    if (err != GLEW_OK) {
        std::stringstream ss;
        ss << "Failed to initialize GLEW: " << glewGetErrorString(err);
        ONYX_FATAL(ss.str());
        return false;
    }

    std::stringstream ss;
    ss << "OpenGL Version: " << glGetString(GL_VERSION);
    ONYX_INFO(ss.str());

    ss.str("");
    ss << "Renderer: " << glGetString(GL_RENDERER);
    ONYX_INFO(ss.str());

    glEnable(GL_BLEND);
    glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);

    ONYX_INFO("Window created successfully");
    return true;
}

void Application::ShutdownWindow() {
    if (m_Window) {
        glfwDestroyWindow(m_Window);
        m_Window = nullptr;
    }
    glfwTerminate();
    ONYX_INFO("ONYX ENGINE shut down");
}

void Application::Run() {
    m_Running = true;
    m_Timer.Reset();

    OnInit();

    while (m_Running && !glfwWindowShouldClose(m_Window)) {
        m_Timer.Update();
        float dt = m_Timer.GetDeltaTime();

        glfwPollEvents();

        OnUpdate(dt);

        glClearColor(0.1f, 0.1f, 0.12f, 1.0f);
        glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

        OnRender();

        glfwSwapBuffers(m_Window);
    }

    OnShutdown();
}

void Application::Quit() {
    m_Running = false;
}

void Application::FramebufferSizeCallback(GLFWwindow* window, int width, int height) {
    auto* app = static_cast<Application*>(glfwGetWindowUserPointer(window));
    if (app) {
        app->m_Width = width;
        app->m_Height = height;
        glViewport(0, 0, width, height);
        app->OnResize(width, height);

        Event evt("WindowResize");
        evt.Set("width", width);
        evt.Set("height", height);
        EventDispatcher::Instance().Dispatch(evt);
    }
}

} // namespace Onyx
