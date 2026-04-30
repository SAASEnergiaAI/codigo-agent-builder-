#pragma once

#include <glm/glm.hpp>

namespace Onyx {

struct Rigidbody2D {
    glm::vec2 velocity = {0.0f, 0.0f};
    glm::vec2 acceleration = {0.0f, 0.0f};
    float mass = 1.0f;
    float drag = 0.0f;
    float restitution = 0.3f;
    bool isStatic = false;
    bool useGravity = true;

    void ApplyForce(const glm::vec2& force) {
        if (!isStatic && mass > 0.0f) {
            acceleration += force / mass;
        }
    }

    void ApplyImpulse(const glm::vec2& impulse) {
        if (!isStatic && mass > 0.0f) {
            velocity += impulse / mass;
        }
    }
};

} // namespace Onyx
