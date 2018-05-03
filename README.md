## 另外需要安装的包
- webApp
 - redux
 - redux-thunk
 - react-redux
 - react-router-dom
 - axios 网络请求
 - antd-mobile
 - prop-types 属性检测
- nodejs
 - express
 - cookie-parser
- mongodb
 - mongoose 链接数据库

## 高阶组件
- 所谓高阶组件，就是定义一个函数，传入一个组件，返回另外一个组件。例如 `react-redux` 中的装饰器方法 `@connect`
- 作用：
  - 属性代理：可以给传入的组件增加任意属性或者元素
  - 反向继承：

#### 1、demo
- 属性代理

```js
function WrapperHello(Comp) {
    class WrapComp extends React.Component {
        render() {
            return (
                <div>
                    {/* 增加的元素 */}
                    <p>这是HOC高阶组件特有的元素</p>
                    {/* 增加的属性 name 及 age */}
                    <Comp name="xxx" age="XX" {...this.props}></Comp>
                </div>)
        }
    }
    return WrapComp
}

@WrapperHello
class Hello extends React.Component {
    render() {
        return (
            <div>Hello React</div>
        )
    }
}
```
- 反向继承

```js
function WrapperHello(Comp) {
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
    return WrapComp
}

@WrapperHello
class Hello extends React.Component {
    render() {
        return (
            <div>Hello React</div>
        )
    }
}
```
