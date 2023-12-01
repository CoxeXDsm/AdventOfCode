import { readFileSync } from "node:fs";

const calibration = readFileSync("2023\\day_1\\day_1.txt", { encoding: "utf-8" }) // read day_??.txt content
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .trim()
  .split(/\n/g); 

function part1(){
    function isCharNumber(c) {
      return c >= '0' && c <= '9';
    }

    let result = calibration.reduce((acc, curr) => {
      let combination = '';

      for (let x = 0; x < curr.length; x++){
        if(isCharNumber(curr.charAt(x))){
          combination += curr.charAt(x);
          break;
        }
      }

      for (let x = curr.length; x >= 0; x--){
        if(isCharNumber(curr.charAt(x))){
          combination += curr.charAt(x);
          break;
        }
      }
      
      return acc + Number(combination);
    }, 0)
    console.log('Solution 1: ' + result);
}

function part2(){
    function isCharNumber(c) {
      return c >= '0' && c <= '9';
    }

    function replaceStrNumbers(str){
      const numbersMap = new Map([
        ['zero', '0'], ['one', '1'], ['two', '2'], ['three', '3'], ['four', '4'],
        ['five', '5'], ['six', '6'], ['seven', '7'], ['eight', '8'], ['nine', '9']
      ]);

      for (let entry of numbersMap){
        let regexp = new RegExp(entry[0], "gi");
        str = str.replaceAll(regexp, entry[1]);
      }

      return str;
    }

    let result = calibration.reduce((acc, curr) => {
      let combination = '';
      let reformat = replaceStrNumbers(curr);

      console.log(reformat);

      for (let x = 0; x < reformat.length; x++){
        if(isCharNumber(reformat.charAt(x))){
          combination += reformat.charAt(x);
          break;
        }
      }

      for (let x = reformat.length; x >= 0; x--){
        if(isCharNumber(reformat.charAt(x))){
          combination += reformat.charAt(x);
          break;
        }
      }
      
      return acc + Number(combination);
    }, 0)
    console.log('Solution 2: ' + result);
}

// execute the parts
part1(); part2();
