const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const arr = []
rl.on('line', (line) => {
  arr.push(line)
});
rl.on('close', () => {
  arr.forEach(s => {
    console.log(isValidPassword(s) ? 'OK' : 'NG')
  })
});

function isValidPassword(s) {
    if(s.length < 8) return false
    let hasUpper = false, hasLower = false, hasDigit = false, hasSpecial = false;

    for(const ch of s) {
        if(ch >= 'A' && ch <= 'Z') hasUpper = true
        else if(ch >= 'a' && ch <= 'z') hasLower = true
        else if(ch >= '0' && ch <= '9') hasDigit = true
        else hasSpecial = true
    }
    const typeCount = [hasUpper, hasLower, hasDigit, hasSpecial].filter(Boolean).length
    if(typeCount < 3) return false

    for(let i = 0; i < s.length-2; i++){
        const arr1 = s.split(s.substring(i, i+3))
        if(arr1.length > 2) return false
    }
    return true;
}