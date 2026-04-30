#include "onyx/core/Event.h"

namespace Onyx {

EventDispatcher& EventDispatcher::Instance() {
    static EventDispatcher instance;
    return instance;
}

void EventDispatcher::Subscribe(const std::string& eventType, EventCallback callback) {
    m_Listeners[eventType].push_back(std::move(callback));
}

void EventDispatcher::Dispatch(const Event& event) {
    auto it = m_Listeners.find(event.type);
    if (it != m_Listeners.end()) {
        for (auto& callback : it->second) {
            callback(event);
        }
    }
}

void EventDispatcher::Clear() {
    m_Listeners.clear();
}

} // namespace Onyx
