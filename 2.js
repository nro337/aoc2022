const {readFileSync, promises: fsPromises} = require('fs');
//Parsing source: https://bobbyhadz.com/blog/javascript-read-file-into-array

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);
  //console.log(arr); // 👉️ ['One', 'Two', 'Three', 'Four']

  let totalScore = 0;
  arr.forEach((item) => {
    const vals = {
      A: 1,
      B: 2,
      C: 3,
      X: 1,
      Y: 2,
      Z: 3
    };
    let eachArray = item.split(" ")
    let opponent = eachArray[0]
    let you = eachArray[1]

    //let res = rps(vals[opponent], vals[you])
    //totalScore += res
    let res2 = proj(opponent, you)
    totalScore += res2

    
  })
  console.log(totalScore)

  
}

function proj(opp, you){
  const vals = {
    A: 1,
    B: 2,
    C: 3,
    X: 1,
    Y: 2,
    Z: 3
  };
  if (you === 'Y'){
    return vals[opp] + 3
  }
  if (you === 'Z'){
    if (vals[opp] === 1){
      return 2 + 6
    }
    if (vals[opp] === 2){
      return 3 + 6
    }
    if (vals[opp] === 3){
      return 1 + 6
    }
  }
  if (you === 'X'){
    if (vals[opp] === 1){
      return 3
    }
    if (vals[opp] === 2){
      return 1
    }
    if (vals[opp] === 3){
      return 2
    }
  }
}

function rps(opp, you) {
  if (opp === you){
    return you + 3
  }
  if ((opp === 1 || you === 1) && (opp === 2 || you === 2)){
    if (you === 2) {
      return 8
    } else{
      return you //1
    }
  }
  if ((opp === 2 || you === 2) && (opp === 3 || you === 3)){
    if (you === 3){
      return 9
    } else {
      return you
    }
  }
  if ((opp === 1 || you === 1) && (opp === 3 || you === 3)){
    if (you === 1){
      return 7
    } else {
      return you
    }
  }
}

syncReadFile('./2.txt');