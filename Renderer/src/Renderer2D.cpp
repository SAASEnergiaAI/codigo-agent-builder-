#include "onyx/renderer/Renderer2D.h"
#include "onyx/core/Logger.h"

#include <glm/gtc/matrix_transform.hpp>
#include <cstring>

namespace Onyx {

static const uint32_t MaxQuads = 10000;
static const uint32_t MaxVertices = MaxQuads * 4;
static const uint32_t MaxIndices = MaxQuads * 6;
static const uint32_t MaxTextureSlots = 16;

struct RendererData {
    VertexArray quadVAO;
    VertexBuffer quadVBO;
    IndexBuffer quadIBO;
    Shader quadShader;
    Texture2D whiteTexture;

    uint32_t quadIndexCount = 0;
    Vertex2D* quadVertexBase = nullptr;
    Vertex2D* quadVertexPtr = nullptr;

    std::array<const Texture2D*, MaxTextureSlots> textureSlots;
    uint32_t textureSlotIndex = 1; // slot 0 = white texture

    Renderer2D::Stats stats;
    Camera2D* activeCamera = nullptr;
};

static RendererData s_Data;

static const char* s_VertexShaderSrc = R"(
#version 330 core
layout (location = 0) in vec2 a_Position;
layout (location = 1) in vec4 a_Color;
layout (location = 2) in vec2 a_TexCoord;
layout (location = 3) in float a_TexIndex;

out vec4 v_Color;
out vec2 v_TexCoord;
out float v_TexIndex;

uniform mat4 u_ViewProjection;

void main() {
    v_Color = a_Color;
    v_TexCoord = a_TexCoord;
    v_TexIndex = a_TexIndex;
    gl_Position = u_ViewProjection * vec4(a_Position, 0.0, 1.0);
}
)";

static const char* s_FragmentShaderSrc = R"(
#version 330 core
in vec4 v_Color;
in vec2 v_TexCoord;
in float v_TexIndex;

out vec4 FragColor;

uniform sampler2D u_Textures[16];

void main() {
    int index = int(v_TexIndex);
    vec4 texColor = texture(u_Textures[index], v_TexCoord);
    FragColor = texColor * v_Color;
}
)";

void Renderer2D::Init() {
    s_Data.quadVertexBase = new Vertex2D[MaxVertices];

    s_Data.quadVAO.Create();
    s_Data.quadVAO.Bind();

    s_Data.quadVBO.Create(nullptr, MaxVertices * sizeof(Vertex2D), GL_DYNAMIC_DRAW);

    s_Data.quadVAO.AddAttribute(0, 2, GL_FLOAT, GL_FALSE, sizeof(Vertex2D),
                                 (const void*)offsetof(Vertex2D, position));
    s_Data.quadVAO.AddAttribute(1, 4, GL_FLOAT, GL_FALSE, sizeof(Vertex2D),
                                 (const void*)offsetof(Vertex2D, color));
    s_Data.quadVAO.AddAttribute(2, 2, GL_FLOAT, GL_FALSE, sizeof(Vertex2D),
                                 (const void*)offsetof(Vertex2D, texCoord));
    s_Data.quadVAO.AddAttribute(3, 1, GL_FLOAT, GL_FALSE, sizeof(Vertex2D),
                                 (const void*)offsetof(Vertex2D, texIndex));

    // Generate indices for all quads
    auto* indices = new uint32_t[MaxIndices];
    uint32_t offset = 0;
    for (uint32_t i = 0; i < MaxIndices; i += 6) {
        indices[i + 0] = offset + 0;
        indices[i + 1] = offset + 1;
        indices[i + 2] = offset + 2;
        indices[i + 3] = offset + 2;
        indices[i + 4] = offset + 3;
        indices[i + 5] = offset + 0;
        offset += 4;
    }
    s_Data.quadIBO.Create(indices, MaxIndices);
    delete[] indices;

    // Create 1x1 white texture
    unsigned char whitePixel[] = {255, 255, 255, 255};
    s_Data.whiteTexture.Create(1, 1, whitePixel);
    s_Data.textureSlots[0] = &s_Data.whiteTexture;

    // Load shaders
    s_Data.quadShader.LoadFromSource(s_VertexShaderSrc, s_FragmentShaderSrc);
    s_Data.quadShader.Bind();

    int samplers[MaxTextureSlots];
    for (uint32_t i = 0; i < MaxTextureSlots; i++)
        samplers[i] = i;
    glUniform1iv(glGetUniformLocation(s_Data.quadShader.GetID(), "u_Textures"),
                 MaxTextureSlots, samplers);

    ONYX_INFO("Renderer2D initialized");
}

