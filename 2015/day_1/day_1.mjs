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
  let char = 0;
  let floor = 0
  for (let x = 1; x < instructions.length; x++){
    char = x;
    floor = instructions.charAt(x-1) == '(' ? floor+1 : floor-1 ;
    if (floor == -1) break;
  }
  console.log('Solution 2: ' + char);
}

// execute the parts
part1(); part2();