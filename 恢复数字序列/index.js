const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.on('line', (line) => {
  const s = line.split(' ')[0]
  const k = parseInt(line.split(' ')[1])

  const base = new Map()
  for (const c of s) {
    base.set(c, (base.get(c) || 0) + 1)
  }

  let i = 0
  while (i < 1000 - k + 1) {
    let count = new Map()
    for (let j = i; j < i + k; j++) {
      const num = String(j)
      for (const c of num) {
        count.set(c, (count.get(c) || 0) + 1)
      }
    }
    let isMatch = true
    for (const c of base.keys()) {
      if (!count.has(c) || count.get(c) !== base.get(c)) {
        isMatch = false
        break
      }
    }
    if (isMatch) {
      console.log(i)
      return
    }
    i++
  }
})
