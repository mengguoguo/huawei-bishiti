const readline = require('readline')

readline.createInterface({
    input: process.stdin,
    output: process.stdout
}).on('line', (line) => {
    
    const whisperTimes = line.split(' ').map(Number)

    let maxTime = 0
    const nodeQueue = []
    nodeQueue.push(0)
// 层序遍历将每个节点的值更新为 当前值加上父节点的接收到悄悄话的时间
    while(nodeQueue.length > 0) {
        const parentNodeIndex = nodeQueue.shift()

        const leftChildIndex = 2 * parentNodeIndex + 1
        const rightChildIndex = 2 * parentNodeIndex + 2

        if(leftChildIndex < whisperTimes.length && whisperTimes[leftChildIndex] !== -1) {
            whisperTimes[leftChildIndex] += whisperTimes[parentNodeIndex]
            nodeQueue.push(leftChildIndex)
            maxTime = Math.max(maxTime, whisperTimes[leftChildIndex])
        }
        
        if(rightChildIndex < whisperTimes.length && whisperTimes[rightChildIndex] !== -1) {
            whisperTimes[rightChildIndex] += whisperTimes[parentNodeIndex]
            nodeQueue.push(rightChildIndex)
            maxTime = Math.max(maxTime, whisperTimes[rightChildIndex])
        }
    }
    console.log(maxTime)
})