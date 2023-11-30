import { readFileSync } from "node:fs";

const calories = readFileSync("2022\\day_1\\day_1.txt", { encoding: "utf-8" }) // read day_??.txt content
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .trim()
  .split(/\n\n/g); // Remove starting/ending whitespace

function part1(){
    let result = 0;
    calories.forEach(element => {
        let linea = element.replace(/\n/g, " ").split(" ");
        let sum = linea.reduce((acc, value) => {return acc + Number(value)}, 0);
        if(sum > result) result = sum;
    });
    console.log('Solution 1: ' + result);
}

function part2(){
    let result = [];
    calories.forEach(element => {
        let linea = element.replace(/\n/g, " ").split(" ");
        let sum = linea.reduce((acc, value) => {return acc + Number(value)}, 0);
        let minResult = Math.min.apply(null, result);
        if(result.length < 3){
            result.push(sum);
        } else if(result.length == 3 && minResult < sum){
            let index = result.indexOf(minResult);
            result.splice(index, 1);
            result.push(sum);
        }
    });

    let solution = result.reduce((acc, value) => {return acc + Number(value)}, 0);
    console.log('Solution 2: ' + solution);
}

// execute the parts
part1(); part2();