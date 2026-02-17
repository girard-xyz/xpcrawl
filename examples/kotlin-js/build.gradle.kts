plugins {
    kotlin("js") version "2.0.21"
}

group = "com.example"
version = "1.0.0"

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
    
    // Using the published package from npm
    implementation(npm("xpcrawl", "1.0.3"))
}
