import React from 'react';
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile';
import Logo from '../../component/logo/logo';
import { login } from '../../redux/user.redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

// 高阶组件 —— 函数
function WrapperHello(Comp) {
    // 反向继承
    class WrapComp extends Comp {
        componentDidMount() {
            console.log('高阶组件新增的生命周期，加载完成');
        }
        render() {
            return(
                <Comp></Comp>
            )
        }
    }
    // 属性代理
    /*
    class WrapComp extends React.Component {
        render() {
            return (
                <div>
                    <p>这是HOC高阶组件特有的元素</p>
                    <Comp {...this.props}></Comp>
                </div>)
        }
    }
    */
    return WrapComp
}

// 高阶组件使用
/*
@WrapperHello
class Hello extends React.Component {
    render() {
        return (
            <div>Hello React</div>
        )
    }
}
*/

@connect(
    state => state.user,
    {
        login
    }
)
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pwd: ''
        }
        this.register = this.register.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }
    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }
    handleLogin() {
        this.props.login(this.state)
    }
    register() {
        this.props.history.push('/register')
    }
    render() {
        return (
            <div>
                {this.props.redirectTo && <Redirect to={this.props.redirectTo} />}
                <Logo></Logo>
                <div>我是登录页</div>
                <WingBlank>
                    <List>
                        {this.props.msg && <p className="error-msg">{this.props.msg}</p>}
                        <InputItem
                            onChange={v => this.handleChange('user', v)}
                        >用户</InputItem>
                        <WhiteSpace />
                        <InputItem
                            type="password"
                            onChange={v => this.handleChange('pwd', v)}
                        >密码</InputItem>
                    </List>
                    <Button onClick={this.handleLogin} type="primary">登录</Button>
                    <WhiteSpace />
                    <Button onClick={this.register} type="primary">注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login;