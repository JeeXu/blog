module.exports = (req, res) => {
    // 删除 session
    req.session.destroy(function (err) {
        if (err) throw err
        res.clearCookie('content.sid')
        // 实现服务器端的跳转，这个对比于 客户端跳转
        res.redirect('/admin/login')
        if (res.app.local) {
            // 清除模板中的用户信息
            res.app.local.userInfo = null
        }
    })
}
