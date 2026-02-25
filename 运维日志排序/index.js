const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})
const data = []
rl.on('line', (line) => {
  data.push(line)
}).on('close', () => {
  console.log(sortLog(data.slice(1)))
  rl.close()
})
function timeToNum(time) {
  const match = time.match(/(\d+):(\d+):(\d+).(\d+)/)
  //   console.log(match)
  return parseInt(match[1]) * 3600000 + parseInt(match[2]) * 60000 + parseInt(match[3]) * 1000 + parseInt(match[4])
  //   const [hms, ms] = time.split('.')
  //   const h = Number(hms.split(':')[0]) * 60 * 60 * 1000
  //   const m = Number(hms.split(':')[1]) * 60 * 1000
  //   const s = Number(hms.split(':')[2]) * 1000

  //   console.log(h + m + s + Number(ms))
  //   return h + m + s + Number(ms)
}
function sortLog(timeStrArr) {
  return timeStrArr.sort((a, b) => {
    return timeToNum(a) - timeToNum(b)
  })
}
