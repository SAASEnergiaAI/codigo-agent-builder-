#include "onyx/core/Application.h"
#include "onyx/core/Logger.h"
#include "onyx/core/Event.h"
#include "onyx/renderer/Renderer2D.h"
#include "onyx/renderer/Camera2D.h"
#include "onyx/input/InputManager.h"
#include "onyx/scene/Scene.h"
#include "onyx/scene/Components.h"

#ifdef ONYX_AUDIO_ENABLED
#include "onyx/audio/AudioEngine.h"
#endif

#include <GLFW/glfw3.h>
#include <sstream>
#include <cmath>

class DemoApp : public Onyx::Application {
public:
    DemoApp() : Application({"ONYX ENGINE - Demo", 1280, 720, true, true}) {}

protected:
    void OnInit() override {
        Onyx::InputManager::Init(GetWindow());
        Onyx::Renderer2D::Init();

#ifdef ONYX_AUDIO_ENABLED
        Onyx::AudioEngine::Init();
#endif

        m_Scene = std::make_unique<Onyx::Scene>("Demo Scene");

        m_Scene->GetCamera().SetProjection(
            static_cast<float>(GetWindowWidth()),
            static_cast<float>(GetWindowHeight()));

        // Player entity
        auto& player = m_Scene->CreateEntity("Player");
        auto& playerSprite = player.AddComponent<Onyx::SpriteComponent>();
        playerSprite.color = {0.2f, 0.6f, 1.0f, 1.0f};
        playerSprite.size = {50.0f, 50.0f};
        player.GetTransform().position = {-25.0f, 0.0f};

        auto& playerScript = player.AddComponent<Onyx::ScriptComponent>();
        playerScript.onUpdate = [this](float dt) {
            auto* p = m_Scene->FindEntityByTag("Player");
            if (!p) return;

            auto& pos = p->GetTransform().position;
            float speed = 300.0f;

            if (Onyx::InputManager::IsKeyDown(GLFW_KEY_W) ||
                Onyx::InputManager::IsKeyDown(GLFW_KEY_UP))
                pos.y += speed * dt;
            if (Onyx::InputManager::IsKeyDown(GLFW_KEY_S) ||
                Onyx::InputManager::IsKeyDown(GLFW_KEY_DOWN))
                pos.y -= speed * dt;
            if (Onyx::InputManager::IsKeyDown(GLFW_KEY_A) ||
                Onyx::InputManager::IsKeyDown(GLFW_KEY_LEFT))
                pos.x -= speed * dt;
            if (Onyx::InputManager::IsKeyDown(GLFW_KEY_D) ||
                Onyx::InputManager::IsKeyDown(GLFW_KEY_RIGHT))
                pos.x += speed * dt;

            float scroll = Onyx::InputManager::GetScrollDelta();
            if (scroll != 0.0f) {
                float zoom = m_Scene->GetCamera().GetZoom();
                zoom += scroll * 0.1f;
                if (zoom < 0.1f) zoom = 0.1f;
                if (zoom > 5.0f) zoom = 5.0f;
                m_Scene->GetCamera().SetZoom(zoom);
            }
        };

        // Ground platform
        auto& ground = m_Scene->CreateEntity("Ground");
        auto& groundSprite = ground.AddComponent<Onyx::SpriteComponent>();
        groundSprite.color = {0.3f, 0.3f, 0.35f, 1.0f};
        groundSprite.size = {800.0f, 30.0f};
        ground.GetTransform().position = {-400.0f, -200.0f};

        // Decorative spinning entities
        for (int i = 0; i < 5; i++) {
            std::string name = "Block_" + std::to_string(i);
            auto& block = m_Scene->CreateEntity(name);
            auto& sprite = block.AddComponent<Onyx::SpriteComponent>();

            float hue = static_cast<float>(i) / 5.0f;
            sprite.color = {
                0.5f + 0.5f * std::sin(hue * 6.28f),
                0.5f + 0.5f * std::sin(hue * 6.28f + 2.09f),
                0.5f + 0.5f * std::sin(hue * 6.28f + 4.19f),
                0.9f
            };
            sprite.size = {40.0f, 40.0f};

            float x = -200.0f + i * 100.0f;
            block.GetTransform().position = {x, -150.0f};

            auto& script = block.AddComponent<Onyx::ScriptComponent>();
            float baseY = -150.0f;
            float phase = static_cast<float>(i) * 1.2f;
            script.onUpdate = [&block, baseY, phase](float dt) {
                static float time = 0.0f;
                time += dt;
                block.GetTransform().position.y = baseY + std::sin(time * 2.0f + phase) * 30.0f;
                block.GetTransform().rotation += dt * 90.0f;
            };
        }

        m_Scene->Init();

        ONYX_INFO("Demo application initialized");
        ONYX_INFO("Controls: WASD/Arrows = Move, Scroll = Zoom, ESC = Quit");
    }

    void OnUpdate(float dt) override {
        Onyx::InputManager::Update();

        if (Onyx::InputManager::IsKeyPressed(GLFW_KEY_ESCAPE)) {
            Quit();
        }

        m_Scene->Update(dt);

        // Update title with FPS
        m_FPSDisplayTimer += dt;
        if (m_FPSDisplayTimer >= 0.5f) {
            m_FPSDisplayTimer = 0.0f;
            std::stringstream ss;
            ss << "ONYX ENGINE - Demo | FPS: " << static_cast<int>(GetFPS());
            glfwSetWindowTitle(GetWindow(), ss.str().c_str());
        }
    }

    void OnRender() override {
        m_Scene->Render();
    }

    void OnResize(int width, int height) override {
        m_Scene->GetCamera().SetProjection(
            static_cast<float>(width), static_cast<float>(height));
    }

    void OnShutdown() override {
        m_Scene->Shutdown();
        Onyx::Renderer2D::Shutdown();
#ifdef ONYX_AUDIO_ENABLED
        Onyx::AudioEngine::Shutdown();
#endif
        ONYX_INFO("Demo application shut down");
    }

private:
    std::unique_ptr<Onyx::Scene> m_Scene;
    float m_FPSDisplayTimer = 0.0f;
};

int main() {
    try {
        DemoApp app;
        app.Run();
    } catch (const std::exception& e) {
        ONYX_FATAL(std::string("Fatal error: ") + e.what());
        return 1;
    }
    return 0;
}
