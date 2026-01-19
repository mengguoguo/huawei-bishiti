const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})
const lines = []
rl.on('line', (line) => {
  lines.push(line)

  if (lines.length == 2) {
    const arr = JSON.parse(lines[0])
    const num = lines[1]

    console.log(getResult(arr, num))
    lines.length = 0
  }
})

function getResult(arr, num) {
  const link1 = [],
    link2 = []

  arr
    .sort((a, b) => a - b)
    .forEach((item, index) => {
      if (item < 4) {
        link1.push(item)
      } else {
        link2.push(item)
      }
    })

  const ans = []
  const len1 = link1.length
  const len2 = link2.length

  switch (num) {
    case '1':
      if (len1 == 1 || len2 == 1) {
        if (len1 == 1) dfs(link1, 0, 1, [], ans)
        if (len2 == 1) dfs(link2, 0, 1, [], ans)
      } else if (len1 == 3 || len2 == 3) {
        if (len1 == 3) dfs(link1, 0, 1, [], ans)
        if (len2 == 3) dfs(link2, 0, 1, [], ans)
      } else if (len1 == 2 || len2 == 2) {
        if (len1 == 2) dfs(link1, 0, 2, [], ans)
        if (len2 == 2) dfs(link2, 0, 2, [], ans)
      } else if (len1 == 4 || len2 == 4) {
        if (len1 == 4) dfs(link1, 0, 2, [], ans)
        if (len2 == 4) dfs(link2, 0, 2, [], ans)
      }
      break
    case '2':
      if (len1 == 2 || len2 == 2) {
        if (len1 == 2) dfs(link1, 0, 2, [], ans)
        if (len2 == 2) dfs(link2, 0, 2, [], ans)
      } else if (len1 == 4 || len2 == 4) {
        if (len1 == 4) dfs(link1, 0, 2, [], ans)
        if (len2 == 4) dfs(link2, 0, 2, [], ans)
      } else if (len1 == 3 || len2 == 3) {
        if (len1 == 3) dfs(link1, 0, 2, [], ans)
        if (len2 == 3) dfs(link2, 0, 2, [], ans)
      }
      break
    case '4':
      if (len1 == 4 || len2 == 4) {
        if (len1 == 4) ans.push(link1)
        if (len2 == 4) ans.push(link2)
      }
      break
    case '8':
      if (len1 == 4 && len2 == 4) {
        ans.push([...link1, ...link2])
      }
      break
  }
  return JSON.stringify(ans).split(',').join(', ')
}

/**
 * 深度优先搜索, path的长度达到level时, 加入结果
 * @param {*} arr 数组
 * @param {*} index 开始索引
 * @param {*} level 搜索深度
 * @param {*} path 路径
 * @param {*} res 结果
 * @returns
 */
function dfs(arr, index, level, path, res) {
  if (path.length == level) {
    return res.push(path.slice())
  }
  for (let i = index; i < arr.length; i++) {
    path.push(arr[i])
    dfs(arr, i + 1, level, path, res)
    path.pop()
  }
}
