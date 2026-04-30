#pragma once

#include <glm/glm.hpp>

namespace Onyx {

class Camera2D {
public:
    Camera2D() = default;
    Camera2D(float width, float height);

    void SetPosition(const glm::vec2& position);
    void SetRotation(float rotation);
    void SetZoom(float zoom);
    void SetProjection(float width, float height);

    const glm::vec2& GetPosition() const { return m_Position; }
    float GetRotation() const { return m_Rotation; }
    float GetZoom() const { return m_Zoom; }

    const glm::mat4& GetViewProjectionMatrix();
    const glm::mat4& GetProjectionMatrix() const { return m_Projection; }
    const glm::mat4& GetViewMatrix();

private:
    void RecalculateView();

    glm::vec2 m_Position = {0.0f, 0.0f};
    float m_Rotation = 0.0f;
    float m_Zoom = 1.0f;

    glm::mat4 m_Projection = glm::mat4(1.0f);
    glm::mat4 m_View = glm::mat4(1.0f);
    glm::mat4 m_ViewProjection = glm::mat4(1.0f);

    bool m_Dirty = true;
};

} // namespace Onyx
