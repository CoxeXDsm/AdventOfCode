import { readFileSync } from "node:fs";

const hands = readFileSync("2023\\day_7\\day_7.txt", { encoding: "utf-8" }) // read day_??.txt content
  .replace(/\r/g, "") // remove all \r characters to avoid issues on Windows
  .trim()
  .split(/\n/g);;

function part1(){
    const ranks = ["2","3","4","5","6","7","8","9","T","J","Q","K","A"];
    let result = 0;

    function countRanks(hand) {
      let rankCount = {};
      hand.forEach(function(x) {
        rankCount[x] = (rankCount[x] || 0) + 1;
      });
      return rankCount;
    }
    function twoKind(hand) {
      let rS = countRanks(hand);
      return Object.keys(rS).filter(key => rS[key] === 2).length;
    }
    function threeKind(hand) {
      let rS = countRanks(hand);
      return Object.keys(rS).filter(key => rS[key] === 3).length;
    }
    function fourKind(hand) {
      let rS = countRanks(hand);
      return Object.keys(rS).filter(key => rS[key] === 4).length;
    }
    function fiveKind(hand) {
      let rS = countRanks(hand);
      return Object.keys(rS).filter(key => rS[key] === 5).length;
    }

    function pointHand(hand){
      if(fiveKind(hand) == 1){return 7;}
      else if(fourKind(hand) == 1){return 6;}
      else if(threeKind(hand) == 1 && twoKind(hand) == 1){return 5;}
      else if(threeKind(hand) == 1){return 4;}
      else if(twoKind(hand) == 2){return 3;}
      else if(twoKind(hand) == 1){return 2;}
      else{return 1;}
    }

    function compareHands(a,b){
      let handA = a.split(' ')[0].split('');
      let handB = b.split(' ')[0].split('');

      let pointsA = pointHand(handA);
      let pointsB = pointHand(handB);

      //console.log({handA,pointsA,handB,pointsB});

      if (pointsA === pointsB) {
        for (let i = 0; i < 5; i++){
          let rankA = ranks.indexOf(handA[i]);
          let rankB = ranks.indexOf(handB[i]);
          if (rankA != rankB){
            return rankA - rankB;
          }
        }
        return 0;
      } else {
        return pointsA - pointsB;
      }
    }

    let handCopy = [...hands];
    handCopy.sort(compareHands);

    for (let i = 0; i < handCopy.length; i++){
      let data = handCopy[i].split(' ');
      let bid = Number(data[1]);
      result += (bid*(i+1));
    }

    console.log('Solution 1: ' + result);
}

function part2(){
    const ranks = ["J","2","3","4","5","6","7","8","9","T","Q","K","A"];
    let result = 0;

    function countRanks(hand) {
      let rankCount = {};
      hand.forEach(function(x) {
        rankCount[x] = (rankCount[x] || 0) + 1;
      });
      return rankCount;
    }
    function twoKind(rS) {
      return Object.keys(rS).filter(key => rS[key] === 2).length;
    }
    function threeKind(rS) {
      return Object.keys(rS).filter(key => rS[key] === 3).length;
    }
    function fourKind(rS) {
      return Object.keys(rS).filter(key => rS[key] === 4).length;
    }
    function fiveKind(rS) {
      return Object.keys(rS).filter(key => rS[key] === 5).length;
    }

    function pointHand(rS){
      if(fiveKind(rS) == 1){return 7;}
      else if(fourKind(rS) == 1){return 6;}
      else if(threeKind(rS) == 1 && twoKind(rS) == 1){return 5;}
      else if(threeKind(rS) == 1){return 4;}
      else if(twoKind(rS) == 2){return 3;}
      else if(twoKind(rS) == 1){return 2;}
      else{return 1;}
    }

    function compareHands(a,b){
      let handA = a.split(' ')[0].split('');
      let handB = b.split(' ')[0].split('');

      let rsA = countRanks(handA);
      let rsB = countRanks(handB);

      if(rsA['J'] !== undefined){
        let maxCount = 0;
        let maxCard;
        for(const [card, count] of Object.entries(rsA)){
          if (card !== 'J' && count > maxCount){
            maxCount = count;
            maxCard = card
          }
        }
        if (maxCount != 0){
          rsA[maxCard] = rsA[maxCard] + rsA['J'];
          delete rsA['J'];
        }
      }

      if(rsB['J'] !== undefined){
        let maxCount = 0;
        let maxCard;
        for(const [card, count] of Object.entries(rsB)){
          if (card !== 'J' && count > maxCount){
            maxCount = count;
            maxCard = card
          }
        }
        if (maxCount != 0){
          rsB[maxCard] = rsB[maxCard] + rsB['J'];
          delete rsB['J'];
        }
      }

      let pointsA = pointHand(rsA);
      let pointsB = pointHand(rsB);

      if (pointsA === pointsB) {
        for (let i = 0; i < 5; i++){
          let rankA = ranks.indexOf(handA[i]);
          let rankB = ranks.indexOf(handB[i]);
          if (rankA != rankB){
            return rankA - rankB;
          }
        }
        return 0;
      } else {
        return pointsA - pointsB;
      }
    }

    let handCopy = [...hands];
    handCopy.sort(compareHands);

    for (let i = 0; i < handCopy.length; i++){
      let data = handCopy[i].split(' ');
      let bid = Number(data[1]);
      result += (bid*(i+1));
    }

    console.log('Solution 2: ' + result);
}

// execute the parts
part1(); part2();