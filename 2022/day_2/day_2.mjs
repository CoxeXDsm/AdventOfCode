import { readFileSync } from "node:fs";

const guide = readFileSync("2022\\day_2\\day_2.txt", { encoding: "utf-8" }) // read day_??.txt content
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .trim(); // Remove starting/ending whitespace

function part1(){
    // insert code
    console.log('Solution 1: ');
}

function part2(){
    // insert code
    console.log('Solution 2: ');
}

// execute the parts
part1(); part2();