import { readFileSync } from "node:fs";

const instructions = readFileSync("2022\\day_1\\day_1.txt", { encoding: "utf-8" }) // read day_??.txt content
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .trim(); // Remove starting/ending whitespace

function part1(){
    // add method
    console.log('Solution 1: ');
}

function part2(){
    // add method
    console.log('Solution 2: ');
}

// execute the parts
part1(); part2();