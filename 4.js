const {readFileSync, promises: fsPromises} = require('fs');
//Parsing source: https://bobbyhadz.com/blog/javascript-read-file-into-array

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);
  return arr
}

let initialList = syncReadFile('./4.txt');
const a = parsingFunction(initialList)

//const total = comparison(a[0], a[1])
const total2 = comparisonPart2(a[0], a[1])
console.log(total2)

function parsingFunction(array){
  const firstElfArray = []
  const secondElfArray = []
  array.forEach((pair) => {
    const separatePairsArray = pair.split(",")
    const elfOneBottomNum = parseInt(separatePairsArray[0].split("-")[0])
    const elfOneTopNum = parseInt(separatePairsArray[0].split("-")[1])
    const elfTwoBottomNum = parseInt(separatePairsArray[1].split("-")[0])
    const elfTwoTopNum = parseInt(separatePairsArray[1].split("-")[1])
    let count = elfOneBottomNum
    let lineArr = []
    let lineArr2 = []
    let count2 = elfTwoBottomNum
    while (count <= elfOneTopNum){
      if (count === elfOneTopNum){
        lineArr.push(count)
        firstElfArray.push(lineArr)
        break
      }
      lineArr.push(count)
      count++
    }

    while (count2 <= elfTwoTopNum) {
      if (count2 === elfTwoTopNum){
        lineArr2.push(count2)
        secondElfArray.push(lineArr2)
        break
      }
      lineArr2.push(count2)
      count2++
    }
  })
  return [firstElfArray, secondElfArray]
}

function comparison(elfOneList, elfTwoList){
  const tallyArr = []
  for(let i=0; i < elfOneList.length; i++){
    for(let j=0; j < elfTwoList.length; j++){
      if (!tallyArr.includes(elfOneList[i]) && (elfTwoList[i].every(a => elfOneList[i].includes(a)) || elfOneList[i].every(b => elfTwoList[i].includes(b)))){
        tallyArr.push(elfOneList[i])
      }
    }
  }
  return tallyArr.length
}

function comparisonPart2(elfOneList, elfTwoList){
  const tallyArr = []
  for(let i=0; i < elfOneList.length; i++){
    for(let j=0; j < elfTwoList.length; j++){
      if (!tallyArr.includes(elfOneList[i]) && (elfTwoList[i].some(a => elfOneList[i].includes(a)) || elfOneList[i].some(b => elfTwoList[i].includes(b)))){
        tallyArr.push(elfOneList[i])
      }
    }
  }
  return tallyArr.length
}