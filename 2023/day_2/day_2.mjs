import { readFileSync } from "node:fs";

const games = readFileSync("2023\\day_2\\day_2.txt", { encoding: "utf-8" }) // read day_??.txt content
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .trim()
  .split(/\n/g); 

function part1(){
    const cubesNumber = new Map([
        ['red', 12], ['green', 13], ['blue', 14]
    ]);

    function isLegal(game){
        let array = game.replaceAll(';', ',').replaceAll(':', ',').split(',')
        for (let i = 1; i < array.length; i++){
            let info = array[i].trim().split(' ');
            if (Number(info[0]) > cubesNumber.get(info[1]))
                return 0;
        }
        return Number(array[0].split(' ')[1]);
    }

    let result = games.reduce((acc, game) => {
        return acc + isLegal(game);
    }, 0);

    console.log('Solution 1: '+ result);
}

function part2(){
    function minimumCubes(game){
        let cubesNumber = new Map([
            ['red', 0], ['green', 0], ['blue', 0]
        ]);
    
        let array = game.replaceAll(';', ',').replaceAll(':', ',').split(',')
        for (let i = 1; i < array.length; i++){
            let info = array[i].trim().split(' ');
            cubesNumber.set(info[1], Math.max(info[0], cubesNumber.get(info[1])));
        }
        
        let result = 1;
        for (let entry of cubesNumber){
            result *= entry[1];
        }
        return result;
    }

    let result = games.reduce((acc, game) => {
        return acc + minimumCubes(game);
    }, 0);

    console.log('Solution 2: ' + result);
}

// execute the parts
part1(); part2();