#pragma once

#include <glm/glm.hpp>

namespace Onyx {

struct AABB {
    glm::vec2 min;
    glm::vec2 max;

    AABB() : min(0.0f), max(0.0f) {}
    AABB(const glm::vec2& min, const glm::vec2& max) : min(min), max(max) {}

    static AABB FromPositionSize(const glm::vec2& pos, const glm::vec2& size) {
        return AABB(pos, pos + size);
    }

    bool Overlaps(const AABB& other) const {
        return min.x < other.max.x && max.x > other.min.x &&
               min.y < other.max.y && max.y > other.min.y;
    }

    glm::vec2 GetCenter() const {
        return (min + max) * 0.5f;
    }

    glm::vec2 GetSize() const {
        return max - min;
    }

    glm::vec2 GetOverlap(const AABB& other) const {
        float overlapX = std::min(max.x, other.max.x) - std::max(min.x, other.min.x);
        float overlapY = std::min(max.y, other.max.y) - std::max(min.y, other.min.y);
        return {overlapX, overlapY};
    }
};

} // namespace Onyx
