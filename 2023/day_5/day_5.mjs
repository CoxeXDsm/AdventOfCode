import { readFileSync } from "node:fs";

const map = readFileSync("2023\\day_5\\day_5.txt", { encoding: "utf-8" }) // read day_??.txt content
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .trim()
  .split(/\n\n/g);

function part1(){
    function transform(seed, mapTrans){
        for (let i = 0; i < mapTrans.length; i++){
            if(seed >= Number(mapTrans[i][1]) && seed < (Number(mapTrans[i][1])+Number(mapTrans[i][2]))){
                let diff = seed - Number(mapTrans[i][1]);
                return Number(mapTrans[i][0]) + diff;
            }
        }
        return seed;
    }

    let parts = map.map(x => x.split(/\n/g));
    let seeds = parts[0][0].split(' ');
    seeds.shift();

    for (let x = 1; x < parts.length; x++){
        let transformMap = parts[x];
        let byPass = transformMap.shift();
        transformMap = transformMap.map(e => e.split(' '));

        for (let i = 0; i < seeds.length; i++){
            seeds[i] = transform(Number(seeds[i]), transformMap);
        }
    }
    let result = Math.min(...seeds);
    console.log('Solution 1: ' + result);
}

function part2(){
    function transform(seed, mapTrans){
        for (let i = 0; i < mapTrans.length; i++){
            if(seed >= Number(mapTrans[i][1]) && seed < (Number(mapTrans[i][1])+Number(mapTrans[i][2]))){
                let diff = seed - Number(mapTrans[i][1]);
                return Number(mapTrans[i][0]) + diff;
            }
        }
        return seed;
    }

    let parts = map.map(x => x.split(/\n/g));
    let seeds = parts[0][0].split(' ');
    seeds.shift();

    let result = -1;

    for(let x = 0; x < seeds.length; x+=2){
        for (let y = 0; y < Number(seeds[x+1]); y++){
            let aux = Number(seeds[x])+y;
            for (let x = 1; x < parts.length; x++){
                let transformMap = [...parts[x]];
                let byPass = transformMap.shift();
                transformMap = transformMap.map(e => e.split(' '));

                aux = transform(aux, transformMap);
            }
            result = result == -1 ? aux : Math.min(result,aux);
        }
    }

    console.log('Solution 2: ' + result);

    /*
    for(let x = 0; x < seeds.length; x+=2){
                    for (let y = 0; y < Number(seeds[x+1]); y++){
                        aux.push(Number(seeds[x]+y));
                        let aux = transform(Number(seeds[x]+y), transformMap);
                    }
                }
    */
}

// execute the parts
part1(); part2();