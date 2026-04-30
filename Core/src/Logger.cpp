#include "onyx/core/Logger.h"
#include <iomanip>

namespace Onyx {

LogLevel Logger::s_LogLevel = LogLevel::Trace;

void Logger::SetLevel(LogLevel level) {
    s_LogLevel = level;
}

LogLevel Logger::GetLevel() {
    return s_LogLevel;
}

void Logger::Trace(const std::string& msg) { Log(LogLevel::Trace, msg); }
void Logger::Info(const std::string& msg)  { Log(LogLevel::Info, msg); }
void Logger::Warn(const std::string& msg)  { Log(LogLevel::Warn, msg); }
void Logger::Error(const std::string& msg) { Log(LogLevel::Error, msg); }
void Logger::Fatal(const std::string& msg) { Log(LogLevel::Fatal, msg); }

void Logger::Log(LogLevel level, const std::string& msg) {
    if (level < s_LogLevel) return;

    auto now = std::time(nullptr);
    auto tm = *std::localtime(&now);

    std::cout << LevelColor(level)
              << "[" << std::put_time(&tm, "%H:%M:%S") << "] "
              << "[" << LevelToString(level) << "] "
              << msg
              << "\033[0m" << std::endl;
}

const char* Logger::LevelToString(LogLevel level) {
    switch (level) {
        case LogLevel::Trace: return "TRACE";
        case LogLevel::Info:  return "INFO ";
        case LogLevel::Warn:  return "WARN ";
        case LogLevel::Error: return "ERROR";
        case LogLevel::Fatal: return "FATAL";
    }
    return "?????";
}

const char* Logger::LevelColor(LogLevel level) {
    switch (level) {
        case LogLevel::Trace: return "\033[37m";
        case LogLevel::Info:  return "\033[32m";
        case LogLevel::Warn:  return "\033[33m";
        case LogLevel::Error: return "\033[31m";
        case LogLevel::Fatal: return "\033[35m";
    }
    return "\033[0m";
}

} // namespace Onyx
