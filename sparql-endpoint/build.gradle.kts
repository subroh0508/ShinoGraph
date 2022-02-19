object Jena {
    const val version = "4.4.0"
    const val fuseki = "org.apache.jena:jena-fuseki-server:$version"
    const val commands = "org.apache.jena:jena-cmds:$version"
}

object Dir {
    const val jar = "jar"
    const val lib = "lib"
    const val bin = "bin"
    const val schema = "dataset/schema.ttl"
    const val tdb = "run/dataset"
}

val fuseki: Configuration by configurations.creating
val commands: Configuration by configurations.creating

repositories {
    mavenCentral()
}

dependencies {
    fuseki(Jena.fuseki)
    commands(Jena.commands)
}

val clean by tasks.creating(Task::class) {
    doLast {
        delete {
            delete(Dir.jar, Dir.lib, Dir.tdb)
        }
    }
}

val commandList = listOf("tdb1.xloader", "xload-common", "xload-main", "xload-data", "xload-index")
val download by tasks.creating(Task::class) {
    mustRunAfter(clean)
    doLast {
        copy {
            from(fuseki)
            into(Dir.jar)
        }

        copy {
            from(commands)
            into(Dir.lib)
        }

        File(Dir.bin).takeUnless { it.exists() }?.mkdirs()
        commandList.forEach { name ->
            exec {
                executable("sh")
                args("-c", "wget -P bin https://raw.githubusercontent.com/apache/jena/jena-${Jena.version}/apache-jena/bin/$name")
            }
        }

        exec {
            executable("sh")
            args("-c", "chmod +x bin/*xload*")
        }
    }
}

val tdbLoad by tasks.creating(Task::class) {
    mustRunAfter(clean, download)
    doLast {
        delete {
            delete(Dir.tdb)
        }

        val dataset = fileTree("${projectDir.path}/dataset").matching {
            include("**/*.ttl")
        }.joinToString(" ", transform = File::getPath)

        exec {
            executable("sh")
            args("-c", "bin/tdb1.xloader --loc ${Dir.tdb} ${Dir.schema} $dataset")
        }
    }
}

val setup by tasks.creating(Task::class) {
    dependsOn(clean, download, tdbLoad)
}

val start by tasks.creating(Task::class) {
    doLast {
        exec {
            executable("sh")
            args("-c", "java -jar jar/jena-fuseki-server-${Jena.version}.jar --port=3000 --config=run/config.ttl")
        }
    }
}
