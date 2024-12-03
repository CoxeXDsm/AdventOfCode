const { readFileSync } = require("node:fs");

const input = readFileSync("inputs\\day_2_input.txt", { encoding: "utf-8" })
  .replace(/\r/g, "") 
  .replace(/\n/g, "|")
  .trim()
  .split('|'); 

let result = 0;

function reto_2a() {
    input.forEach((report) => {
        let data = report.split(' ');

        result += isCorrect(data, true) ? 1 : 0;    
    });

    // IMPRIME RESULTADO
    console.log("La solución es: " + result);
}

function reto_2b() {
    input.forEach((report) => {
        let data = report.split(' ');

        result += isCorrect(data, false) ? 1 : 0;    
    });

    // IMPRIME RESULTADO
    console.log("La solución es: " + result);
}

function isCorrect(data, patched){
    let aux = data[1]-data[0];
    let order;
    switch (true){
        case aux > 0 : order = 'ASC'; break;
        case aux < 0 : order = 'DESC'; break;
        default : order = 'ERR';
    }

    for(let x = 0; x < data.length-1; x++){
        aux = data[x+1]-data[x];

        switch (true){
            case aux > 0 : 
                if (order !== 'ASC' || (Math.abs(aux) < 1 || Math.abs(aux) > 3)){
                    return patched ? false : (isCorrect(removeAt(data, x), true) || isCorrect(removeAt(data, x+1), true));
                }
                break;
            case aux < 0 : 
                if (order !== 'DESC' || (Math.abs(aux) < 1 || Math.abs(aux) > 3)){
                    return patched ? false : (isCorrect(removeAt(data, x), true) || isCorrect(removeAt(data, x+1), true));
                }
                break;
            default : 
                return patched ? false : isCorrect(removeAt(data, x), true);
        }
    }
    return true;
}

function removeAt(array, indexToRemove) {
    return array.filter((_, index) => index !== indexToRemove);
}

module.exports = {
    reto_2a, reto_2b
};