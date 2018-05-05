import io from 'socket.io-client';
import axios from 'axios';

// 连接socket
const socket = io('ws://localhost:9000')

// 获取聊天列表
const MSG_LIST = 'MSG_LIST';
// 读取信息
const MSG_RECV = 'MSG_RECV';
// 标识已读
const MSG_READ = 'MSG_READ';

const initState = {
    chatmsg: [], // 消息列表
    users: {},
    unread: 0 // 未读消息
}

export function chat(state = initState, action) {
    switch (action.type) {
        case MSG_LIST:
            return {...state, users: action.payload.users, chatmsg: action.payload.msgs, unread: action.payload.msgs.filter(v => !v.read && action.payload.userid == v.to).length};
        case MSG_RECV:
            const n = action.payload.to == action.userid ? 1 : 0;
            return {...state, chatmsg: [...state.chatmsg, action.payload], unread: state.unread + n};
        case MSG_READ:
            const {from, num} = action.payload;
            return {...state, chatmsg: state.chatmsg.map(v => ({...v, read: from == v.from ? true : v.read})), unread: state.unread - num};
        default:
            return state
    }
}

function msgList(msgs, users, userid) {
    return { type: MSG_LIST, payload: {msgs, users, userid} }
}
function msgRecv(msg, userid) {
    return { userid, type: MSG_RECV, payload: msg }
}
function msgRead({from, userid, num}) {
    return { type: MSG_READ, payload: {from, userid, num} }
}
// 获取聊天列表
export function getMsgList() {
    // getState 获取当前 redux 中的所有数据
    return (dispatch, getState) => {
        axios.get('/user/getmsglist').then(
            res => {
                if(res.status == 200 && res.data.code == 0) {
                    // 当前登录的用户id
                    const userid = getState().user._id
                    dispatch(msgList(res.data.msgs, res.data.users, userid))
                }
            }
        )
    }
}
// 发送聊天
export function sendMsg({from, to, msg}) {
    return dispatch => {
        socket.emit('sendmsg', { from, to, msg })
    }
}

// 接收信息
export function recvMsg() {
    return (dispatch, getState) => {
        socket.on('recvmsg', (data) => {
            const userid = getState().user._id
            dispatch(msgRecv(data, userid))
        })
    }
}

// 读消息
export function readMsg(from) {
    return (dispatch, getState) => {
        axios.post('/user/readmsg', {from}).then(
            res => {
                const userid = getState().user._id;
                if(res.status == 200 && res.data.code == 0) {
                    dispatch(msgRead({userid, from, num: res.data.num}))
                }
            }
        )
    }
}