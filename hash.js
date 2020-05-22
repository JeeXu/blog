// 导入 bcrypt  hash 加密
const bcrypt = require('bcryptjs')

async function run() {
    // 生成随机字符串
    // genSalt 方法接受一个数值作为参数
    // 数值越大 生成的随机字符串复杂度越高  反之越低 默认10
    // 返回生成的随机字符串
    const salt = await bcrypt.genSalt(10)
    // 对密码进行加密
    // 1. 要进行加密的明文
    // 2. 随机字符串
    const result = await bcrypt.hash('123456', salt)
    console.log(salt)
    console.log(result)
}
run()
