#pragma once

#include <string>
#include <glm/glm.hpp>
#include <GL/glew.h>

namespace Onyx {

class Shader {
public:
    Shader() = default;
    ~Shader();

    bool LoadFromSource(const std::string& vertexSrc, const std::string& fragmentSrc);
    bool LoadFromFile(const std::string& vertexPath, const std::string& fragmentPath);

    void Bind() const;
    void Unbind() const;

    void SetInt(const std::string& name, int value) const;
    void SetFloat(const std::string& name, float value) const;
    void SetVec2(const std::string& name, const glm::vec2& value) const;
    void SetVec3(const std::string& name, const glm::vec3& value) const;
    void SetVec4(const std::string& name, const glm::vec4& value) const;
    void SetMat4(const std::string& name, const glm::mat4& value) const;

    GLuint GetID() const { return m_ProgramID; }

private:
    GLuint CompileShader(GLenum type, const std::string& source);
    GLint GetUniformLocation(const std::string& name) const;

    GLuint m_ProgramID = 0;
};

} // namespace Onyx
