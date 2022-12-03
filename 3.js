const {readFileSync, promises: fsPromises} = require('fs');
//Parsing source: https://bobbyhadz.com/blog/javascript-read-file-into-array

//Source for alphabet: https://javascript.plainenglish.io/create-an-array-of-alphabet-characters-in-javascript-with-this-simple-trick-930033079dd3

const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const lowercase = alpha.map((x) => `${x - 64} ${String.fromCharCode(x).toLowerCase()}`)
const uppercase = alpha.map((x) => `${x - 38} ${String.fromCharCode(x)}`);
const lowercaseParsed=[]
const uppercaseParsed = []
let total = []
lowercase.forEach((pair) => {
  lowercaseParsed.push(pair.split(/\r?\n/)[0].split(' '));
})
uppercase.forEach((pair) => {
  uppercaseParsed.push(pair.split(/\r?\n/)[0].split(' '));
})
const parsedArray = lowercaseParsed.concat(uppercaseParsed)

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);
  
  //Part 2 Loop Logic
  const threeArray = []
  //console.log(arr); // 👉️ ['One', 'Two', 'Three', 'Four']
  let count = 0
  let tempArr = []
  for (let i = 0; i < arr.length; i++){
    count += 1
    if (count % 3 !== 0){
      tempArr.push(arr[i])
    } else {
      tempArr.push(arr[i])
      threeArray.push(tempArr);
      tempArr=[]
    }
  }

  threeArray.forEach((threeStringsArray) => {
    threeStringsArray.forEach((item) => {
      item.split('').every((letter) => {
        if (item === threeStringsArray[0] && threeStringsArray[1].split('').includes(letter) && threeStringsArray[2].split('').includes(letter)){
          total.push(letter)
          return false
        }
        return true
      })

    })
  })

  //Part 1 Loop logic
  // arr.forEach((item) => {
  //   let comp1 = item.slice(0, (item.length / 2) ).split('')
  //   let comp2 = item.slice((item.length / 2), item.length).split('')

  //   console.log(comp1.concat(comp2).join(''))
    
  //   comp1.every((letter1) => {
  //     if (comp2.includes(letter1)){
  //       total.push(letter1)
  //       return false
  //     }
  //     return true
  //   })
  // })
}



syncReadFile('./3.txt');

let addedTotal = 0
total.forEach((letter) => {
  parsedArray.forEach((array) => {
    if (letter === array[1]){
      addedTotal += parseInt(array[0])
    }
  })
})

console.log(addedTotal)