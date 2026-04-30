#pragma once

#include "onyx/physics/Rigidbody2D.h"

#include <glm/glm.hpp>
#include <string>
#include <functional>

namespace Onyx {

struct TagComponent {
    std::string tag = "Entity";
};

struct TransformComponent {
    glm::vec2 position = {0.0f, 0.0f};
    glm::vec2 scale = {1.0f, 1.0f};
    float rotation = 0.0f;
};

struct SpriteComponent {
    glm::vec4 color = {1.0f, 1.0f, 1.0f, 1.0f};
    glm::vec2 size = {100.0f, 100.0f};
    int textureId = -1;
};

struct PhysicsComponent {
    Rigidbody2D rigidbody;
    glm::vec2 colliderSize = {0.0f, 0.0f};
    bool hasCollider = true;
};

struct ScriptComponent {
    std::function<void(float)> onUpdate;
    std::function<void()> onInit;
    std::function<void()> onDestroy;
};

} // namespace Onyx
