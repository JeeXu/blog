// 引入 @hapi/joi 模块
const Joi = require('@hapi/joi')

// 定义对象的验证规则
const schema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(2)
        .max(5)
        .required()
        .error(new Error('username属性没有通过验证')),
    birth: Joi.number()
        .min(1900)
        .max(2020)
        .error(new Error('birth属性没有通过验证'))
})

async function run() {
    try {
        // 实施验证
        await schema.validateAsync({ username: 'aa', birth: 1080 })
    } catch (e) {
        console.log(e.message)
        return
    }
    console.log('验证通过')
}
run()
