#include "onyx/renderer/Shader.h"
#include "onyx/core/Logger.h"

#include <fstream>
#include <sstream>
#include <glm/gtc/type_ptr.hpp>

namespace Onyx {

Shader::~Shader() {
    if (m_ProgramID) {
        glDeleteProgram(m_ProgramID);
    }
}

bool Shader::LoadFromSource(const std::string& vertexSrc, const std::string& fragmentSrc) {
    GLuint vs = CompileShader(GL_VERTEX_SHADER, vertexSrc);
    GLuint fs = CompileShader(GL_FRAGMENT_SHADER, fragmentSrc);

    if (!vs || !fs) return false;

    m_ProgramID = glCreateProgram();
    glAttachShader(m_ProgramID, vs);
    glAttachShader(m_ProgramID, fs);
    glLinkProgram(m_ProgramID);

    GLint linked;
    glGetProgramiv(m_ProgramID, GL_LINK_STATUS, &linked);
    if (!linked) {
        char log[512];
        glGetProgramInfoLog(m_ProgramID, 512, nullptr, log);
        ONYX_ERROR(std::string("Shader link error: ") + log);
        glDeleteProgram(m_ProgramID);
        m_ProgramID = 0;
    }

    glDeleteShader(vs);
    glDeleteShader(fs);

    return m_ProgramID != 0;
}

bool Shader::LoadFromFile(const std::string& vertexPath, const std::string& fragmentPath) {
    auto readFile = [](const std::string& path) -> std::string {
        std::ifstream file(path);
        if (!file.is_open()) {
            ONYX_ERROR("Cannot open shader file: " + path);
            return "";
        }
        std::stringstream ss;
        ss << file.rdbuf();
        return ss.str();
    };

    return LoadFromSource(readFile(vertexPath), readFile(fragmentPath));
}

void Shader::Bind() const {
    glUseProgram(m_ProgramID);
}

void Shader::Unbind() const {
    glUseProgram(0);
}

GLuint Shader::CompileShader(GLenum type, const std::string& source) {
    GLuint shader = glCreateShader(type);
    const char* src = source.c_str();
    glShaderSource(shader, 1, &src, nullptr);
    glCompileShader(shader);

    GLint compiled;
    glGetShaderiv(shader, GL_COMPILE_STATUS, &compiled);
    if (!compiled) {
        char log[512];
        glGetShaderInfoLog(shader, 512, nullptr, log);
        const char* typeStr = (type == GL_VERTEX_SHADER) ? "vertex" : "fragment";
        ONYX_ERROR(std::string("Shader compile error (") + typeStr + "): " + log);
        glDeleteShader(shader);
        return 0;
    }
    return shader;
}

GLint Shader::GetUniformLocation(const std::string& name) const {
    return glGetUniformLocation(m_ProgramID, name.c_str());
}

void Shader::SetInt(const std::string& name, int value) const {
    glUniform1i(GetUniformLocation(name), value);
}

void Shader::SetFloat(const std::string& name, float value) const {
    glUniform1f(GetUniformLocation(name), value);
}

void Shader::SetVec2(const std::string& name, const glm::vec2& value) const {
    glUniform2f(GetUniformLocation(name), value.x, value.y);
}

void Shader::SetVec3(const std::string& name, const glm::vec3& value) const {
    glUniform3f(GetUniformLocation(name), value.x, value.y, value.z);
}

void Shader::SetVec4(const std::string& name, const glm::vec4& value) const {
    glUniform4f(GetUniformLocation(name), value.x, value.y, value.z, value.w);
}

void Shader::SetMat4(const std::string& name, const glm::mat4& value) const {
    glUniformMatrix4fv(GetUniformLocation(name), 1, GL_FALSE, glm::value_ptr(value));
}

} // namespace Onyx
