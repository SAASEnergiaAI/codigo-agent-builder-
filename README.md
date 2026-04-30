# ONYX ENGINE

Engine de jogos modular, escalável e de alto desempenho para desenvolvimento 2D e 3D.

## Arquitetura

```
ONYX_ENGINE/
├── Core/          # Base do sistema: logs, timer, eventos, gerenciamento de memória
├── Renderer/      # Renderização 2D com OpenGL (shaders, texturas, batch rendering)
├── Physics/       # Física 2D: AABB, rigidbody, gravidade, detecção de colisões
├── Input/         # Teclado, mouse e scroll (via GLFW)
├── Audio/         # Reprodução de áudio WAV (via OpenAL)
├── Scene/         # Sistema ECS: entidades, componentes, cenas
├── Examples/      # Aplicação demo
├── Assets/        # Recursos do jogo
├── Build/         # Diretório de build
└── third_party/   # Dependências vendorizadas (stb_image)
```

## Módulos

| Módulo | Descrição |
|--------|-----------|
| **Core** | Logger com cores, timer (delta time/FPS), sistema de eventos, tipos base |
| **Renderer** | Renderer 2D com batch rendering, shaders GLSL, texturas, câmera ortográfica |
| **Physics** | Colisão AABB, rigidbody 2D, gravidade, forças, impulsos |
| **Input** | Estado de teclado/mouse, detecção de press/release, scroll |
| **Audio** | Carregamento WAV, playback com OpenAL, controle de volume |
| **Scene** | Sistema ECS com entidades, componentes (Transform, Sprite, Physics, Script), gerenciamento de cenas |

## Dependências

- **C++17** ou superior
- **CMake** 3.16+
- **GLFW3** — janela e input
- **GLEW** — loading de funções OpenGL
- **GLM** — matemática (vetores, matrizes)
- **OpenAL** — áudio (opcional)

### Instalação no Ubuntu/Debian

```bash
sudo apt-get install cmake g++ libglfw3-dev libglew-dev libglm-dev libopenal-dev
```

## Build

```bash
mkdir -p Build && cd Build
cmake ..
make -j$(nproc)
```

O executável de demo estará em `Build/bin/OnyxDemo`.

## Executar a Demo

```bash
./Build/bin/OnyxDemo
```

### Controles da Demo

| Tecla | Ação |
|-------|------|
| W/A/S/D ou Setas | Mover o jogador |
| Scroll | Zoom da câmera |
| ESC | Sair |

## Tecnologias

- **Linguagem**: C++17
- **API Gráfica**: OpenGL 3.3 Core Profile
- **Windowing**: GLFW3
- **Áudio**: OpenAL
- **Matemática**: GLM

## Roadmap

- [x] Engine 2D funcional (Core, Renderer, Input, Physics, Scene, Audio)
- [ ] Carregamento de texturas/sprites
- [ ] Suporte 3D básico
- [ ] Sistema de iluminação
- [ ] Editor visual (ONYX Editor)
- [ ] Sistema de scripting (Lua/Python)
- [ ] Suporte multiplataforma (Windows, Linux, Mobile)

## Licença

Projeto proprietário — todos os direitos reservados.
