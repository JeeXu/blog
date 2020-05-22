// 引用 express 框架
const express = require('express')
// 处理路径
const path = require('path')
// 引入 body-parser 模块  用来处理post请求参数
// 下载 npm i body-parser -S
const bodyParser = require('body-parser')
// npm install express-session -S
//导入express-session 中间件插件
const session = require('express-session')
// 导入 art-template 模板引擎
const template = require('art-template')
// 导入 dateformat 日期格式化模块
const dateFormat = require('dateformat')
// 导入 morgan
const morgan = require('morgan')
// 导入 config模块（用于不同环境）
const config = require('config')

// 创建网站服务器
const app = express()
const port = 80
// 处理 post 请求参数
app.use(bodyParser.urlencoded({ extended: false }))

// 启用 session 中间件
app.use(
    session({
        secret: 'secret key: Jee', // 相当于是一个加密密钥，值可以是任意字符串
        resave: false, // 强制session保存到session store中
        saveUninitialized: false, // 强制没有“初始化”的session保存到storage中
        cookie: {
            maxAge: 24 * 60 * 60 * 1000
        }
    })
)

// 数据库连接
require('./model/connect')

// 告诉 express 框架模板所在的位置
app.set('views', path.join(__dirname, 'views'))
// 告诉 express 模板框架模板的默认后缀是什么
app.set('view engine', 'art')
// 当渲染后缀为 art 的模板时 所使用的模板引擎是什么
app.engine('art', require('express-art-template'))
// 向模板内部导入 dateformat 变量
template.defaults.imports.dateFormat = dateFormat

// 开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')))

console.log(config.get('title'))
// 获取环境变量 返回值是对象
if (process.env.NODE_ENV == 'development') {
    // 当前是开发环境
    console.log('当前是开发环境')
    // 在开发环境中 将客户端发送到服务器端的请求信息打印到控制台
    app.use(morgan('dev'))
} else {
    // 当前是生产环境
    console.log('当前是生产环境')
}

// 引入路由模块
const home = require('./route/home')
const admin = require('./route/admin')

// 拦截请求判断用户状态
app.use('/admin', require('./middleware/loginGuard'))

// 为路由匹配请求路径
app.use('/home', home)
app.use('/admin', admin)

// 错误处理
app.use((err, req, res, next) => {
    // 将字符对象转换为对象类型
    // JSON.parse()
    const result = JSON.parse(err)
    let params = []
    for (let attr in result) {
        if (attr != 'path') {
            params.push(attr + '=' + result[attr])
        }
    }
    res.redirect(`${result.path}?${params.join('&')}`)
})

app.get('/', (req, res) => res.send('Hello World!'))
// 监听端口
app.listen(port)
