#pragma once

#include <glm/glm.hpp>

struct GLFWwindow;

namespace Onyx {

class InputManager {
public:
    static void Init(GLFWwindow* window);
    static void Update();

    static bool IsKeyDown(int key);
    static bool IsKeyPressed(int key);
    static bool IsKeyReleased(int key);

    static bool IsMouseButtonDown(int button);
    static bool IsMouseButtonPressed(int button);
    static bool IsMouseButtonReleased(int button);

    static glm::vec2 GetMousePosition();
    static float GetScrollDelta();

private:
    static void KeyCallback(GLFWwindow* window, int key, int scancode, int action, int mods);
    static void MouseButtonCallback(GLFWwindow* window, int button, int action, int mods);
    static void CursorPosCallback(GLFWwindow* window, double xpos, double ypos);
    static void ScrollCallback(GLFWwindow* window, double xoffset, double yoffset);

    static constexpr int MAX_KEYS = 512;
    static constexpr int MAX_BUTTONS = 8;

    static bool s_Keys[MAX_KEYS];
    static bool s_PrevKeys[MAX_KEYS];
    static bool s_Buttons[MAX_BUTTONS];
    static bool s_PrevButtons[MAX_BUTTONS];
    static glm::vec2 s_MousePos;
    static float s_ScrollDelta;
};

} // namespace Onyx
