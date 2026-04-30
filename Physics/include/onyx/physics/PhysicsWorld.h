#pragma once

#include "onyx/physics/AABB.h"
#include "onyx/physics/Rigidbody2D.h"

#include <glm/glm.hpp>
#include <vector>
#include <functional>

namespace Onyx {

struct PhysicsBody {
    glm::vec2* position;
    glm::vec2 size;
    Rigidbody2D* rigidbody;
    uint32_t entityId;
};

struct CollisionInfo {
    uint32_t entityA;
    uint32_t entityB;
    glm::vec2 normal;
    float penetration;
};

using CollisionCallback = std::function<void(const CollisionInfo&)>;

class PhysicsWorld {
public:
    PhysicsWorld();

    void SetGravity(const glm::vec2& gravity);
    const glm::vec2& GetGravity() const { return m_Gravity; }

    void AddBody(PhysicsBody body);
    void RemoveBody(uint32_t entityId);
    void Clear();

    void Step(float dt);

    void SetCollisionCallback(CollisionCallback callback);

private:
    void IntegrateBodies(float dt);
    void DetectCollisions();
    void ResolveCollision(PhysicsBody& a, PhysicsBody& b, const glm::vec2& overlap);

    glm::vec2 m_Gravity = {0.0f, -981.0f};
    std::vector<PhysicsBody> m_Bodies;
    CollisionCallback m_CollisionCallback;
};

} // namespace Onyx
