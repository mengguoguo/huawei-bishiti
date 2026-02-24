const { read } = require('fs')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const data = []
rl.on('line', (line) => {
  data.push(line)
}).on('close', () => {
  const memberCount = +data[0]
  const numsByDay = data[1].split(' ').map(Number)

  const dayIds = []
  data.forEach((value, index) => {
    if (index > 1) {
      dayIds.push(value.split(' '))
    }
  })
  console.log(getTopEmployeeIds(dayIds))
  rl.close()
})

function getTopEmployeeIds(dayIds) {
  const emplyees = {}

  for (let i = 0; i < dayIds.length; i++) {
    const ids = dayIds[i]

    for (let id of ids) {
      if (id in emplyees) {
        emplyees[id].count++
      } else {
        emplyees[id] = {
          id,
          count: 1,
          firstDay: i,
        }
      }
    }
  }

  const arr = Object.values(emplyees).sort((a, b) => {
    if (a.count != b.count) {
      return b.count - a.count
    } else if (a.firstDay != b.firstDay) {
      return a.firstDay - b.firstDay
    } else {
      return a.id - b.id
    }
  })
  return arr
    .slice(0, 5)
    .map((item) => item.id)
    .join(' ')
}
