const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})
const arr = []
rl.on('line', (line) => {
  arr.push(line)
  if (arr.length == 2) {
    const num = arr[0]
    const timeArr = arr[1].split(' ').map(Number)

    console.log(main(timeArr, num))
  }
})

function main(arr, minAverageLost) {
  const len = arr.length
  const ans = []
  for (let i = 0; i < len; i++) {
    let sum = 0
    let start = i,
      j = i
    for (j = i; j < len && (j - i + 1) * minAverageLost >= sum + arr[j]; j++) {
      sum += arr[j]
    }

    if (j > i) {
      ans.push(`${start}-${j - 1}`)
    }
    i = j
  }
  return ans.join(' ')
}
