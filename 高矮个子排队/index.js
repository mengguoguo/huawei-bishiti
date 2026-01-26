const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.on('line', (line) => {
  if (!/^[0-9\s]+$/.test(line)) {
    console.log('[]')
    rl.close()
    return
  }
  const heights = line.split(' ').map(Number)
  let i = 0,
    j = 1
  while (j < heights.length) {
    // 这里的判断很关键，在不等的时候看位置是基数还是偶数，偶数位置要比基数高，偶数位的时候如果height[i] < height[j]，则交换, 基数位的时候如果height[i] > height[j]，则交换
    if (heights[i] != heights[j] && heights[i] > heights[j] !== (i % 2 == 0)) {
      ;[heights[i], heights[j]] = [heights[j], heights[i]]
    }
    i++
    j++
  }
  console.log(heights.join(' '))
})
