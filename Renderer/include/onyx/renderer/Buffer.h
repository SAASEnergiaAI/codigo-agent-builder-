#pragma once

#include <GL/glew.h>
#include <vector>

namespace Onyx {

struct VertexAttribute {
    GLuint index;
    GLint size;
    GLenum type;
    GLboolean normalized;
    GLsizei stride;
    size_t offset;
};

class VertexBuffer {
public:
    VertexBuffer() = default;
    ~VertexBuffer();

    void Create(const void* data, GLsizeiptr size, GLenum usage = GL_STATIC_DRAW);
    void Update(const void* data, GLsizeiptr size, GLintptr offset = 0);
    void Bind() const;
    void Unbind() const;

    GLuint GetID() const { return m_ID; }

private:
    GLuint m_ID = 0;
};

class IndexBuffer {
public:
    IndexBuffer() = default;
    ~IndexBuffer();

    void Create(const GLuint* data, GLsizei count, GLenum usage = GL_STATIC_DRAW);
    void Bind() const;
    void Unbind() const;

    GLsizei GetCount() const { return m_Count; }
    GLuint GetID() const { return m_ID; }

private:
    GLuint m_ID = 0;
    GLsizei m_Count = 0;
};

class VertexArray {
public:
    VertexArray() = default;
    ~VertexArray();

    void Create();
    void Bind() const;
    void Unbind() const;

    void AddAttribute(GLuint index, GLint size, GLenum type, GLboolean normalized,
                      GLsizei stride, const void* offset);

    GLuint GetID() const { return m_ID; }

private:
    GLuint m_ID = 0;
};

} // namespace Onyx
