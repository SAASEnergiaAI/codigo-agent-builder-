#include "onyx/renderer/Camera2D.h"

#include <glm/gtc/matrix_transform.hpp>

namespace Onyx {

Camera2D::Camera2D(float width, float height) {
    SetProjection(width, height);
}

void Camera2D::SetPosition(const glm::vec2& position) {
    m_Position = position;
    m_Dirty = true;
}

void Camera2D::SetRotation(float rotation) {
    m_Rotation = rotation;
    m_Dirty = true;
}

void Camera2D::SetZoom(float zoom) {
    m_Zoom = zoom;
    m_Dirty = true;
}

void Camera2D::SetProjection(float width, float height) {
    float hw = width * 0.5f;
    float hh = height * 0.5f;
    m_Projection = glm::ortho(-hw, hw, -hh, hh, -1.0f, 1.0f);
    m_Dirty = true;
}

const glm::mat4& Camera2D::GetViewProjectionMatrix() {
    if (m_Dirty) {
        RecalculateView();
    }
    return m_ViewProjection;
}

const glm::mat4& Camera2D::GetViewMatrix() {
    if (m_Dirty) {
        RecalculateView();
    }
    return m_View;
}

void Camera2D::RecalculateView() {
    glm::mat4 transform = glm::translate(glm::mat4(1.0f),
                                          glm::vec3(m_Position, 0.0f));
    transform = glm::rotate(transform, glm::radians(m_Rotation),
                            glm::vec3(0.0f, 0.0f, 1.0f));
    transform = glm::scale(transform, glm::vec3(m_Zoom, m_Zoom, 1.0f));

    m_View = glm::inverse(transform);
    m_ViewProjection = m_Projection * m_View;
    m_Dirty = false;
}

} // namespace Onyx
