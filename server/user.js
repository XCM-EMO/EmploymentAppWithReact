const express = require('express')
// 用来加密
const utils = require('utility')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
// 不需要输出的字段
const _filter = {'pwd': 0, '__v': 0}

// 获取用户列表
Router.get('/list', function(req, res) {
    // 清空所有数据
    // User.remove({}, function(){})
    // 查询列表
    User.find({}, function(err, doc) {
        return res.json(doc)
    })
})

// 登录
Router.post('/login', function(req, res) {
    const { user, pwd } = req.body;
    // findOne 第二个参数控制指定字段不返回
    User.findOne({user, pwd: md5Pwd(pwd)}, _filter, function(err, doc) {
        if(!doc) {
            return res.json({code: 1, msg: '用户名或密码错误'})
        }
        res.cookie('userid', doc._id)
        return res.json({code: 0, data: doc})
    })
})

// 注册
Router.post('/register', function(req, res) {
    const { user, pwd, type } = req.body;
    // 查询数据库
    User.findOne({user: user}, function(err, doc) {
        if(doc) {
            return res.json({code: 1, msg: '用户名重复'})
        }
        // 创建一个数据模型
        const userModel = new User({ user, type, pwd: md5Pwd(pwd)}) 
        // 写入数据库
        userModel.save(function(err, doc) {
            if(err) {
                return res.json({code: 1, msg: '后端出错了'})
            }
            const { user, type, _id } = doc;
            // 存入 cookie
            res.cookie('userid', _id)
            return res.json({code: 0, data: { user, type, _id }})
        })
        // User.create({user, type, pwd: md5Pwd(pwd)}, function(err, doc) {
        //     if(err) {
        //         return res.json({code: 1, msg: '后端出错了'})
        //     }
        //     return res.json({code: 0})
        // })
    })
})

// 获取用户信息
Router.get('/info', function(req, res) {
    // 读取cookie
    const { userid } = req.cookies
    if(!userid) {
        return res.json({code: 1})
    }
    User.findOne({_id: userid}, _filter, function(err, doc) {
        if(err) {
            return res.json({code: 1, msg: '后端出错了'})
        }
        if(doc) {
            return res.json({code: 0, data: doc})
        } 
    })
})

// 加盐
function md5Pwd(pwd) {
    const salt = 'imooc_is_good';
    return utils.md5(utils.md5(pwd + salt));
}

module.exports = Router;