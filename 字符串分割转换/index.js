const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})
const data = []
rl.on('line', (line) => {
  data.push(line)
}).on('close', () => {
  const k = parseInt(data[0])
  const arr = data[1].split('-')

  let newStr = arr.slice(1).join('')
  //   let i = 0
  let result = arr[0]
  for (let i = 0; i < newStr.length; i = i + k) {
    let substr = newStr.substring(i, i + k)
    let bigCount = 0,
      litterCount = 0
    for (let j = 0; j < substr.length; j++) {
      const c = substr[j]
      if (c >= 'a' && c <= 'z') litterCount++
      if (c >= 'A' && c <= 'Z') bigCount++
    }
    // console.log(bigCount, litterCount, substr)
    if (litterCount > bigCount) result += '-' + substr.toLowerCase()
    else if (bigCount > litterCount) result += '-' + substr.toUpperCase()
    else result += '-' + substr
  }
  console.log(result)
  rl.close()
})
