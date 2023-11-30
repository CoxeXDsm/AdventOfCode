import { readFileSync } from "node:fs";

const instructions = readFileSync("2015\\day_1\\day_1.txt", { encoding: "utf-8" }) // read day_??.txt content
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .trim(); // Remove starting/ending whitespace

function part1(){
  let ups = instructions.replaceAll(')', '').length;
  let downs = instructions.replaceAll('(', '').length;
  console.log('Solution 1: ' + (ups - downs));
}

function part2(){
    console.log('Solution 2:');
}

part1();
part2();