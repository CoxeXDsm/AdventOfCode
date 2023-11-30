import { readFileSync } from "node:fs";

const boxes = readFileSync("2015\\day_2\\day_2.txt", { encoding: "utf-8" }) // read day_??.txt content
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .trim()
  .split(/\n/g); 

function part1(){
    let result = boxes.reduce((acc, box) => {
        let sidesBox = box.split('x');
        let sidesDouble = sidesBox.map((x, idx) => sidesBox[idx] * sidesBox[(idx+1)%(sidesBox.length)]); 
        return acc + ((2*sidesDouble[0]) + (2*sidesDouble[1]) + (2*sidesDouble[2])) + Math.min(...sidesDouble);
    }, 0);
    console.log('Solution 1: ' + result);
}

function part2(){
    let result = boxes.reduce((acc, box) => {
        let sidesBox = box.split('x');
        let sizeBow = sidesBox.reduce((res, side) => res * side, 1);

        sidesBox.splice(sidesBox.indexOf(String(Math.max(...sidesBox))), 1);
        let sizeRibbon = sidesBox.reduce((res, side) => res + Number(side) + Number(side), 0);

        return acc + sizeBow + sizeRibbon;
    }, 0);
    console.log('Solution 2: ' + result);
}

// execute the parts
part1(); part2();