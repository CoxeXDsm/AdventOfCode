import { readFileSync } from "node:fs";

let constelation = readFileSync("2023\\day_11\\day_11.txt", { encoding: "utf-8" }) // read day_??.txt content
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .trim()
  .split(/\n/g)
  .map(x => x.split('')); 

function part1(){
    const times = 2;
    let lines = [], cols = [];
    let galaxies = [];
    let result = 0;
    
    for (let x = 0; x < constelation.length; x++){
        for (let y = 0; y < constelation[x].length; y++){
            if (constelation[x][y] == '#'){
                galaxies.push([x,y]);
            } 
        }
    }

    for (let i = 0; i < constelation.length; i++){
        if (constelation[i].every(x => x != '#')){
            lines.push(i);
        }
    }
    for (let i = 0; i < constelation[0].length; i++){
        let aux = constelation.map(x => x[i]);
        if (aux.every(x => x != '#')){
            cols.push(i)
        }
    }

    for (let i = 0; i < galaxies.length; i++){
        let galaxyA = [...galaxies[i]];
        galaxyA[0] = galaxyA[0] + ((lines.filter(line => line <= galaxyA[0]).length)*(times-1));
        galaxyA[1] = galaxyA[1] + ((cols.filter(col => col <= galaxyA[1]).length)*(times-1));
        for (let j = i+1; j < galaxies.length; j++){
            let galaxyB = [...galaxies[j]];
            galaxyB[0] = galaxyB[0] + ((lines.filter(line => line <= galaxyB[0]).length)*(times-1));
            galaxyB[1] = galaxyB[1] + ((cols.filter(col => col <= galaxyB[1]).length)*(times-1));
            result += Math.abs(galaxyB[0] - galaxyA[0]) + Math.abs(galaxyB[1] - galaxyA[1]);
        }
    }
    console.log('Solution 1: ' + result);
}

function part2(){
    const times = 1000000;
    let lines = [], cols = [];
    let galaxies = [];
    let result = 0;
    
    for (let x = 0; x < constelation.length; x++){
        for (let y = 0; y < constelation[x].length; y++){
            if (constelation[x][y] == '#'){
                galaxies.push([x,y]);
            } 
        }
    }

    for (let i = 0; i < constelation.length; i++){
        if (constelation[i].every(x => x != '#')){
            lines.push(i);
        }
    }
    for (let i = 0; i < constelation[0].length; i++){
        let aux = constelation.map(x => x[i]);
        if (aux.every(x => x != '#')){
            cols.push(i)
        }
    }

    for (let i = 0; i < galaxies.length; i++){
        let galaxyA = [...galaxies[i]];
        galaxyA[0] = galaxyA[0] + ((lines.filter(line => line <= galaxyA[0]).length)*(times-1));
        galaxyA[1] = galaxyA[1] + ((cols.filter(col => col <= galaxyA[1]).length)*(times-1));
        for (let j = i+1; j < galaxies.length; j++){
            let galaxyB = [...galaxies[j]];
            galaxyB[0] = galaxyB[0] + ((lines.filter(line => line <= galaxyB[0]).length)*(times-1));
            galaxyB[1] = galaxyB[1] + ((cols.filter(col => col <= galaxyB[1]).length)*(times-1));
            result += Math.abs(galaxyB[0] - galaxyA[0]) + Math.abs(galaxyB[1] - galaxyA[1]);
        }
    }
    console.log('Solution 2: ' + result);
}

// execute the parts
part1(); part2();