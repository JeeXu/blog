// 引入用户集合的构造函数
const { User } = require('../../model/user')
// 导入 bcrypt  hash 加密
const bcrypt = require('bcryptjs')

module.exports = async (req, res, next) => {
    // 接收客户端传递过来的请求参数
    const { username, email, password, role, state } = req.body
    // 即将要修改的用户的 id
    const id = req.query.id

    let user = await User.findOne({ _id: id })

    // 密码比对
    const isValid = await bcrypt.compare(password, user.password)
    if (isValid) {
        // 密码比对成功
        // 将用户信息更新到数据库
        await User.updateOne(
            { _id: id },
            {
                username: username,
                email: email,
                role: role,
                state: state
            }
        )

        // 将界面重定向到用户列表界面
        res.redirect('/admin/user')
    } else {
        // 密码比对失败
        let obj = JSON.stringify({
            path: '/admin/user-edit',
            message: '密码比对失败，不能进行用户信息的修改',
            id: id
        })
        next(obj)
    }
}
