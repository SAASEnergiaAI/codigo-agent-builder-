#pragma once

#include "onyx/scene/Entity.h"
#include "onyx/physics/PhysicsWorld.h"
#include "onyx/renderer/Camera2D.h"
#include "onyx/core/Types.h"

#include <vector>
#include <string>

namespace Onyx {

class Scene {
public:
    Scene(const std::string& name = "Untitled");
    ~Scene() = default;

    Entity& CreateEntity(const std::string& tag = "Entity");
    void DestroyEntity(u32 id);
    Entity* FindEntity(u32 id);
    Entity* FindEntityByTag(const std::string& tag);

    void Init();
    void Update(float dt);
    void Render();
    void Shutdown();

    const std::string& GetName() const { return m_Name; }
    Camera2D& GetCamera() { return m_Camera; }
    PhysicsWorld& GetPhysicsWorld() { return m_PhysicsWorld; }
    const std::vector<Scope<Entity>>& GetEntities() const { return m_Entities; }

private:
    std::string m_Name;
    std::vector<Scope<Entity>> m_Entities;
    u32 m_NextEntityID = 0;
    Camera2D m_Camera;
    PhysicsWorld m_PhysicsWorld;
};

} // namespace Onyx
