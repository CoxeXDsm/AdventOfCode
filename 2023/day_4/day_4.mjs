import { readFileSync } from "node:fs";

const cards = readFileSync("2023\\day_4\\day_4.txt", { encoding: "utf-8" }) // read day_??.txt content
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .trim()
  .replaceAll(':', '|')
  .replaceAll('   ', ' ')
  .replaceAll('  ', ' ')
  .replaceAll(' | ', '|')
  .replaceAll('| ', '|')
  .split(/\n/g); 

function part1(){
    let result = 0;
    for (let card of cards){
        let cardParts = card.split('|');
        let winners = cardParts[1].split(' ');
        let numbers = cardParts[2].split(' ');
        let points = numbers.reduce((points, curr) => {
            if (winners.includes(curr))
                return points +1;
            return points;
        } , 0);
        result += points;
    }
    console.log('Solution 1: ' + result);
}

function part2(){
    let totalCards = [...Array(cards.length).keys()].map(i=>i+1);

    for (let idx = 0; idx < totalCards.length; idx++){
        let card = cards[totalCards[idx]-1];
        let cardParts = card.split('|');
        let winners = cardParts[1].split(' ');
        let numbers = cardParts[2].split(' ');
        let points = numbers.reduce((points, curr) => {
            if (winners.includes(curr))
                return points +1;
            return points;
        } , 0);
        for (let x = 1; x <= points; x++){
            totalCards.push(totalCards[idx] + x);
        }
    }

    console.log('Solution 2: ' + totalCards.length);
}

// execute the parts
part1(); part2();