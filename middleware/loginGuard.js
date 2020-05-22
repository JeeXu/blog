const guard = (req, res, next) => {
    // 判断用户访问的是否是登录界面
    // 判断用户的登陆状态
    // yse 向下执行
    // no 将请求重定向到登录界面
    if (req.url != '/login' && !req.session.username) {
        res.redirect('/admin/login')
    } else {
        // 如果用户是登录状态 并且是一个普通用户
        if (req.session.role == 'normal') {
            // 让他跳转到博客首页 阻止程序向下执行
            return res.redirect('/home/')
        }
        // 用户是登录状态 将请求放行
        next()
    }
}

module.exports = guard
