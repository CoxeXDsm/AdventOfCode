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
    const seeds = map[0].split(": ")[1].split(" ").map(x => parseInt(x)).reduce((a, x, i) => {
        if (i % 2 == 0) a.push([]);
        return a[a.length - 1].push(x), a;
    }, []);

    const maps = map.slice(1).map(x => x.split("\n").slice(1).map(y => y.split(" ").map(z => parseInt(z))));
    const resultArray = [];

    function expand(index, values) {
        if (index == maps.length) return [values];
    
        const result = [];
        for (const [destination, source, range] of maps[index]) {
            if (values[0] < source && values[0] + values[1] > source && values[0] + values[1] <= source + range) {
                const firstTuple = [values[0], source - values[0]];
                const lastTuple = [destination, values[1] - source + values[0]];
                result.push(...expand(index + 1, lastTuple), ...expand(index, firstTuple));
                break;
            }
            else if (values[0] >= source && values[0] < source + range && values[0] + values[1] > source + range) {
                const firstTuple = [destination + values[0] - source, source + range - values[0]];
                const lastTuple = [source + range, values[0] + values[1] - source - range];
                result.push(...expand(index + 1, firstTuple), ...expand(index, lastTuple));
                break;
            }
            else if (values[0] >= source && values[0] + values[1] <= source + range) {
                result.push(...expand(index + 1, [destination + values[0] - source, values[1]]));
                break;
            }
            else if (values[0] < source && values[0] + values[1] > source + range) {
                const firstTuple = [values[0], source - values[0]];
                const middleTuple = [destination, range];
                const lastTuple = [source + range, values[0] + values[1] - source - range];
                result.push(...expand(index, lastTuple), ...expand(index + 1, middleTuple), ...expand(index, firstTuple));
                break;
            }
        }
    
        if (result.length == 0) result.push(...expand(index + 1, values));
        return result;
    }

    for (const seed of seeds) {
        resultArray.push(expand(0, seed));
    }

    let result = Math.min(...resultArray.flat().map(x => x[0]))

    console.log('Solution 2: ' + result);
}

// execute the parts
part1(); part2();