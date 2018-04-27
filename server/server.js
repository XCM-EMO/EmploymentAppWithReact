// 用来连接 node 和 MongoDB
const mongoose = require('mongoose');
// 链接 mongo 并且使用 imooc 这个集合
const DB_URL = 'mongodb://localhost:27017/imooc'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function() {
    console.log('mongo connect success');
})
// 创建类似于 mysql 的表，mongo 里有文档、字段的概念
const User = mongoose.model('user', new mongoose.Schema({
    name: {type: String, require: true},
    age: {type: Number, require: true}
})) // 创建一个 user 文档（即 user 表）
// 新增一条数据 （create 方法）
User.create({
    name: 'xiaohuang',
    age: 29
}, function(err, doc) {
    if(!err) {
        console.log(doc);
    } else {
        console.log(err);
    }
})

// 删除数据 
// User.remove({name: 'xiaoming'}, function(err, doc) {
//     if(!err) {
//         console.log(doc);
//     } else {
//         console.log(err);
//     }
// })

// 修改数据
// User.update({name: 'xiaohuang'}, {'$set': {age: 30}}, function(err, doc) {
//     if(!err) {
//         console.log(doc);
//     } else {
//         console.log(err);
//     }
// })


const express = require('express');
const app = express();

app.get('/', function(req, res) {
    res.send('<h1>Hello World</h1>')
})
app.get('/data', function(req, res) {
    // 查询数据
    // User.find({}, function(err, doc) {
    //     res.json(doc)
    // })

    // User.find({name: 'xiaohuang'}, function(err, doc) {
    //     res.json(doc)
    // })

    User.findOne({name: 'xiaohuang'}, function(err, doc) {
        res.json(doc)
    })
})
app.listen(9000, function() {
    console.log('Node app start at port 9000');
})