import axios from 'axios';
import { getRedirectPath } from '../util';

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
// 数据加载
const LOAD_DATA = 'LOAD_DATA';

const initState = {
    redirectTo: '', // 去到哪一页
    isAuth: false, // 是否登录
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
        case LOGIN_SUCCESS:
            return { ...state, msg: '', redirectTo: getRedirectPath(action.payload), isAuth: true, ...action.payload }
        case REGISTER_SUCCESS:
            return { ...state, msg: '', redirectTo: getRedirectPath(action.payload), isAuth: true, ...action.payload }
        case ERROR_MSG:
            return { ...state, isAuth: false, msg: action.msg }
        default:
            return state
    }
}

function errorMsg(msg) {
    return { msg, type: ERROR_MSG }
}
function loginSuccess(data) {
    return { type: LOGIN_SUCCESS, payload: data }
}
function registerSuccess(data) {
    return { type: REGISTER_SUCCESS, payload: data }
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
                    dispatch(loginSuccess(res.data.data))
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
                        dispatch(registerSuccess({ user, pwd, type }))
                    } else {
                        dispatch(errorMsg(res.data.msg))
                    }
                }
            )
        }
    }
}