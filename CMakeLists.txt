cmake_minimum_required(VERSION 3.16)
project(ONYX_ENGINE VERSION 0.1.0 LANGUAGES CXX C)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

# Output directories
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/lib)
set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/lib)

# Find system packages
find_package(OpenGL REQUIRED)
find_package(glfw3 3.3 REQUIRED)
find_package(GLEW REQUIRED)

# Find OpenAL
find_package(PkgConfig QUIET)
if(PkgConfig_FOUND)
    pkg_check_modules(OPENAL openal)
endif()
if(NOT OPENAL_FOUND)
    find_path(OPENAL_INCLUDE_DIR AL/al.h)
    find_library(OPENAL_LIBRARY openal)
    if(OPENAL_INCLUDE_DIR AND OPENAL_LIBRARY)
        set(OPENAL_FOUND TRUE)
        set(OPENAL_INCLUDE_DIRS ${OPENAL_INCLUDE_DIR})
        set(OPENAL_LIBRARIES ${OPENAL_LIBRARY})
    endif()
endif()

# stb (header-only, vendored)
add_library(stb INTERFACE)
target_include_directories(stb INTERFACE ${CMAKE_SOURCE_DIR}/third_party)

# GLM (header-only)
find_path(GLM_INCLUDE_DIR glm/glm.hpp PATHS /usr/include /usr/local/include)
if(NOT GLM_INCLUDE_DIR)
    message(FATAL_ERROR "GLM not found. Install with: sudo apt-get install libglm-dev")
endif()

# ============================================================
# ONYX Core Library
# ============================================================
file(GLOB_RECURSE CORE_SOURCES Core/src/*.cpp)
add_library(OnyxCore STATIC ${CORE_SOURCES})
target_include_directories(OnyxCore PUBLIC Core/include ${GLM_INCLUDE_DIR})
target_link_libraries(OnyxCore PUBLIC OpenGL::GL GLEW::GLEW glfw)

# ============================================================
# ONYX Renderer Library
# ============================================================
file(GLOB_RECURSE RENDERER_SOURCES Renderer/src/*.cpp)
add_library(OnyxRenderer STATIC ${RENDERER_SOURCES})
target_include_directories(OnyxRenderer PUBLIC Renderer/include ${GLM_INCLUDE_DIR})
target_link_libraries(OnyxRenderer PUBLIC OnyxCore stb)

# ============================================================
# ONYX Input Library
# ============================================================
file(GLOB_RECURSE INPUT_SOURCES Input/src/*.cpp)
add_library(OnyxInput STATIC ${INPUT_SOURCES})
target_include_directories(OnyxInput PUBLIC Input/include)
target_link_libraries(OnyxInput PUBLIC OnyxCore)

# ============================================================
# ONYX Physics Library
# ============================================================
file(GLOB_RECURSE PHYSICS_SOURCES Physics/src/*.cpp)
add_library(OnyxPhysics STATIC ${PHYSICS_SOURCES})
target_include_directories(OnyxPhysics PUBLIC Physics/include ${GLM_INCLUDE_DIR})
target_link_libraries(OnyxPhysics PUBLIC OnyxCore)

# ============================================================
# ONYX Scene / ECS Library
# ============================================================
file(GLOB_RECURSE SCENE_SOURCES Scene/src/*.cpp)
add_library(OnyxScene STATIC ${SCENE_SOURCES})
target_include_directories(OnyxScene PUBLIC Scene/include ${GLM_INCLUDE_DIR})
target_link_libraries(OnyxScene PUBLIC OnyxCore OnyxRenderer OnyxPhysics OnyxInput)

# ============================================================
# ONYX Audio Library
# ============================================================
if(OPENAL_FOUND)
    file(GLOB_RECURSE AUDIO_SOURCES Audio/src/*.cpp)
    add_library(OnyxAudio STATIC ${AUDIO_SOURCES})
    target_include_directories(OnyxAudio PUBLIC Audio/include ${OPENAL_INCLUDE_DIRS})
    target_link_libraries(OnyxAudio PUBLIC OnyxCore ${OPENAL_LIBRARIES})
    target_compile_definitions(OnyxAudio PUBLIC ONYX_AUDIO_ENABLED)
else()
    message(WARNING "OpenAL not found — Audio module disabled")
    add_library(OnyxAudio INTERFACE)
    target_include_directories(OnyxAudio INTERFACE Audio/include)
endif()

# ============================================================
# ONYX Engine (convenience target linking everything)
# ============================================================
add_library(OnyxEngine INTERFACE)
target_link_libraries(OnyxEngine INTERFACE
    OnyxCore
    OnyxRenderer
    OnyxInput
    OnyxPhysics
    OnyxScene
    OnyxAudio
)

# ============================================================
# Demo Application
# ============================================================
add_executable(OnyxDemo Examples/Demo/main.cpp)
target_link_libraries(OnyxDemo PRIVATE OnyxEngine)
if(OPENAL_FOUND)
    target_compile_definitions(OnyxDemo PRIVATE ONYX_AUDIO_ENABLED)
endif()
