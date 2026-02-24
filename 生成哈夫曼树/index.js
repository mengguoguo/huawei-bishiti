const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
rl.on('line', (line) => {
    const values = line.split(' ').map(Number)
    const root = buildHuffmanTree(values)
    const result = []
    inorderTraversal(root, result)
    console.log(result.join(' '))
    rl.close()
})

class Node{
    constructor(value) {
        this.value = value
        this.left = null
        this.right = null
    }
}
class MinPriorityQueue {
    constructor() {
        this.elements = []
    }
    enqueue(element) {
        this.elements.push(element)
        this.elements.sort((a, b) => a.value - b.value)
    }
    dequeue() {
        return this.elements.shift()
    }
    isEmpty() {
        return this.elements.length === 0
    }
}
function buildHuffmanTree(values) {
    const pq = new MinPriorityQueue()
    values.forEach(value => pq.enqueue(new Node(value)))

    while(pq.elements.length > 1) {
        const left = pq.dequeue()
        const right = pq.dequeue()
        const parent = new Node(left.value + right.value)
        parent.left = left
        parent.right = right
        pq.enqueue(parent)
    }

    return pq.dequeue()
}

function inorderTraversal(node, result) {
    if(node) {
        inorderTraversal(node.left, result)
        result.push(node.value)
        inorderTraversal(node.right, result)
    }
}