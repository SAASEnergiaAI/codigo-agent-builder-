#pragma once

#include <string>
#include <iostream>
#include <sstream>
#include <ctime>

namespace Onyx {

enum class LogLevel {
    Trace = 0,
    Info,
    Warn,
    Error,
    Fatal
};

class Logger {
public:
    static void SetLevel(LogLevel level);
    static LogLevel GetLevel();

    static void Trace(const std::string& msg);
    static void Info(const std::string& msg);
    static void Warn(const std::string& msg);
    static void Error(const std::string& msg);
    static void Fatal(const std::string& msg);

private:
    static void Log(LogLevel level, const std::string& msg);
    static const char* LevelToString(LogLevel level);
    static const char* LevelColor(LogLevel level);

    static LogLevel s_LogLevel;
};

} // namespace Onyx

#define ONYX_TRACE(msg) ::Onyx::Logger::Trace(msg)
#define ONYX_INFO(msg)  ::Onyx::Logger::Info(msg)
#define ONYX_WARN(msg)  ::Onyx::Logger::Warn(msg)
#define ONYX_ERROR(msg) ::Onyx::Logger::Error(msg)
#define ONYX_FATAL(msg) ::Onyx::Logger::Fatal(msg)