void Renderer2D::Shutdown() {
    delete[] s_Data.quadVertexBase;
    ONYX_INFO("Renderer2D shut down");
}

void Renderer2D::BeginScene(Camera2D& camera) {
    s_Data.activeCamera = &camera;
    s_Data.quadShader.Bind();
    s_Data.quadShader.SetMat4("u_ViewProjection", camera.GetViewProjectionMatrix());

    StartBatch();
}

void Renderer2D::EndScene() {
    Flush();
}

void Renderer2D::StartBatch() {
    s_Data.quadIndexCount = 0;
    s_Data.quadVertexPtr = s_Data.quadVertexBase;
    s_Data.textureSlotIndex = 1;
}

void Renderer2D::NextBatch() {
    Flush();
    StartBatch();
}

void Renderer2D::Flush() {
    if (s_Data.quadIndexCount == 0) return;

    uint32_t dataSize = static_cast<uint32_t>(
        reinterpret_cast<uint8_t*>(s_Data.quadVertexPtr) -
        reinterpret_cast<uint8_t*>(s_Data.quadVertexBase));
    s_Data.quadVBO.Update(s_Data.quadVertexBase, dataSize);

    for (uint32_t i = 0; i < s_Data.textureSlotIndex; i++) {
        s_Data.textureSlots[i]->Bind(i);
    }

    s_Data.quadVAO.Bind();
    s_Data.quadIBO.Bind();
    glDrawElements(GL_TRIANGLES, s_Data.quadIndexCount, GL_UNSIGNED_INT, nullptr);

    s_Data.stats.drawCalls++;
}

void Renderer2D::DrawQuad(const glm::vec2& position, const glm::vec2& size,
                           const glm::vec4& color) {
    if (s_Data.quadIndexCount >= MaxIndices) {
        NextBatch();
    }

    float x = position.x;
    float y = position.y;
    float w = size.x;
    float h = size.y;

    s_Data.quadVertexPtr->position = {x, y};
    s_Data.quadVertexPtr->color = color;
    s_Data.quadVertexPtr->texCoord = {0.0f, 0.0f};
    s_Data.quadVertexPtr->texIndex = 0.0f;
    s_Data.quadVertexPtr++;

    s_Data.quadVertexPtr->position = {x + w, y};
    s_Data.quadVertexPtr->color = color;
    s_Data.quadVertexPtr->texCoord = {1.0f, 0.0f};
    s_Data.quadVertexPtr->texIndex = 0.0f;
    s_Data.quadVertexPtr++;

    s_Data.quadVertexPtr->position = {x + w, y + h};
    s_Data.quadVertexPtr->color = color;
    s_Data.quadVertexPtr->texCoord = {1.0f, 1.0f};
    s_Data.quadVertexPtr->texIndex = 0.0f;
    s_Data.quadVertexPtr++;

    s_Data.quadVertexPtr->position = {x, y + h};
    s_Data.quadVertexPtr->color = color;
    s_Data.quadVertexPtr->texCoord = {0.0f, 1.0f};
    s_Data.quadVertexPtr->texIndex = 0.0f;
    s_Data.quadVertexPtr++;

    s_Data.quadIndexCount += 6;
    s_Data.stats.quadCount++;
}

