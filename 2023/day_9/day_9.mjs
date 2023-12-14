import { readFileSync } from "node:fs";

const oasis = readFileSync("2023\\day_9\\day_9.txt", { encoding: "utf-8" }) // read day_??.txt content
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .trim()
  .split(/\n/g); 

function part1(){
    function nextStep(array){
      if (array.every((e, i) => array[i] == 0)){
        return 0;
      }

      let aux = [];

      for(let i = 0; i < array.length-1; i++){
        aux.push(array[i+1]-array[i]);
      }

      let next = nextStep(aux);
      return array[array.length-1] + next;
    }

    let result = 0;

    for (let line of oasis){
      let steps = line.split(' ').map(x => Number(x));
      let next = nextStep(steps);
      result += next;
    }
    console.log('Solution 1: ' + result);
}

function part2(){
    function nextStep(array){
      if (array.every((e, i) => array[i] == 0)){
        return 0;
      }

      let aux = [];

      for(let i = 0; i < array.length-1; i++){
        aux.push(array[i+1]-array[i]);
      }

      let next = nextStep(aux);
      return array[0] - next;
    }

    let result = 0;

    for (let line of oasis){
      let steps = line.split(' ').map(x => Number(x));
      let next = nextStep(steps);
      result += next;
    }
    
    console.log('Solution 2: ' + result);
}

// execute the parts
part1(); part2();