import { readFileSync } from "node:fs";

const lines = readFileSync("2023\\day_6\\day_6.txt", { encoding: "utf-8" }) // read day_??.txt content
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .trim()
  .split(/\n/g);;

function part1(){
    const times = lines[0].match(/\d+/g);
    const distances = lines[1].match(/\d+/g);

    let result = 1;

    for (let x = 0; x < times.length; x++){
        let time = Number(times[x]);
        let distance = Number(distances[x]);
        let possibilities = 0

        for (let i = 0; i <= time; i++){
            if ( i*(time-i) > distance ) {
                possibilities++;
            }
        }
        result = result * possibilities;
    }
    console.log('Solution 1: ' + result);
}

function part2(){
    const times = lines[0].match(/\d+/g);
    const distances = lines[1].match(/\d+/g);

    const time = Number(times.join(''));
    const distance = Number(distances.join(''));
    let result = 0;

    for (let i = 0; i <= time; i++){
        if ( i*(time-i) > distance ) {
            result++;
        }
    }
    
    console.log('Solution 2: ' + result);
}

// execute the parts
part1(); part2();