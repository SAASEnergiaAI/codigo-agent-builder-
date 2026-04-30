#include "onyx/renderer/Buffer.h"

namespace Onyx {

// VertexBuffer
VertexBuffer::~VertexBuffer() {
    if (m_ID) glDeleteBuffers(1, &m_ID);
}

void VertexBuffer::Create(const void* data, GLsizeiptr size, GLenum usage) {
    glGenBuffers(1, &m_ID);
    glBindBuffer(GL_ARRAY_BUFFER, m_ID);
    glBufferData(GL_ARRAY_BUFFER, size, data, usage);
}

void VertexBuffer::Update(const void* data, GLsizeiptr size, GLintptr offset) {
    glBindBuffer(GL_ARRAY_BUFFER, m_ID);
    glBufferSubData(GL_ARRAY_BUFFER, offset, size, data);
}

void VertexBuffer::Bind() const {
    glBindBuffer(GL_ARRAY_BUFFER, m_ID);
}

void VertexBuffer::Unbind() const {
    glBindBuffer(GL_ARRAY_BUFFER, 0);
}

// IndexBuffer
IndexBuffer::~IndexBuffer() {
    if (m_ID) glDeleteBuffers(1, &m_ID);
}

void IndexBuffer::Create(const GLuint* data, GLsizei count, GLenum usage) {
    m_Count = count;
    glGenBuffers(1, &m_ID);
    glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, m_ID);
    glBufferData(GL_ELEMENT_ARRAY_BUFFER, count * sizeof(GLuint), data, usage);
}

void IndexBuffer::Bind() const {
    glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, m_ID);
}

void IndexBuffer::Unbind() const {
    glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, 0);
}

// VertexArray
VertexArray::~VertexArray() {
    if (m_ID) glDeleteVertexArrays(1, &m_ID);
}

void VertexArray::Create() {
    glGenVertexArrays(1, &m_ID);
}

void VertexArray::Bind() const {
    glBindVertexArray(m_ID);
}

void VertexArray::Unbind() const {
    glBindVertexArray(0);
}

void VertexArray::AddAttribute(GLuint index, GLint size, GLenum type,
                                GLboolean normalized, GLsizei stride, const void* offset) {
    glEnableVertexAttribArray(index);
    glVertexAttribPointer(index, size, type, normalized, stride, offset);
}

} // namespace Onyx
