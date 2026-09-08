const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.on('line', (line) => {
    const arr = line.split(';');
    let start = [0, 0];
    arr.forEach(item => {
        const n = Number(item.substring(1));
        if (item.length > 0 && item.length < 4 && directionLegal(item.charAt(0)) && !isNaN(n)) {
            if(n < 0 || n >= 100) return
            start = move(start, item.charAt(0), n);
        }
    });
    console.log(start.join(','));
});
function directionLegal(dir) {
    return dir === 'A' || dir === 'D' || dir === 'S' || dir === 'W';
}
function move(curr, dir, steps) {
    if(dir === 'A') return [curr[0] - steps, curr[1]];
    else if(dir === 'D') return [curr[0] + steps, curr[1]];
    else if(dir === 'S') return [curr[0], curr[1] - steps];
    else if(dir === 'W') return [curr[0], curr[1] + steps];
    else return curr;
}

