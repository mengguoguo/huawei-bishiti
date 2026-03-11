
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
const data = []
let count = -1
rl.on('line', (line) => {
    if(count > 0) {
        data.push(line.split(' '))
        if(data.length === 2 * count) rl.close()
    } else {
        count = parseInt(line)
    }
}).on('close', () => {
    const queue = []
    let in_order = true
    let result = 0
    for(let i = 0; i < data.length;i++) {
        const operation = data[i]
        if(operation[0] === 'head') {
            if(queue.length !== 0 && in_order) {
                in_order = false
            }
            queue.unshift(parseInt(operation[2]))
        } else if(operation[0] === 'tail') {
            queue.push(parseInt(operation[2]))
        } else {
            if(!in_order) {
                result++
                in_order = true
            }
            queue.pop()
        }
    }
    console.log(result)
})