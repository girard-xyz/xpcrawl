# Kotlin/JS Example - Important Notes

## Current Status

⚠️ **This example is provided as a reference but has not been fully tested** due to the following constraints:

1. **Package not yet published**: xpcrawl needs to be published to npm first
2. **Coroutines dependency**: The example uses `kotlinx.coroutines` which requires additional setup
3. **Build complexity**: Kotlin/JS compilation requires JDK and Gradle setup

## How to Use After npm Publication

Once xpcrawl is published to npm, you can use it in your Kotlin/JS project:

### 1. Update `build.gradle.kts`

```kotlin
plugins {
    kotlin("js") version "1.9.22"
}

repositories {
    mavenCentral()
}

kotlin {
    js {
        nodejs()
        binaries.executable()
    }
}

dependencies {
    implementation(kotlin("stdlib-js"))
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.7.3")
    
    // After npm publication
    implementation(npm("xpcrawl", "1.0.0"))
}
```

### 2. Create External Declarations

Copy the external declarations from `src/main/kotlin/xpcrawl/XPCrawl.kt` to your project.

### 3. Use in Your Code

```kotlin
import xpcrawl.*

suspend fun example() {
    val results = crawl(object : CrawlOptions {
        override var url = "https://example.com"
        override var xpath = "//h1/text()"
        override var headless = true
    }).await()
    
    println(results)
}
```

## Simpler Alternative: Use Node.js Directly

If you're working in a Kotlin/JS environment but don't need the full Kotlin type safety, you can use dynamic typing:

```kotlin
@JsModule("xpcrawl")
@JsNonModule
external val xpcrawl: dynamic

suspend fun example() {
    val options = js("{}")
    options.url = "https://example.com"
    options.xpath = "//h1/text()"
    
    val results = xpcrawl.crawl(options).await() as Array<String>
    println(results)
}
```

## Recommendation

For most use cases, we recommend:
- **TypeScript** if you need type safety in a JavaScript environment
- **JavaScript** for simplicity and direct npm integration
- **CLI** for quick scripting and data extraction tasks

Kotlin/JS integration is possible but adds complexity. Use it only if you're already in a Kotlin/JS ecosystem.
