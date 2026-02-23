const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})
rl.on('line', (input) => {
  //   console.log(fib(Number(input)))
  //   console.log(climbStairs(Number(input)))
  //   const arr = input.split(' ').map(Number)
  //   console.log(rob(arr))
  //   const arr = input.split(' ').map(Number)
  //   console.log(maxSubArray(arr))

  //   const [m, n] = input.split(' ').map(Number)
  //   console.log(uniquePaths(m, n))

  console.log(
    minPath([
      [1, 2, 3],
      [4, 5, 6],
    ]),
  )
})
// 斐波那契, dp[i] = dp[i-1] + dp[i-2], dp[0] = 0, dp[1] = 1
function fib(n) {
  if (n <= 1) return n
  let dp1 = 0,
    dp2 = 1

  for (let i = 2; i <= n; i++) {
    let dp3 = dp1 + dp2
    dp1 = dp2
    dp2 = dp3
  }
  return dp2
}

// 爬楼梯, 第i阶的可能走法是第i-1的所有可能走法加上第i-2阶的所有可能走法
// dp[i] = dp[i-1] + dp[i-2], dp[1] = 1, dp[2] = 2
function climbStairs(n) {
  if (n <= 2) return n
  let dp1 = 1
  let dp2 = 2

  //   let dp = new Array(n+1)
  for (let i = 3; i <= n; i++) {
    let dp3 = dp1 + dp2
    dp1 = dp2
    dp2 = dp3
    // dp[i] = dp[i-1] + dp[i-2]
  }
  return dp2
}

//打家劫舍
// dp[i] = 前i家能偷的最大金额
// dp[i] = max(dp[i-1], dp[i-2] + nums[i])
function rob(nums) {
  //   let dp1 = nums[0]
  //   let dp2 = Math.max(nums[0], nums[1])

  let dp = new Array(nums.length)
  dp[0] = nums[0]
  dp[1] = Math.max(nums[0], nums[1])
  for (i = 2; i < nums.length; i++) {
    // let dp3 = Math.max(dp2, dp1 + nums[i])
    // dp1 = dp2
    // dp2 = dp3
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i])
  }
  return dp[nums.length - 1]
}

// 最大子数组和
// dp[i] = 以i结尾的最大子数组和
// dp[i] = max(dp[i-1] + nums[i], nums[i])
function maxSubArray(nums) {
  const dp = new Array(nums.length)
  dp[0] = nums[0]
  let max = dp[0]
  for (let i = 1; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 1] + nums[i], nums[i])
    max = Math.max(max, dp[i])
  }
  return max
}
// 5. 不同路径
// 题目：m×n 网格，从左上角到右下角，只能向右 / 向下走，求总路径数。
// 考点：二维 DP 基础，边界条件 + 状态转移。
// dp[i][j] = 走到第i行第j列的所有路径
// dp[i][j] = dp[i-1][j] + dp[i][j-1]
// dp[0][j] = 1;  dp[i][0] = 1
function uniquePaths(m, n) {
  const dp = new Array(m).fill(0).map(() => new Array(n))

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i == 0 || j == 0) {
        dp[i][j] = 1
        continue
      }
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
    }
  }
  return dp[m - 1][n - 1]
}

// 6. 最小路径和
// 题目：m×n 网格，每个格子有数字，从左上到右下，求路径数字和最小值。
// 考点：二维 DP 求最优解，在不同路径基础上升级。
// dp[i][j] 表示走到当前位置的路径和最小值
// dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + grid[i][j]

function minPath(grid) {
  const m = grid.length
  const n = grid[0].length
  const dp = new Array(m).fill(0).map(() => new Array(n))
  dp[0][0] = grid[0][0]
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i == 0) {
        if (j == 0) continue
        dp[i][j] = dp[i][j - 1] + grid[i][j]
      } else if (j == 0) {
        dp[i][j] = dp[i - 1][j] + grid[i][j]
      } else {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j]
      }
    }
  }
  return dp[m - 1][n - 1]
}

// 7. 最长回文子串
// 题目：给定字符串，找到其中最长的回文子串。
// 考点：二维 DP 判断回文，区间 DP 入门。
// dp[i][j] 表示是s[i...j]是否为回文子串

function longestSubstr(s) {
  const n = s.length
  if (n <= 1) return s

  const dp = Array.from({ legnth: n }, () => new Array(n).fill(false))
  let maxLen = 1
  let start = 0
  for (let i = 0; i < s.length; i++) {
    dp[i][i] = true
  }
}
