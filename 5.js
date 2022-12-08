const {readFileSync, promises: fsPromises} = require('fs');
//Parsing source: https://bobbyhadz.com/blog/javascript-read-file-into-array

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);
  const crates = arr.slice(0, 9)
  const movesList = arr.slice(10, arr.length)
  
  let cratesObj = {}
  const parsedCrates = crates.slice(-1)[0]
  for(let i=0; i < parsedCrates.length; i++){
    cratesObj[i] = parsedCrates[i]
  }
  Object.keys(cratesObj).forEach((key) => {
    if (cratesObj[key] === ' '){
      delete cratesObj[key]
    }
  })


  let parsedArray = []
  for(let i=0; i < crates.slice(0, arr.slice(0, 9).length - 1).length; i++) {
    let a = crates[i].split('')
    // console.log(a)
    for(let j=0; j < a.length; j++){
      if (a[j] !== ' ' && a[j] !== '[' & a[j] !== ']'){
        let obj = {} 
        obj[cratesObj[j.toString()]] = a[j]
        parsedArray.push(obj)
        //console.log(a[j], cratesObj[j.toString()])
      }
    }
  }
  return [parsedArray, movesList]

}

let crateList = syncReadFile('./5.txt');

let crateData = crateList[0]
let movesList = crateList[1]

let parsedMovesList = []
for (let i=0; i < movesList.length; i++){
  let tempArr = []
  let a = movesList[i].split(' ')
  tempArr.push(a[1])
  tempArr.push(a[3])
  tempArr.push(a[5])
  parsedMovesList.push(tempArr)
}

//console.log(parsedMovesList, crateData)
let finalParsedCrates = []
for (let i = 0; i < parsedMovesList.length; i++){
  const found = crateData.filter(obj => Object.keys(obj)[0] === parsedMovesList[i][0])
  //console.log(found)
  //Source: https://stackoverflow.com/a/33210887/10261408
  let stringifiedFinalParsedCrates = JSON.stringify(finalParsedCrates)
  let currentStringified = JSON.stringify(found)
  var c = stringifiedFinalParsedCrates.indexOf(currentStringified)
  if (c === -1){
    finalParsedCrates.push(found)
  }
}
for(let i=0; i < finalParsedCrates.length; i++){
  if (finalParsedCrates[i].length === 0){
    finalParsedCrates.splice(i, 1)
  }
}
//console.log(finalParsedCrates)
//finalParsedCrates.pop()
let sortedParsedCrates = []
sortedParsedCrates = finalParsedCrates.sort((a, b) => Object.keys(a[0])[0] - Object.keys(b[0])[0])

// Part 1
// parsedMovesList.forEach((move) => {
//   sortedParsedCrates.forEach((row) => {
//     console.log(move)
//     let a = row.filter(a => Object.keys(a)[0] === move[1])
//     if (a.length){
//       for (let loop = 0; loop < parseInt(move[0]); loop++){
//         let shiftingObj = a.shift()
//         let correctedShiftingObj = {}
//         correctedShiftingObj[move[2]] = Object.values(shiftingObj)[0]
//         //console.log(shiftingObj, a, row)
//         let placingRowIndex = move[2] - 1
//         //sortedParsedCrates[parseInt(Object.keys(shiftingObj)[0]) - 1]
//         sortedParsedCrates[move[1] - 1].shift()
//         sortedParsedCrates[placingRowIndex].unshift(correctedShiftingObj)
//         console.log('/', sortedParsedCrates)
//       }
//     }
//   })
// })

//Part 2
parsedMovesList.forEach((move) => {
  for(let i=0; i < sortedParsedCrates.length; i++){
    let a = sortedParsedCrates[i].filter(a => Object.keys(a)[0] === move[1])
    if (a.length){
      let tempArr = []
        tempArr.push(a[0])
        let shiftingObj = a.splice(0, parseInt(move[0]))
        let correctedArr = []
        for (let j=0; j < shiftingObj.length; j++){
          let correctedShiftingObj = {}
          correctedShiftingObj[move[2]] = Object.values(shiftingObj[j])[0]
          correctedArr.push(correctedShiftingObj)
        }
        let placingRowIndex = move[2] - 1
        sortedParsedCrates[move[1] - 1].splice(0, shiftingObj.length)
        correctedArr.reverse().forEach((arr) => {
          sortedParsedCrates[placingRowIndex].splice(0, 0, arr)
        })
    }
  }
})

let ans = ''
sortedParsedCrates.forEach((row) => {
  let shift = Object.values(row.shift())[0]
  ans += shift
})
console.log(ans)