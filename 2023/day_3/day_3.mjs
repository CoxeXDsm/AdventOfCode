import { readFileSync } from "node:fs";

const motor = readFileSync("2023\\day_3\\day_3.txt", { encoding: "utf-8" }) // read day_??.txt content
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .trim()
  .split(/\n/g)
  .map(x => x.split('')); 

function part1(){
    let result = 0;
    let numberEnsambler = '';
    let isConnected = false;
    let length = motor[0].length-1, height = motor.length-1;

    function isCharNumber(c) {
        return c >= '0' && c <= '9';
    }

    function checkEnsambler(){
        if (numberEnsambler != '' && isConnected){
            result += Number(numberEnsambler);
        }
        numberEnsambler = '';
        isConnected = false;
    }

    function haveSymbol(f, c){
        if (!isConnected){
            for (let x = Math.max(0,f-1); x <= (f == height ? f : f+1); x++){
                for (let y = Math.max(0,c-1); y <= (c == length ? c : c+1); y++){
                    let pieza = motor[x][y];
                    if (!(x == f && y == c) && !isCharNumber(pieza) && pieza != '.'){
                        isConnected = true;
                        return;
                    }
                }
            }
        }
    }

    for (let fila = 0; fila < motor.length; fila++){
        for (let col = 0; col < motor[fila].length; col++){
            let pieza = motor[fila][col];
            if (isCharNumber(pieza)){
                numberEnsambler += pieza;
                haveSymbol(fila, col);
            } else {
                checkEnsambler();
            }
        }
        checkEnsambler();
    }
    checkEnsambler();

    console.log('Solution 1: ' + result);
}

function part2(){
    let result = 0;
    let numberEnsambler = '';
    let gearLocation = [];

    let isConnected = false;
    let length = motor[0].length-1, height = motor.length-1;

    let mapGears = new Map();

    function isCharNumber(c) {
        return c >= '0' && c <= '9';
    }

    function checkEnsambler(){
        if (numberEnsambler != '' && isConnected){
            let aux = [...new Set(gearLocation)];
            for (let gear of aux){
                mapGears.set(gear, (mapGears.get(gear) == undefined ? numberEnsambler : mapGears.get(gear) + ',' + numberEnsambler));
            }
        }
        numberEnsambler = '';
        isConnected = false;
        gearLocation = [];
    }

    function haveSymbol(f, c){
        for (let x = Math.max(0,f-1); x <= (f == height ? f : f+1); x++){
            for (let y = Math.max(0,c-1); y <= (c == length ? c : c+1); y++){
                let pieza = motor[x][y];
                if (!(x == f && y == c) && !isCharNumber(pieza) && pieza == '*'){
                    isConnected = true;
                    gearLocation.push(x + ',' + y);
                    return;
                }
            }
        }
    }

    for (let fila = 0; fila < motor.length; fila++){
        for (let col = 0; col < motor[fila].length; col++){
            let pieza = motor[fila][col];
            if (isCharNumber(pieza)){
                numberEnsambler += pieza;
                haveSymbol(fila, col);
            } else {
                checkEnsambler();
            }
        }
        checkEnsambler();
    }
    checkEnsambler();

    for (let entry of mapGears){
        let nums = entry[1].split(',')
        if (nums.length == 2){
            let aux = nums[0]*nums[1];
            result += aux;
        }
    }

    console.log('Solution 2: ' + result);
}

// execute the parts
part1(); part2();