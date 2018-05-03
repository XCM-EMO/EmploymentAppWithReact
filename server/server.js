const express = require('express')
const userRouter = require('./user')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const port = 9000;
const app = express();
// socket work with express
const server = require('http').Server(app)
const io = require('socket.io')(server)

const model = require('./model')
const Chat = model.getModel('chat')

io.on('connection', function(socket) {
    // console.log('user login');
    // 接收数据
    socket.on('sendmsg', function(data) {
        console.log(data);
        const { from, to, msg } = data;
        const chatid = [from, to].sort().join('_')
        // 存储数据
        Chat.create({chatid, from, to, content: msg}, function(err, doc) {
            // 广播，告诉大家接收信息了
            io.emit('recvmsg', Object.assign({}, doc._doc))
        });
    })
})

app.use(cookieParser())
app.use(bodyParser.json())
// 与 user 相关的，进入子路由
app.use('/user', userRouter)

server.listen(port, function() {
    console.log('Node app start at port ' + port);
})