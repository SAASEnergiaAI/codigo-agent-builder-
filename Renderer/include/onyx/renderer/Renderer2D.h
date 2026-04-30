#pragma once

#include "onyx/renderer/Shader.h"
#include "onyx/renderer/Buffer.h"
#include "onyx/renderer/Texture.h"
#include "onyx/renderer/Camera2D.h"

#include <glm/glm.hpp>
#include <array>

namespace Onyx {

struct Vertex2D {
    glm::vec2 position;
    glm::vec4 color;
    glm::vec2 texCoord;
    float texIndex;
};

class Renderer2D {
public:
    static void Init();
    static void Shutdown();

    static void BeginScene(Camera2D& camera);
    static void EndScene();
    static void Flush();

    static void DrawQuad(const glm::vec2& position, const glm::vec2& size,
                         const glm::vec4& color);
    static void DrawQuad(const glm::vec2& position, const glm::vec2& size,
                         const Texture2D& texture, const glm::vec4& tint = glm::vec4(1.0f));
    static void DrawRotatedQuad(const glm::vec2& position, const glm::vec2& size,
                                float rotation, const glm::vec4& color);

    struct Stats {
        uint32_t drawCalls = 0;
        uint32_t quadCount = 0;
    };
    static Stats GetStats();
    static void ResetStats();

private:
    static void StartBatch();
    static void NextBatch();
};

} // namespace Onyx
