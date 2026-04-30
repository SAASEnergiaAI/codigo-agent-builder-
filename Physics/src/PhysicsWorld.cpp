#include "onyx/physics/PhysicsWorld.h"

#include <algorithm>
#include <cmath>

namespace Onyx {

PhysicsWorld::PhysicsWorld() {}

void PhysicsWorld::SetGravity(const glm::vec2& gravity) {
    m_Gravity = gravity;
}

void PhysicsWorld::AddBody(PhysicsBody body) {
    m_Bodies.push_back(body);
}

void PhysicsWorld::RemoveBody(uint32_t entityId) {
    m_Bodies.erase(
        std::remove_if(m_Bodies.begin(), m_Bodies.end(),
                       [entityId](const PhysicsBody& b) { return b.entityId == entityId; }),
        m_Bodies.end());
}

void PhysicsWorld::Clear() {
    m_Bodies.clear();
}

void PhysicsWorld::Step(float dt) {
    IntegrateBodies(dt);
    DetectCollisions();
}

void PhysicsWorld::SetCollisionCallback(CollisionCallback callback) {
    m_CollisionCallback = std::move(callback);
}

void PhysicsWorld::IntegrateBodies(float dt) {
    for (auto& body : m_Bodies) {
        if (!body.rigidbody || body.rigidbody->isStatic) continue;

        auto& rb = *body.rigidbody;

        if (rb.useGravity) {
            rb.acceleration += m_Gravity;
        }

        rb.velocity += rb.acceleration * dt;

        if (rb.drag > 0.0f) {
            rb.velocity *= (1.0f - rb.drag * dt);
        }

        *body.position += rb.velocity * dt;

        rb.acceleration = {0.0f, 0.0f};
    }
}

void PhysicsWorld::DetectCollisions() {
    for (size_t i = 0; i < m_Bodies.size(); i++) {
        for (size_t j = i + 1; j < m_Bodies.size(); j++) {
            AABB a = AABB::FromPositionSize(*m_Bodies[i].position, m_Bodies[i].size);
            AABB b = AABB::FromPositionSize(*m_Bodies[j].position, m_Bodies[j].size);

            if (a.Overlaps(b)) {
                glm::vec2 overlap = a.GetOverlap(b);
                ResolveCollision(m_Bodies[i], m_Bodies[j], overlap);
            }
        }
    }
}

void PhysicsWorld::ResolveCollision(PhysicsBody& a, PhysicsBody& b, const glm::vec2& overlap) {
    if (!a.rigidbody && !b.rigidbody) return;

    glm::vec2 normal;
    float penetration;

    if (overlap.x < overlap.y) {
        penetration = overlap.x;
        normal = (a.position->x < b.position->x) ? glm::vec2(-1, 0) : glm::vec2(1, 0);
    } else {
        penetration = overlap.y;
        normal = (a.position->y < b.position->y) ? glm::vec2(0, -1) : glm::vec2(0, 1);
    }

    bool aStatic = !a.rigidbody || a.rigidbody->isStatic;
    bool bStatic = !b.rigidbody || b.rigidbody->isStatic;

    if (aStatic && bStatic) return;

    if (!aStatic && !bStatic) {
        *a.position += normal * (penetration * 0.5f);
        *b.position -= normal * (penetration * 0.5f);

        float restitution = std::min(a.rigidbody->restitution, b.rigidbody->restitution);
        glm::vec2 relVel = b.rigidbody->velocity - a.rigidbody->velocity;
        float velAlongNormal = glm::dot(relVel, normal);

        if (velAlongNormal > 0) return;

        float totalMass = a.rigidbody->mass + b.rigidbody->mass;
        float impulseMag = -(1.0f + restitution) * velAlongNormal / totalMass;
        glm::vec2 impulse = impulseMag * normal;

        a.rigidbody->velocity -= impulse * (1.0f / a.rigidbody->mass) * a.rigidbody->mass;
        b.rigidbody->velocity += impulse * (1.0f / b.rigidbody->mass) * b.rigidbody->mass;
    } else if (aStatic) {
        *b.position -= normal * penetration;
        float restitution = b.rigidbody->restitution;
        float velAlongNormal = glm::dot(b.rigidbody->velocity, normal);
        b.rigidbody->velocity -= (1.0f + restitution) * velAlongNormal * normal;
    } else {
        *a.position += normal * penetration;
        float restitution = a.rigidbody->restitution;
        float velAlongNormal = glm::dot(a.rigidbody->velocity, normal);
        a.rigidbody->velocity -= (1.0f + restitution) * velAlongNormal * normal;
    }

    if (m_CollisionCallback) {
        CollisionInfo info;
        info.entityA = a.entityId;
        info.entityB = b.entityId;
        info.normal = normal;
        info.penetration = penetration;
        m_CollisionCallback(info);
    }
}

} // namespace Onyx