void Renderer2D::DrawQuad(const glm::vec2& position, const glm::vec2& size,
                           const Texture2D& texture, const glm::vec4& tint) {
    if (s_Data.quadIndexCount >= MaxIndices) {
        NextBatch();
    }

    float texIndex = 0.0f;
    for (uint32_t i = 1; i < s_Data.textureSlotIndex; i++) {
        if (s_Data.textureSlots[i]->GetID() == texture.GetID()) {
            texIndex = static_cast<float>(i);
            break;
        }
    }

    if (texIndex == 0.0f) {
        if (s_Data.textureSlotIndex >= MaxTextureSlots) {
            NextBatch();
        }
        texIndex = static_cast<float>(s_Data.textureSlotIndex);
        s_Data.textureSlots[s_Data.textureSlotIndex] = &texture;
        s_Data.textureSlotIndex++;
    }

    float x = position.x;
    float y = position.y;
    float w = size.x;
    float h = size.y;

    s_Data.quadVertexPtr->position = {x, y};
    s_Data.quadVertexPtr->color = tint;
    s_Data.quadVertexPtr->texCoord = {0.0f, 0.0f};
    s_Data.quadVertexPtr->texIndex = texIndex;
    s_Data.quadVertexPtr++;

    s_Data.quadVertexPtr->position = {x + w, y};
    s_Data.quadVertexPtr->color = tint;
    s_Data.quadVertexPtr->texCoord = {1.0f, 0.0f};
    s_Data.quadVertexPtr->texIndex = texIndex;
    s_Data.quadVertexPtr++;

    s_Data.quadVertexPtr->position = {x + w, y + h};
    s_Data.quadVertexPtr->color = tint;
    s_Data.quadVertexPtr->texCoord = {1.0f, 1.0f};
    s_Data.quadVertexPtr->texIndex = texIndex;
    s_Data.quadVertexPtr++;

    s_Data.quadVertexPtr->position = {x, y + h};
    s_Data.quadVertexPtr->color = tint;
    s_Data.quadVertexPtr->texCoord = {0.0f, 1.0f};
    s_Data.quadVertexPtr->texIndex = texIndex;
    s_Data.quadVertexPtr++;

    s_Data.quadIndexCount += 6;
    s_Data.stats.quadCount++;
}

void Renderer2D::DrawRotatedQuad(const glm::vec2& position, const glm::vec2& size,
                                  float rotation, const glm::vec4& color) {
    if (s_Data.quadIndexCount >= MaxIndices) {
        NextBatch();
    }

    float hw = size.x * 0.5f;
    float hh = size.y * 0.5f;
    float c = cos(rotation);
    float s = sin(rotation);

    glm::vec2 offsets[4] = {
        {-hw, -hh}, {hw, -hh}, {hw, hh}, {-hw, hh}
    };
    glm::vec2 texCoords[4] = {
        {0.0f, 0.0f}, {1.0f, 0.0f}, {1.0f, 1.0f}, {0.0f, 1.0f}
    };

    for (int i = 0; i < 4; i++) {
        float rx = offsets[i].x * c - offsets[i].y * s + position.x + hw;
        float ry = offsets[i].x * s + offsets[i].y * c + position.y + hh;
        s_Data.quadVertexPtr->position = {rx, ry};
        s_Data.quadVertexPtr->color = color;
        s_Data.quadVertexPtr->texCoord = texCoords[i];
        s_Data.quadVertexPtr->texIndex = 0.0f;
        s_Data.quadVertexPtr++;
    }

    s_Data.quadIndexCount += 6;
    s_Data.stats.quadCount++;
}

Renderer2D::Stats Renderer2D::GetStats() {
    return s_Data.stats;
}

void Renderer2D::ResetStats() {
    std::memset(&s_Data.stats, 0, sizeof(Stats));
}

} // namespace Onyx
