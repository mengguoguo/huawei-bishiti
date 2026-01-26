const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.on('line', (line) => {
  const arr = line.split(' ')
  const res1 = [],
    res2 = []
  let flag = true
  arr.forEach((item, index) => {
    const [a, b] = item.split('/')
    const currArr = flag ? res1 : res2
    if (index == 0) {
      currArr.push(a)
    } else {
      if (b == 'Y') {
        currArr.push(a)
      } else {
        flag = !flag
        const currArr1 = flag ? res1 : res2
        currArr1.push(a)
      }
    }
  })
  console.log(res1.join(' '))
  console.log(res2.join(' '))
})
