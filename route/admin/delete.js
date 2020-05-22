// 引入用户集合的构造函数
const { User } = require('../../model/user')

module.exports = async (req, res) => {
    // 获取要删除的用户 id
    await User.findOneAndDelete({ _id: req.query.id })
    // 执行成功 重定向到用户列表界面
    res.redirect('/admin/user')
}
