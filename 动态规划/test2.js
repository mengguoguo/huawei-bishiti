// 描述
// 王强决定把年终奖用于购物，他把想买的物品分为两类：主件与附件。
// 主件可以没有附件，至多有 
// 2 个附件。附件不再有从属于自己的附件。
// ∙若要购买某附件，必须先购买该附件所属的主件，且每件物品只能购买一次。
// 王强查到了 
// m 件物品的价格，而他只有 
// n 元的预算。为了先购买重要的物品，他给每件物品规定了一个重要度，用整数 
// 1∼5 表示。他希望在不超过预算的前提下，使满意度最大。

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const arr = [];
rl.on('line', (line) => {
    arr.push(line);
}).on('close', () => {
    const [n, m] = arr[0].split(' ').map(Number);
    const items = arr.slice(1).map(line => line.split(' ').map(Number));

    console.log(maxSatisfaction(n, items));
});

// 定义 dp[j] 表示预算为 j 时能获得的最大满意度，初始化为 0；
function maxSatisfaction(n, items) {
    const m = items.length;
    const masters = Array(m+1).fill(null).map(() => ({
        price: 0,
        value: 0,
        attachments: []
    }))

    for(let i = 0; i < m; i++) {
        const [v, w, q] = items[i];
        const idx = i + 1
        if(q === 0){
            masters[idx].price = v;
            masters[idx].value = v * w;
        } else {
            masters[q].attachments.push({ price: v, value: v * w });
        }
    }

    const groups = []
    for(let i = 1; i <= m; i++) {
        const master = masters[i];
        if(master.price > 0) {
            const plans = [];
            plans.push({ price: master.price, value: master.value });

            const atts = master.attachments;
            if(atts.length >= 1) {
                plans.push({
                    price: master.price + atts[0].price,
                    value: master.value + atts[0].value
                });
            }
            if(atts.length >= 2) {
                plans.push({
                    price: master.price + atts[1].price,
                    value: master.value + atts[1].value
                });
            }
            if(atts.length === 2) {
                plans.push({
                    price: master.price + atts[0].price + atts[1].price,
                    value: master.value + atts[0].value + atts[1].value
                });
            }

            groups.push(plans);
        }
    }

    const dp = new Array(n+1).fill(0);
    for(const group of groups) {
        for(let j = n; j >= 0; j--) {
            for(const plan of group) {
                if(j >= plan.price) {
                    dp[j] = Math.max(dp[j], dp[j - plan.price] + plan.value)
                }
            }
        }
    }

    return dp[n]
}