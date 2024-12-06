const { readFileSync } = require("node:fs");

const input = readFileSync("inputs\\day_4_input.txt", { encoding: "utf-8" })
  .replace(/\r/g, "") 
  .replace(/\n/g, "|")
  .trim() 
  .split('|')
  .map((x) => x.split(''));

let word = ['X', 'M', 'A', 'S'];
let directions = ['-1|-1', '0|-1', '1|-1', '-1|0', '1|0', '-1|1', '0|1', '1|1'];
let cruce = [['-1|-1', '1|1'], ['1|-1', '-1|1']];

const numRows = input.length;
const numCols = input[0]?.length || 0;

let result = 0;

function reto_4a() {

    for (let x = 0; x < input.length; x++){
        for (let y = 0; y < input.length; y++){
            let char = input[x][y];
            if (char == 'X'){
                posible_correcto(char, [x,y], null);
            }
        }
    }

    // IMPRIME RESULTADO
    console.log("La solución es: " + result);
}

function reto_4b() {

    for (let x = 0; x < input.length; x++){
        for (let y = 0; y < input.length; y++){
            let char = input[x][y];
            if (char == 'A'){
                result += posible_correcto_x([x,y], null) ? 1 : 0;
            }
        }
    }
    // IMPRIME RESULTADO
    console.log("La solución es: " + result);
}

function posible_correcto(letra, posicion, direccion){
    let indexOf = word.indexOf(letra);
    if (indexOf == word.length-1){
        return true;
    } else if (indexOf !== -1){
        let nextChar = word[indexOf+1];
        if (direccion == null){
            directions.forEach((dir) => {
                let pos = dir.split('|').map(Number);
                let x = posicion[0]+pos[0], y = posicion[1]+pos[1];
                if (x >= 0 && x < numRows && y >= 0 && y < numCols){
                    if (input[x][y] == nextChar){
                        let correct = posible_correcto(nextChar, [x,y], dir);
                        if (correct) result += 1;
                    }
                }
            });
        } else {
            let pos = direccion.split('|').map(Number);
            let x = posicion[0]+pos[0], y = posicion[1]+pos[1];
            if (x >= 0 && x < numRows && y >= 0 && y < numCols){
                if (input[x][y] == nextChar){
                    let correct = posible_correcto(nextChar, [x,y], direccion);
                    if (correct) return true;
                }
            }
        }
    }

    return false;

}

function posible_correcto_x(posicion){
    const wordCruce = new Array('M', 'S');
    for (let line of cruce) {
        let posD = line[0].split('|').map(Number);
        let xD = posicion[0]+posD[0], yD = posicion[1]+posD[1];

        let posI = line[1].split('|').map(Number);
        let xI = posicion[0]+posI[0], yI = posicion[1]+posI[1];

        if (xD >= 0 && xD < numRows && yD >= 0 && yD < numCols && xI >= 0 && xI < numRows && yI >= 0 && yI < numCols){
            if (!([...new Array(input[xD][yD], input[xI][yI])].sort().every((v,i) => v === [...wordCruce].sort()[i]))){
                return false;
            }
        } else {
            return false;
        }
    };
    
    return true;

}

module.exports = {
    reto_4a, reto_4b
};