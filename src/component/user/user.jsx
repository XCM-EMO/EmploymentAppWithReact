import React from 'react';
import { connect } from 'react-redux';
import { Result, List, WhiteSpace, Modal } from 'antd-mobile';
import browserCookies from 'browser-cookies';
import { Redirect } from 'react-router-dom';
import { logoutSubmit } from '../../redux/user.redux';

@connect(
    state => state.user,
    { logoutSubmit }
)
class User extends React.Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this);
    }
    logout() {
        const alert = Modal.alert;
        alert('注销', '确认退出登录吗？', [
            { text: '取消', onPress: () => console.log('点击了取消') },
            {
                text: '确认', onPress: () => {
                    browserCookies.erase('userid')
                    this.props.logoutSubmit()
                }
            }
        ])
    }
    render() {
        return this.props.user ? (
            <div>
                {(this.props.redirectTo && this.props.redirectTo != '/login') && <Redirect to={this.props.redirectTo}/>}
                <Result
                    img={<img style={{ width: 50 }} src={require(`../img/${this.props.avatar}.png`)} />}
                    title={this.props.user}
                    message={this.props.type == 'boss' && this.props.company}
                />
                <List renderHeader={() => '简介'}>
                    <List.Item multipleLine>
                        {this.props.title}
                        {this.props.desc.split('\n').map(v => (
                            <List.Item.Brief key={v}>{v}</List.Item.Brief>
                        ))}
                        {this.props.money && <List.Item.Brief>薪资：{this.props.money}</List.Item.Brief>}
                        {this.props.company && <List.Item.Brief>公司：{this.props.company}</List.Item.Brief>}
                    </List.Item>
                </List>
                <WhiteSpace />
                <List>
                    <List.Item onClick={this.logout}>退出登录</List.Item>
                </List>
            </div>
        ) : <Redirect to={this.props.redirectTo}/>
    }
}

export default User;