import { readFileSync } from "node:fs";

const strings = readFileSync("2023\\day_15\\day_15.txt", { encoding: "utf-8" }) // read day_??.txt content
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .replace(/\n/g, ",")
  .trim()
  .split(","); 

function part1(){
    function hashAlgorythm(str){
        let array = str.split(""), result = 0;
        for(let i = 0; i < array.length; i++){
            let char = array[i];
            let ascii = char.charCodeAt(0);
            result = ((result + ascii) * 17) % 256;
        }
        return result;
    }

    let result = 0;
    for (let i = 0; i < strings.length; i++){
        let str = strings[i];
        result += hashAlgorythm(str);
    }
    
    console.log('Solution 1: ' + result);
}

function part2(){
    function hashAlgorythm(str){
        let array = str.split(""), result = 0;
        for(let i = 0; i < array.length; i++){
            let char = array[i];
            let ascii = char.charCodeAt(0);
            result = ((result + ascii) * 17) % 256;
        }
        return result;
    }

    let map = new Map();
    let result = 0;
    for (let i = 0; i < strings.length; i++){
        let str = strings[i];
        if (str.indexOf("=") != -1){
            let parts = str.split("=");
            
        } else {
            let parts = str.split("-");

        }
        result += hashAlgorythm(str);
    }

    console.log('Solution 2: ');
}

// execute the parts
part1(); part2();
