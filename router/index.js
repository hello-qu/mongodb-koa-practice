const Koa = require('koa');
const fs = require('fs');
const app = new Koa();
const path = require('path');

// 静态资源中间件
const static  = require('koa-static');  
const Router = require('koa-router');
const controller = require('../controller')
let port = new Router();

const staticPath = '../example';

//访问资源目录下静态资源
app.use(static(path.join(__dirname,staticPath)));

//查询接口
port.get('/getInfo',controller.getInfo)

//删除接口
port.post('/delete',controller.deleteInfo)

let router = new Router()
router.use('/home', port.routes(), port.allowedMethods())
app.use(router.routes()).use(router.allowedMethods())

app.listen(3111, (ctx) => {
  console.log("启用3111端口成功")
})
