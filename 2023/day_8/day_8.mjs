import { readFileSync } from "node:fs";

const map = readFileSync("day_8/day_8.txt", { encoding: "utf-8" }) // read day_??.txt content
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .trim()
  .split(/\n/g);

const directions = map[0].split('');

const sites = new Map();
const arraySites = [];

for (let i=2; i < map.length; i++){
    let aux = map[i];
    const site = aux.substring(0,3);
    const left = aux.substring(7,10);
    const right = aux.substring(12,15);
    sites.set(site, [left, right]);
    arraySites.push(site);
}

function part1(){
    function countSteps(position){
        let steps = 0;
        let actualPosition = position;
        while (true) {
            for (let x = 0; x < directions.length; x++){
                if (actualPosition == 'ZZZ'){
                    return steps;
                }
                let actualSite = sites.get(actualPosition);
                let direction = directions[x];
                actualPosition = direction == 'L' ? actualSite[0] : actualSite[1];
                steps++;
            }
        }
    }

    let result = countSteps('AAA');
    console.log('Solution 1: ' + result);
}

function part2(){
    const lcm = (...arr) => {
        const gcd = (x, y) => (!y ? x : gcd(y, x % y));
        const _lcm = (x, y) => (x * y) / gcd(x, y);
        return [...arr].reduce((a, b) => _lcm(a, b));
      };

    function countSteps(position){
        let steps = 0;
        let actualPosition = position;
        while (true) {
            for (let x = 0; x < directions.length; x++){
                if (actualPosition.charAt(actualPosition.length-1) == 'Z'){
                    return steps;
                }
                let actualSite = sites.get(actualPosition);
                let direction = directions[x];
                actualPosition = direction == 'L' ? actualSite[0] : actualSite[1];
                steps++;
            }
        }
    }

    let entradas = arraySites.filter(i => i.charAt(i.length-1) == 'A');
    let minSteps = [];
    for (let input of entradas){
        let aux = countSteps(input);
        minSteps.push(aux);
    }
    let result = lcm(...minSteps);
    console.log('Solution 2: ' + result);
}

// execute the parts
part1(); part2();