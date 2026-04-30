#pragma once

#include "onyx/scene/Components.h"
#include "onyx/core/Types.h"

#include <unordered_map>
#include <typeindex>
#include <any>

namespace Onyx {

class Entity {
public:
    Entity(u32 id, const std::string& tag = "Entity");
    ~Entity() = default;

    u32 GetID() const { return m_ID; }
    const std::string& GetTag() const { return m_Tag.tag; }
    bool IsActive() const { return m_Active; }
    void SetActive(bool active) { m_Active = active; }

    template<typename T>
    T& AddComponent(const T& component = T{}) {
        m_Components[std::type_index(typeid(T))] = component;
        return std::any_cast<T&>(m_Components[std::type_index(typeid(T))]);
    }

    template<typename T>
    T& GetComponent() {
        return std::any_cast<T&>(m_Components.at(std::type_index(typeid(T))));
    }

    template<typename T>
    const T& GetComponent() const {
        return std::any_cast<const T&>(m_Components.at(std::type_index(typeid(T))));
    }

    template<typename T>
    bool HasComponent() const {
        return m_Components.count(std::type_index(typeid(T))) > 0;
    }

    template<typename T>
    void RemoveComponent() {
        m_Components.erase(std::type_index(typeid(T)));
    }

    TransformComponent& GetTransform() { return m_Transform; }
    const TransformComponent& GetTransform() const { return m_Transform; }

private:
    u32 m_ID;
    TagComponent m_Tag;
    TransformComponent m_Transform;
    bool m_Active = true;
    std::unordered_map<std::type_index, std::any> m_Components;
};

} // namespace Onyx
