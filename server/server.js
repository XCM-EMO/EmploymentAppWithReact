const express = require('express')
const userRouter = require('./user')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express();
const port = 9000;

app.use(cookieParser())
app.use(bodyParser.json())
// 与 user 相关的，进入子路由
app.use('/user', userRouter)

app.listen(port, function() {
    console.log('Node app start at port ' + port);
})