#include "onyx/scene/Scene.h"
#include "onyx/renderer/Renderer2D.h"
#include "onyx/core/Logger.h"

#include <algorithm>
#include <sstream>

namespace Onyx {

Scene::Scene(const std::string& name)
    : m_Name(name) {}

Entity& Scene::CreateEntity(const std::string& tag) {
    auto entity = CreateScope<Entity>(m_NextEntityID++, tag);
    m_Entities.push_back(std::move(entity));

    std::stringstream ss;
    ss << "Created entity '" << tag << "' (ID: " << (m_NextEntityID - 1) << ")";
    ONYX_TRACE(ss.str());

    return *m_Entities.back();
}

void Scene::DestroyEntity(u32 id) {
    auto it = std::remove_if(m_Entities.begin(), m_Entities.end(),
                              [id](const Scope<Entity>& e) { return e->GetID() == id; });

    if (it != m_Entities.end()) {
        for (auto curr = it; curr != m_Entities.end(); ++curr) {
            if ((*curr)->HasComponent<ScriptComponent>()) {
                auto& script = (*curr)->GetComponent<ScriptComponent>();
                if (script.onDestroy) script.onDestroy();
            }
        }
        m_Entities.erase(it, m_Entities.end());
        m_PhysicsWorld.RemoveBody(id);
    }
}

Entity* Scene::FindEntity(u32 id) {
    for (auto& entity : m_Entities) {
        if (entity->GetID() == id) return entity.get();
    }
    return nullptr;
}

Entity* Scene::FindEntityByTag(const std::string& tag) {
    for (auto& entity : m_Entities) {
        if (entity->GetTag() == tag) return entity.get();
    }
    return nullptr;
}

void Scene::Init() {
    for (auto& entity : m_Entities) {
        if (entity->HasComponent<PhysicsComponent>()) {
            auto& physics = entity->GetComponent<PhysicsComponent>();
            auto& transform = entity->GetTransform();

            glm::vec2 colliderSize = physics.colliderSize;
            if (colliderSize == glm::vec2(0.0f) && entity->HasComponent<SpriteComponent>()) {
                colliderSize = entity->GetComponent<SpriteComponent>().size;
            }

            PhysicsBody body;
            body.position = &transform.position;
            body.size = colliderSize;
            body.rigidbody = &physics.rigidbody;
            body.entityId = entity->GetID();
            m_PhysicsWorld.AddBody(body);
        }

        if (entity->HasComponent<ScriptComponent>()) {
            auto& script = entity->GetComponent<ScriptComponent>();
            if (script.onInit) script.onInit();
        }
    }

    std::stringstream ss;
    ss << "Scene '" << m_Name << "' initialized with " << m_Entities.size() << " entities";
    ONYX_INFO(ss.str());
}

void Scene::Update(float dt) {
    m_PhysicsWorld.Step(dt);

    for (auto& entity : m_Entities) {
        if (!entity->IsActive()) continue;

        if (entity->HasComponent<ScriptComponent>()) {
            auto& script = entity->GetComponent<ScriptComponent>();
            if (script.onUpdate) script.onUpdate(dt);
        }
    }
}

void Scene::Render() {
    Renderer2D::BeginScene(m_Camera);

    for (auto& entity : m_Entities) {
        if (!entity->IsActive()) continue;
        if (!entity->HasComponent<SpriteComponent>()) continue;

        auto& transform = entity->GetTransform();
        auto& sprite = entity->GetComponent<SpriteComponent>();

        glm::vec2 renderPos = transform.position;
        glm::vec2 renderSize = sprite.size * transform.scale;

        if (transform.rotation != 0.0f) {
            Renderer2D::DrawRotatedQuad(renderPos, renderSize,
                                         transform.rotation, sprite.color);
        } else {
            Renderer2D::DrawQuad(renderPos, renderSize, sprite.color);
        }
    }

    Renderer2D::EndScene();
}

void Scene::Shutdown() {
    for (auto& entity : m_Entities) {
        if (entity->HasComponent<ScriptComponent>()) {
            auto& script = entity->GetComponent<ScriptComponent>();
            if (script.onDestroy) script.onDestroy();
        }
    }
    m_Entities.clear();
    m_PhysicsWorld.Clear();

    ONYX_INFO("Scene '" + m_Name + "' shut down");
}

} // namespace Onyx
