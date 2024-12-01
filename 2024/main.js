const readline = require('readline');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'days');
console.log(dir);

// Crear una interfaz de readline para leer desde la terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const funciones = {};

fs.readdir(dir, (err, files) => {
    if (err) {
        console.error("Error al leer la carpeta:", err);
        rl.close();
        return;
    }

    const jsFiles = files.filter(file => file.endsWith('.js'));

    jsFiles.forEach(file => {
        const filePath = path.join(dir, file);
        const funcionesExportadas = require(filePath);
        Object.assign(funciones, funcionesExportadas); 
    });

    preguntaFuncion();
});

function preguntaFuncion() {
    console.log("-- Advent of Code 2024 --")
    rl.question("Introduce el día: ", function(numero) {
        rl.question("Introduce una opción (a o b): ", function(opcion) {

            const nombreFuncion = `reto_${numero}${opcion}`;
            
            if (typeof funciones[nombreFuncion] === 'function') {
                funciones[nombreFuncion]();
            } else {
                console.log("Error: No se encontró una función con ese nombre.");
            }
            
            rl.close();
        });
    });
}