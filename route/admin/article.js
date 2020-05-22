// 将文章集合的构造函数导入
const { Article } = require('../../model/article')
// 导入 mongoose-sex-page 模块
const pagination = require('mongoose-sex-page')

module.exports = async (req, res) => {
    // 接收客户端传递的页码
    const page = req.query.page

    // 标识 标识当前访问的是文章管理界面
    req.app.locals.currentLink = 'article'
    // page 指定当前页
    // size 指定每页显示的数据条数
    // display 指定客户端要显示的页码数量
    // 查询所有文章数据
    let articles = await pagination(Article)
        .find()
        .page(page)
        .size(2)
        .display(3)
        .populate('author')
        .exec()

    // res.send(articles)
    // 渲染文章列表界面
    res.render('admin/article', {
        articles: articles
    })
}
