const {readFileSync, promises: fsPromises} = require('fs');
//Parsing source: https://bobbyhadz.com/blog/javascript-read-file-into-array

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);
  //console.log(arr); // 👉️ ['One', 'Two', 'Three', 'Four']

  let totalsArray = []
  let temp = 0
  arr.forEach((item) => {
    if (item !== ''){
      temp += parseInt(item)
    }
    if (item === ''){
      totalsArray.push(temp)
      temp = 0
    }
  })

  //Answer 1
  console.log(`Part 1: ${Math.max(...totalsArray)}`)

  const sort = totalsArray.sort(function (a, b){return a - b}).reverse()
  const total = sort[0] + sort[1] + sort[2]
  //Answer 2
  console.log(`Part 2: ${total}`)
}

syncReadFile('./1a.txt');