const { readFileSync } = require("node:fs");

const input = readFileSync("inputs\\day_1_input.txt", { encoding: "utf-8" })
  .replace(/\r/g, "") 
  .replace(/\n/g, "|")
  .replace(/\s+/g, ' ')
  .trim()
  .split('|'); 

let l_left = [], l_right = [];
let result = 0;

function reto_1a() {
    // CREA LAS DOS LISTAS
    input.forEach((par) => {
        let splited = par.split(' '); 
        l_left.push(splited[0]);
        l_right.push(splited[1]);
    });

    // ORDENA LAS LISTAS
    l_left.sort((a,b) => a-b);
    l_right.sort((a,b) => a-b);

    // APLICA LAS DIFERENCIAS
    for (let i = 0; i < input.length; i++){
        result += Math.abs(l_left[i] - l_right[i]);
    }

    // IMPRIME RESULTADO
    console.log("La solución es: " + result);
}

function reto_1b() {
    // CREA LAS DOS LISTAS
    input.forEach((par) => {
        let splited = par.split(' '); 
        l_left.push(splited[0]);
        l_right.push(splited[1]);
    });

    // APLICA LAS SIMILITUDES
    for (let i = 0; i < input.length; i++){
        result += Math.abs(l_left[i] * l_right.filter(x => x === l_left[i]).length);
    }

    // IMPRIME RESULTADO
    console.log("La solución es: " + result);
}

module.exports = {
    reto_1a, reto_1b
};