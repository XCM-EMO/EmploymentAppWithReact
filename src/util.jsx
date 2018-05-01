// 根据用户信息，返回跳转地址
export function getRedirectPath({type, avatar}) {
    let url = (type == 'boss') ? '/boss' : '/genius';
    if(!avatar) {// 没有头像，去完善头像信息
        url += 'info'
    }
    return url;
}