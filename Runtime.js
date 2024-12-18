const Runtime = class {

  static generateId() {
    let id = "";
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    while(id.length < 10) {
      id += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return id;
  }

  static _header(fichero) {
    let codigo = "";
    codigo += "";
    codigo += `Overload_exit_events: {\n`;
    codigo += `  process.on("beforeExit", (code) => {\n`;
    codigo += `    try {\n`;
    codigo += `      require("fs").unlinkSync(${JSON.stringify(fichero)});\n`;
    codigo += `    } catch(error) {}\n`;
    codigo += `  });\n`;
    codigo += `  process.on("SIGINT", (code) => {\n`;
    codigo += `    try {\n`;
    codigo += `      require("fs").unlinkSync(${JSON.stringify(fichero)});\n`;
    codigo += `    } catch(error) {}\n`;
    codigo += `    process.exit(0);\n`;
    codigo += `  });\n`;
    codigo += `  process.on("SIGTERM", (code) => {\n`;
    codigo += `    try {\n`;
    codigo += `      require("fs").unlinkSync(${JSON.stringify(fichero)});\n`;
    codigo += `    } catch(error) {}\n`;
    codigo += `    process.exit(0);\n`;
    codigo += `  });\n`;
    codigo += `  process.on("exit", (code) => {\n`;
    codigo += `    try {\n`;
    codigo += `      require("fs").unlinkSync(${JSON.stringify(fichero)});\n`;
    codigo += `    } catch(error) {}\n`;
    codigo += `  });\n`;
    codigo += `}\n`;
    return codigo;
  }

  static start(funzion, dir = "runtimes") {
    const fs = require("fs");
    const path = require("path");
    const child_process = require("child_process");
    const directory = dir || process.cwd();
    const id = this.generateId();
    const fichero = path.resolve(directory, `runtime-${id}.js`);
    let codigo = funzion.toString();
    Adaptar_codigo: {
      const pos = codigo.indexOf("{\n");
      codigo = codigo.substr(pos+1).split("\n");
      codigo.pop();
      codigo = codigo.join("\n");
      codigo = this._header(fichero) + codigo;
    }
    fs.writeFileSync(fichero, codigo, "utf8");
    return child_process.spawn("node", [fichero], {
      cwd: process.cwd(),
      stdio: [process.stdin, process.stdout, process.stderr]
    });
  }

};

Runtime.default = Runtime;

module.exports = Runtime;