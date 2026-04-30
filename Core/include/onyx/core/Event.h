#pragma once

#include <functional>
#include <unordered_map>
#include <vector>
#include <string>
#include <any>

namespace Onyx {

struct Event {
    std::string type;
    std::unordered_map<std::string, std::any> data;

    Event(const std::string& t) : type(t) {}

    template<typename T>
    void Set(const std::string& key, const T& value) {
        data[key] = value;
    }

    template<typename T>
    T Get(const std::string& key) const {
        auto it = data.find(key);
        if (it != data.end()) {
            return std::any_cast<T>(it->second);
        }
        return T{};
    }
};

using EventCallback = std::function<void(const Event&)>;

class EventDispatcher {
public:
    static EventDispatcher& Instance();

    void Subscribe(const std::string& eventType, EventCallback callback);
    void Dispatch(const Event& event);
    void Clear();

private:
    EventDispatcher() = default;
    std::unordered_map<std::string, std::vector<EventCallback>> m_Listeners;
};

} // namespace Onyx
