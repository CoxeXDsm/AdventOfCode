import { readFileSync } from "node:fs";

let mirrors = readFileSync("day_13/day_13.txt", { encoding: "utf-8" }) // read day_??.txt content
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .trim()
  .split(/\n\n/g)
  .map(x => x.split('\n')); 

function part1(){
    function range(n){
        return [...Array(n).keys()];
    }

    function split(map, i){
        return map.reduce((res, line) => {
            if (res === false || i >= line.length - 1){ 
                return res;
            }
            const p1 = line.slice(0, i + 1).split('').reverse().join('');
            const p2 = line.slice(i + 1, i + p1.length + 1);
            return !!p1.startsWith(p2);
        }, true);
    }

    function check(map){
        const height = map.length, width = map[0].length;

        const reflexCols = range(width-1).find((i) => split(map, i));
        if (reflexCols !== undefined){ return reflexCols+1 }

        const transposed = range(width).map(r => range(height).map(c => map[c][r]).join(''))
        const reflexLines = range(height-1).find((i => split(transposed, i)));
        return (reflexLines !== undefined ? (reflexLines+1)*100 : 0); 
    }

    let result = mirrors.reduce((t, map) => t + check(map), 0);
    console.log('Solution 1: ' + result);
}

function part2(){
    function range(n){
        return [...Array(n).keys()];
    }

    function split(map, i){
        return map.reduce((res, line) => {
            if (res === false || i >= line.length - 1){ 
                return res;
            }
            const p1 = line.slice(0, i + 1).split('').reverse().join('');
            const p2 = line.slice(i + 1, i + p1.length + 1);
            return !!p1.startsWith(p2);
        }, true);
    }

    function check(map, flipped){
        const height = map.length, width = map[0].length;

        const reflexCols = range(width-1).find((i) => (!flipped || flipped !== i+1) && split(map, i));
        if (reflexCols !== undefined){ return reflexCols+1 }

        const transposed = range(width).map(r => range(height).map(c => map[c][r]).join(''))
        const reflexLines = range(height-1).find((i => (!flipped || flipped/100 !== i+1) && split(transposed, i)));
        return (reflexLines !== undefined ? (reflexLines+1)*100 : 0); 
    }

    const fix = (map) => {
        function flip(r, c) {
            map[r] = map[r].slice(0, c) + (map[r][c] === '.' ? '#' : '.') 
                        + map[r].slice(c + 1);
        }

        const height = map.length, width = map[0].length;
      
        const original = check(map);
        for (let row = 0; row < height; row++) {
          for (let col = 0; col < width; col++) {
            flip(row, col)
            const second = check(map, original)
            if (second) {
              return second
            } else {
              flip(row, col)
            }
          }
        }
        return 0
      }

    let result = mirrors.reduce((t, map) => t + fix(map), 0);
    console.log('Solution 2: ' + result);
}

// execute the parts
part1(); part2();