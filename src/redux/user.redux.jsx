import axios from 'axios';
import { getRedirectPath } from '../util';

const AUTH_SUCCESS = 'AUTH_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
// 数据加载
const LOAD_DATA = 'LOAD_DATA';
const LOGOUT = 'LOGOUT';

const initState = {
    redirectTo: '', // 去到哪一页
    msg: '', // 错误信息
    user: '', // 用户信息
    pwd: '', // 密码
    type: ''
}

// reducer
export function user(state = initState, action) {
    switch (action.type) {
        case LOAD_DATA:
            return { ...state, ...action.payload }
        case LOGOUT: 
            return {...initState, redirectTo: '/login'}
        case AUTH_SUCCESS:
            return { ...state, msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload }
        case ERROR_MSG:
            return { ...state, isAuth: false, msg: action.msg }
        default:
            return state
    }
}

function errorMsg(msg) {
    return { msg, type: ERROR_MSG }
}
function authSuccess(obj) {
    const {pwd, ...data} = obj;
    return { type: AUTH_SUCCESS, payload: data }
}
// 数据加载
export function loadData(userInfo) {
    return { type: LOAD_DATA, payload: userInfo }
}
// action : 登录
export function login({ user, pwd }) {
    if (!user || !pwd) {
        return errorMsg('用户名及密码必须输入')
    }
    return dispatch => {
        axios.post('/user/login', { user, pwd }).then(
            res => {
                if (res.status == 200 && res.data.code == 0) {
                    dispatch(authSuccess(res.data.data))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            }
        )
    }
}
// action : 注册用户
export function register({ user, pwd, repeatpwd, type }) {
    if (!user || !pwd || !type) {
        return errorMsg('用户名及密码必须输入')
    } else if (pwd !== repeatpwd) {
        return errorMsg('两次输入的密码不一致')
    } else {
        return dispatch => {
            axios.post('/user/register', { user, pwd, type }).then(
                res => {
                    if (res.status == 200 && res.data.code == 0) {
                        dispatch(authSuccess({ user, pwd, type }))
                    } else {
                        dispatch(errorMsg(res.data.msg))
                    }
                }
            )
        }
    }
}
// action : 更新保存用户信息
export function update(info) {
    return dispatch => {
        axios.post('/user/update', info).then(res => {
            if (res.status == 200 && res.data.code == 0) {
                dispatch(authSuccess(res.data.data))
            } else {
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}
// action : 注销登录
export function logoutSubmit() {
    return { type: LOGOUT }
}