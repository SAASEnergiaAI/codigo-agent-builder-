#pragma once

#include <GL/glew.h>
#include <string>

namespace Onyx {

class Texture2D {
public:
    Texture2D() = default;
    ~Texture2D();

    bool LoadFromFile(const std::string& path);
    bool Create(int width, int height, const unsigned char* data = nullptr,
                GLenum internalFormat = GL_RGBA, GLenum dataFormat = GL_RGBA);

    void Bind(GLuint slot = 0) const;
    void Unbind() const;

    int GetWidth() const { return m_Width; }
    int GetHeight() const { return m_Height; }
    GLuint GetID() const { return m_ID; }

private:
    GLuint m_ID = 0;
    int m_Width = 0;
    int m_Height = 0;
};

} // namespace Onyx
