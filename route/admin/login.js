// 导入用户集合构造函数
const { User } = require('../../model/user')
// 导入 bcrypt  hash 加密
const bcrypt = require('bcryptjs')

module.exports = async (req, res) => {
    // 接收请求参数
    const { email, password } = req.body
    if (email.trim().length == 0 || password.trim().length == 0)
        return res
            .status(400)
            .render('admin/error', { msg: '邮箱地址或密码错误' })

    // 根据邮箱地址查询用户信息
    // 如果查询到了用户 user 变量值是对象类型 对象中存储的是用户信息
    // 如果没有查询到用户 user变量为空
    let user = await User.findOne({ email })
    // 查询到用户
    if (user) {
        // 密码判断
        // true 比对成功   false 对比失败
        let isValid = await bcrypt.compare(password, user.password)
        // 如果密码比对成功
        if (isValid) {
            // 登陆成功
            // 将用户名存储到请求对象中
            req.session.username = user.username
            // 将用户名存储到 session 对象中
            req.session.role = user.role
            // res.send('登录成功 ')
            req.app.locals.userInfo = user
            // 对用户角色进行判断
            if (user.role == 'admin') {
                // 重定向到用户列表界面
                res.redirect('/admin/user')
            } else {
                res.redirect('/home/')
            }
        } else {
            // 密码错误
            res.status(400).render('admin/error', { msg: '邮箱地址或密码错误' })
        }
    } else {
        // 没有查询到用户
        res.status(400).render('admin/error', { msg: '邮箱地址或密码错误' })
    }
}
