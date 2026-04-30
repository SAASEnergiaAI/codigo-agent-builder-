#include "onyx/scene/Entity.h"

namespace Onyx {

Entity::Entity(u32 id, const std::string& tag)
    : m_ID(id) {
    m_Tag.tag = tag;
}

} // namespace Onyx
