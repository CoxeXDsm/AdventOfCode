import { readFileSync } from "node:fs";

let constelation = readFileSync("2023\\day_11\\day_11test.txt", { encoding: "utf-8" }) // read day_??.txt content
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .trim()
  .split(/\n/g)
  .map(x => x.split('')); 

function part1(){
    function duplicateSpace(mapSpace){
        for (let i = 0; i < mapSpace.length; i++){
            if (mapSpace[i].every(x => x != '#')){
                mapSpace = [
                    ...mapSpace.slice(0, i),
                    mapSpace[i],
                    ...mapSpace.slice(i)
                ];
                i++;
            }
        }
    
        let cols = [];
        for (let i = 0; i < mapSpace[0].length; i++){
            let aux = mapSpace.map(x => x[i]);
            cols.push(aux);
            if (aux.every(x => x != '#')){ cols.push(aux); }
        }
    
        mapSpace = mapSpace.map((e,i) => {
            let aux = [];
            for(let col of cols){ aux.push(col[i]); }
            return aux;
        });
    
        return mapSpace;
    }

    let mapConstelation = duplicateSpace(constelation);

    let galaxies = [];
    let result = 0;
    for (let x = 0; x < mapConstelation.length; x++){
        for (let y = 0; y < mapConstelation[x].length; y++){
            if (mapConstelation[x][y] == '#'){
                galaxies.push([x,y]);
            } 
        }
    }

    for (let i = 0; i < galaxies.length; i++){
        let galaxyA = galaxies[i];
        for (let j = i+1; j < galaxies.length; j++){
            let galaxyB = galaxies[j];
            result += Math.abs(galaxyB[0] - galaxyA[0]) + Math.abs(galaxyB[1] - galaxyA[1]);
        }
    }
    console.log('Solution 1: ' + result);
}

function part2(){
    function expandSpace(mapSpace, times){
        for (let i = 0; i < mapSpace.length; i++){
            if (mapSpace[i].every(x => x != '#')){
                console.log(mapSpace[i]);
                let ant = [...mapSpace.slice(0, i)];
                let pos = [...mapSpace.slice(i)];
                let res = ant;
                for (let x = 0; x < times-1; x++){
                    res.push(mapSpace[i]);
                }
                res.push(pos);
                mapSpace = res;
                i = i+times-1;
                //console.log(mapSpace);
            }
        }

        console.log(mapSpace.length);
    
        let cols = [];
        for (let i = 0; i < mapSpace[0].length; i++){
            let aux = mapSpace.map(x => x[i]);
            cols.push(aux);
            if (aux.every(x => x != '#')){
                for (let x = 0; x < times-1; x++){ 
                    cols.push(aux); 
                }
            }
        }
    
        mapSpace = mapSpace.map((e,i) => {
            let aux = [];
            for(let col of cols){ aux.push(col[i]); }
            return aux;
        });
    
        return mapSpace;
    }

    let mapConstelation = expandSpace(constelation, 5);
    console.log(mapConstelation.length + ' ' + mapConstelation[0].length);

    let galaxies = [];
    let result = 0;
    for (let x = 0; x < mapConstelation.length; x++){
        for (let y = 0; y < mapConstelation[x].length; y++){
            if (mapConstelation[x][y] == '#'){
                galaxies.push([x,y]);
            } 
        }
    }

    for (let i = 0; i < galaxies.length; i++){
        let galaxyA = galaxies[i];
        for (let j = i+1; j < galaxies.length; j++){
            let galaxyB = galaxies[j];
            result += Math.abs(galaxyB[0] - galaxyA[0]) + Math.abs(galaxyB[1] - galaxyA[1]);
        }
    }
    console.log('Solution 2: ' + result);
}

// execute the parts
part1(); part2();