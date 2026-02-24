const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
const lines = []
rl.on('line', (line) => {
    lines.push(line)
}).on('close', () => {
    const num = Number(lines[0])
    let sys = new System()
    lines.forEach((value, index) => {
        if(index > 0 && index <= num) {
            const app = new App(...value.split(' '))
            console.log(app.start, app.end)
            sys.register(app)
        }
    })
    const t = timeStrToNum(lines.pop())
    let existApp = sys.apps.find(a => t >= a.start && t < a.end)
    console.log(existApp ? existApp.name : 'NA')
})
function timeStrToNum (time) {
    const arr = time.split(':')
    return Number(arr[0]) + Number(arr[1]) / 60
}
class App{
    constructor(name, priority, startTime, endTime) {
        this.name = name
        this.priority = priority
        this.startTime = startTime
        this.endTime = endTime
    }
    get start() {
        return timeStrToNum(this.startTime)
    }
    get end() {
        return timeStrToNum(this.endTime)
    }
}
class System {
    constructor() {
        this.apps = []
    }
    register(app) {
        let existAppIndex = this.apps.findIndex(a => app.start >= a.start && app.start < a.end || app.endTime >= a.start && app.end < a.end)
        const existApp = this.apps[existAppIndex]
        if(existAppIndex > -1 && existApp.priority < app.priority) {
            this.apps.splice(existAppIndex, 1)
            this.apps.push(app)
        } else {
            this.apps.push(app)
        }
    }
}
