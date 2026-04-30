#include "onyx/input/InputManager.h"
#include "onyx/core/Logger.h"

#include <GLFW/glfw3.h>
#include <cstring>

namespace Onyx {

bool InputManager::s_Keys[MAX_KEYS] = {};
bool InputManager::s_PrevKeys[MAX_KEYS] = {};
bool InputManager::s_Buttons[MAX_BUTTONS] = {};
bool InputManager::s_PrevButtons[MAX_BUTTONS] = {};
glm::vec2 InputManager::s_MousePos = {0.0f, 0.0f};
float InputManager::s_ScrollDelta = 0.0f;

void InputManager::Init(GLFWwindow* window) {
    glfwSetKeyCallback(window, KeyCallback);
    glfwSetMouseButtonCallback(window, MouseButtonCallback);
    glfwSetCursorPosCallback(window, CursorPosCallback);
    glfwSetScrollCallback(window, ScrollCallback);

    std::memset(s_Keys, 0, sizeof(s_Keys));
    std::memset(s_PrevKeys, 0, sizeof(s_PrevKeys));
    std::memset(s_Buttons, 0, sizeof(s_Buttons));
    std::memset(s_PrevButtons, 0, sizeof(s_PrevButtons));

    ONYX_INFO("InputManager initialized");
}

void InputManager::Update() {
    std::memcpy(s_PrevKeys, s_Keys, sizeof(s_Keys));
    std::memcpy(s_PrevButtons, s_Buttons, sizeof(s_Buttons));
    s_ScrollDelta = 0.0f;
}

bool InputManager::IsKeyDown(int key) {
    return key >= 0 && key < MAX_KEYS && s_Keys[key];
}

bool InputManager::IsKeyPressed(int key) {
    return key >= 0 && key < MAX_KEYS && s_Keys[key] && !s_PrevKeys[key];
}

bool InputManager::IsKeyReleased(int key) {
    return key >= 0 && key < MAX_KEYS && !s_Keys[key] && s_PrevKeys[key];
}

bool InputManager::IsMouseButtonDown(int button) {
    return button >= 0 && button < MAX_BUTTONS && s_Buttons[button];
}

bool InputManager::IsMouseButtonPressed(int button) {
    return button >= 0 && button < MAX_BUTTONS && s_Buttons[button] && !s_PrevButtons[button];
}

bool InputManager::IsMouseButtonReleased(int button) {
    return button >= 0 && button < MAX_BUTTONS && !s_Buttons[button] && s_PrevButtons[button];
}

glm::vec2 InputManager::GetMousePosition() {
    return s_MousePos;
}

float InputManager::GetScrollDelta() {
    return s_ScrollDelta;
}

void InputManager::KeyCallback(GLFWwindow* window, int key, int scancode, int action, int mods) {
    if (key < 0 || key >= MAX_KEYS) return;
    s_Keys[key] = (action != GLFW_RELEASE);
}

void InputManager::MouseButtonCallback(GLFWwindow* window, int button, int action, int mods) {
    if (button < 0 || button >= MAX_BUTTONS) return;
    s_Buttons[button] = (action != GLFW_RELEASE);
}

void InputManager::CursorPosCallback(GLFWwindow* window, double xpos, double ypos) {
    s_MousePos = {static_cast<float>(xpos), static_cast<float>(ypos)};
}

void InputManager::ScrollCallback(GLFWwindow* window, double xoffset, double yoffset) {
    s_ScrollDelta = static_cast<float>(yoffset);
}

} // namespace Onyx
