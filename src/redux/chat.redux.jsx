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
    unread: 0 // 未读消息
}

export function chat(state = initState, action) {
    switch (action.type) {
        case MSG_LIST:
            return {...state, chatmsg: action.payload, unread: action.payload.filter(v => !v.read).length};
        case MSG_RECV:
            return {...state, chatmsg: [...state.chatmsg, action.payload], unread: state.unread + 1};
        case MSG_READ:
            return state;
        default:
            return state
    }
}

function msgList(msgs) {
    return { type: MSG_LIST, payload: msgs }
}
function msgRecv(msg) {
    return { type: MSG_RECV, payload: msg }
}
// 获取聊天列表
export function getMsgList() {
    return dispatch => {
        axios.get('/user/getmsglist').then(
            res => {
                if(res.status == 200 && res.data.code == 0) {
                    dispatch(msgList(res.data.msgs))
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
    return dispatch => {
        socket.on('recvmsg', (data) => {
            console.log(data);
            dispatch(msgRecv(data))
        })
    }
}