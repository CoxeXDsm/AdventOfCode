const { readFileSync } = require("node:fs");

const input = readFileSync("inputs\\day_3_input.txt", { encoding: "utf-8" })
  .replace(/\r/g, "") 
  .replace(/\n/g, "|")
  .trim(); 

const patron = /mul\((\d{1,3}),(\d{1,3})\)/g;
const patronDo = /(do\(\)|don't\(\))/g;

let result = 0;

function reto_3a() {

    result = mul(input);

    // IMPRIME RESULTADO
    console.log("La solución es: " + result);
}

function reto_3b() {

    let correctMul = []; 
    let coincidenciaDo;
    let isEnabled = true;
    let lastIndex = 0;

    while((coincidenciaDo = patronDo.exec(input)) !== null){
        let index = coincidenciaDo.index;
        let cadena = coincidenciaDo[0];

        switch(cadena){
            case "do()":
                if (!isEnabled){
                    lastIndex = index;
                    isEnabled = true;
                }
                break;
            case "don't()":
                if (isEnabled){
                    correctMul.push(input.slice(lastIndex, index));
                    lastIndex = index;
                    isEnabled = false;
                }
                break;
        }
    }

    if (isEnabled){
        correctMul.push(input.slice(lastIndex, input.length));
    }

    correctMul.forEach((x) => {
        result += mul(x);
    });

    // IMPRIME RESULTADO
    console.log("La solución es: " + result);
}

function mul(ent){
    let coincidencia;
    let sum = 0;
    while((coincidencia = patron.exec(ent)) !== null){
        let X = parseInt(coincidencia[1], 10);
        let Y = parseInt(coincidencia[2], 10);
        sum += X * Y;
    }
    return sum;
}

module.exports = {
    reto_3a, reto_3b
};