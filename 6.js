const {readFileSync, promises: fsPromises} = require('fs');
//Parsing source: https://bobbyhadz.com/blog/javascript-read-file-into-array

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  //const arr = contents.split(/\r?\n/);
  return contents
}

let initialStr = syncReadFile('./6.txt');
let window = []

//source: https://stackoverflow.com/a/70782513/10261408
const hasDuplicates = (arr) => arr.length !== new Set(arr).size;

//Part 1
// for (let i=0; i < initialStr.length - 3; i++){
//   window = initialStr.split('').slice(i - 4, i)
//   if (hasDuplicates(initialStr.split('').slice(0, i)) && i > 4 && !hasDuplicates(window)){
//     console.log(i)
//     return
//   }

// }

//Part 2
for (let i=0; i < initialStr.length; i++){
    window = initialStr.split('').slice(i - 14, i)
    if (hasDuplicates(initialStr.split('').slice(0, i)) && i > 14 && !hasDuplicates(window)){
      console.log(i)
      return
    }
  }


