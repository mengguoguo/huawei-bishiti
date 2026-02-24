const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
const data = []
rl.on('line', (line) => {
    data.push(line)
}).on('close', () => {
    const [a,b,c] = data[0].split(' ').map(Number)

    const count = Number(data[1])
    data.forEach((value, index) => {
        if(index > 1 && index <= count+1) {
            console.log(solution(Number(value), a, b, c).join(' '))
        }
    })
})

function solution(price, a, b, c) {
    const result = []
    let res1 = useA(price, a)
    let res2 = useB(res1[1], b)
    result.push([res2[1], res1[0] + res2[0]])


    res1 = useA(price, a)
    res2 = useC(res1[1], c)
    result.push([res2[1], res1[0] + res2[0]])


    res1 = useB(price, b)
    res2 = useA(res1[1], a)
    result.push([res2[1], res1[0] + res2[0]])

    res1 = useB(price, b)
    res2 = useC(res1[1], c)
    result.push([res2[1], res1[0] + res2[0]])
// 按价格升序排序，如果价格相同，按照使用的优惠券数升序排序
    result.sort((a, b) => a[0] == b[0] ? a[1] - b[1] : a[0] - b[0])
    return [Math.floor(result[0][0]), result[0][1]]
}
function useA(price, a) {
    const n = Math.floor(price / 100)
    const used = Math.min(a, n)
    return [used, price - used * 10]
}
function useB(price, b) {
    if(b > 0) {
        return [1, price * 0.92]
    } else {
        return [0, price]
    }
}
function useC(price, c) {
    const rest = price - c * 5
    if(rest < 0) {
        return [Math.floor(price / 5), price % 5]
    } else {
        return [c, rest]
    }
}