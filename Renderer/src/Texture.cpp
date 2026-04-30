#define STB_IMAGE_IMPLEMENTATION
#include "stb/stb_image.h"
#include "onyx/renderer/Texture.h"
#include "onyx/core/Logger.h"

namespace Onyx {

Texture2D::~Texture2D() {
    if (m_ID) glDeleteTextures(1, &m_ID);
}

bool Texture2D::LoadFromFile(const std::string& path) {
    stbi_set_flip_vertically_on_load(true);

    int channels;
    unsigned char* data = stbi_load(path.c_str(), &m_Width, &m_Height, &channels, 0);

    if (!data) {
        ONYX_ERROR("Failed to load texture: " + path);
        return false;
    }

    GLenum internalFmt = GL_RGBA;
    GLenum dataFmt = GL_RGBA;

    if (channels == 1) {
        internalFmt = GL_RED;
        dataFmt = GL_RED;
    } else if (channels == 3) {
        internalFmt = GL_RGB;
        dataFmt = GL_RGB;
    }

    bool result = Create(m_Width, m_Height, data, internalFmt, dataFmt);
    stbi_image_free(data);
    return result;
}

bool Texture2D::Create(int width, int height, const unsigned char* data,
                       GLenum internalFormat, GLenum dataFormat) {
    m_Width = width;
    m_Height = height;

    glGenTextures(1, &m_ID);
    glBindTexture(GL_TEXTURE_2D, m_ID);

    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_REPEAT);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_REPEAT);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_LINEAR);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_LINEAR);

    glTexImage2D(GL_TEXTURE_2D, 0, internalFormat, width, height, 0,
                 dataFormat, GL_UNSIGNED_BYTE, data);

    if (data) {
        glGenerateMipmap(GL_TEXTURE_2D);
    }

    return true;
}

void Texture2D::Bind(GLuint slot) const {
    glActiveTexture(GL_TEXTURE0 + slot);
    glBindTexture(GL_TEXTURE_2D, m_ID);
}

void Texture2D::Unbind() const {
    glBindTexture(GL_TEXTURE_2D, 0);
}

} // namespace Onyx
