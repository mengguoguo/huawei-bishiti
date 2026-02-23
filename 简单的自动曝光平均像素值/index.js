const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.on('line', (line) => {
    const img = line.split(' ').map(Number)
    const len = img.length

    let min_diff = Number.MAX_SAFE_INTEGER
    let k_ans = 0

    for(let k = -127; k <= 128; k++) {

        let sum = 0
        for(let i = 0; i < len; i++) {
            const curr = img[i] + k
            sum += Math.min(Math.max(0, curr), 255)
        }
        const diff = Math.abs(sum / len  - 128)
        if(diff < min_diff) {
            min_diff = diff
            k_ans = k
        } else if(diff == min_diff && k_ans !== 0) {
            k_ans = Math.min(k_ans, k)
        }
    }
    console.log(k_ans)

})