import { readFileSync } from "node:fs";

const map = readFileSync("2023\\day_10\\day_10.txt", { encoding: "utf-8" }) // read day_??.txt content
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .trim()
  .split(/\n/g)
  .map(x => x.split(''));

let height = map.length, width = map[0].length;

const collindants = new Map([
    ['|', ['N', 'S']],
    ['-', ['E', 'W']],
    ['L', ['N', 'E']],
    ['J', ['N', 'W']],
    ['7', ['S', 'W']],
    ['F', ['S', 'E']],
    ['S', ['N', 'S', 'E', 'W']],
    ['.', []]
]);

const positions = new Map([
    ['N', [-1, 0]],['S', [1, 0]],['W', [0, -1]],['E', [0, 1]]
])

const connections = new Map([
    ['N', 'S'],['S', 'N'],['E', 'W'],['W', 'E'],
])

function part1(){
    let startX, startY, isFirst = true;
    let actualX = -1, actualY = -1, antX = -1, antY = -1, punt = 0;
    let resultCall;

    function locateS(){
        for (let x = 0; x < map.length; x++){
            for(let y = 0; y < map[0].length; y++){
                if (map[x][y] == 'S'){
                    startX = x;
                    startY = y;
                    return;
                }
            }
        }
    }

    function checkCollindants(x,y,antX,antY,punt){
        let pipe = map[x][y];
        let moveX, moveY;

        let lats = collindants.get(pipe);
        for (let coord of lats){

            let diff = positions.get(coord);
            moveX = x+diff[0]; moveY = y+diff[1];

            if (moveX >= 0 && moveX < width && moveY >= 0 && moveY < height){

                let nextPipe = map[moveX][moveY];

                if (moveX != antX || moveY != antY){
                    if (nextPipe == 'S'){
                        return [moveX, moveY, x, y, punt+1];
                    }
                    if(collindants.get(nextPipe).includes(connections.get(coord))){
                        break;
                    }
                }
            }
        }
        return [moveX, moveY, x, y, punt+1];
    }

    locateS();
    while(actualX != startX || actualY != startY){
        resultCall = checkCollindants(isFirst ? startX : actualX, 
                                        isFirst ? startY : actualY, 
                                        isFirst ? startX : antX,
                                        isFirst ? startY : antY,
                                        punt);
        isFirst = false;
        [actualX, actualY, antX, antY, punt] = resultCall;
    }
    

    console.log('Solution 1: ' + punt/2);
}

function part2(){
    let startX, startY, isFirst = true;
    let actualX = -1, actualY = -1, antX = -1, antY = -1, punt = 0;
    let resultCall;
    let points = [];

    function locateS(){
        for (let x = 0; x < map.length; x++){
            for(let y = 0; y < map[0].length; y++){
                if (map[x][y] == 'S'){
                    startX = x;
                    startY = y;
                    return;
                }
            }
        }
    }

    function checkCollindants(x,y,antX,antY,punt){
        let pipe = map[x][y];
        let moveX, moveY;

        let lats = collindants.get(pipe);
        for (let coord of lats){

            let diff = positions.get(coord);
            moveX = x+diff[0]; moveY = y+diff[1];

            if (moveX >= 0 && moveX < width && moveY >= 0 && moveY < height){

                let nextPipe = map[moveX][moveY];

                if (moveX != antX || moveY != antY){
                    if (nextPipe == 'S'){
                        return [moveX, moveY, x, y, punt+1];
                    }
                    if(collindants.get(nextPipe).includes(connections.get(coord))){
                        break;
                    }
                }
            }
        }
        return [moveX, moveY, x, y, punt+1];
    }

    locateS();
    while(actualX != startX || actualY != startY){
        resultCall = checkCollindants(isFirst ? startX : actualX, 
                                        isFirst ? startY : actualY, 
                                        isFirst ? startX : antX,
                                        isFirst ? startY : antY,
                                        punt);
        isFirst = false;
        [actualX, actualY, antX, antY, punt] = resultCall;
        points.push([actualX, actualY]);
    }

    let area = 0;
    for (let i = 0; i < points.length; i++){
        let actual = points[i];
        let next = points[(i+1 == points.length ? 0 : i+1)];
        let calc = ((actual[0]*next[1]) - (actual[1]*next[0]));
        area += calc;
    }

    area = Math.abs(area)/2;
    let result = area - (points.length/2) + 1;
    console.log('Solution 2: ' + result);
}

// execute the parts
part1(); part2();