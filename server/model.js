// 用来连接 node 和 MongoDB
const mongoose = require('mongoose');
// 链接 mongo 并且使用 imooc-chat 这个集合(相当于是一份文档)
const documentName = 'imooc-chat';
const DB_URL = 'mongodb://localhost:27017/' + documentName;
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function() {
    console.log('mongo connect success');
})

// 定义模型
const models = {
    // 用户信息
    user: {
        'user': {type: String, 'require': true},
        'pwd': {type: String, 'require': true},
        // 用户类型：牛人/boss
        'type': {type: String, 'require': true},
        // 头像
        'avatar': {type: String},
        // 个人简介/职位简介
        'desc': {type: String},
        // 职位名
        'title': {type: String},
        // 如果是boss，还有两个字段
        'company': {type: String},
        'money': {type: String}
    },
    // 聊天信息
    chat: {}
}

// 创建表（ user表,chat表 ）
for(let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
    getModel: function(name) { // 读取数据
        return mongoose.model(name)
    }
}