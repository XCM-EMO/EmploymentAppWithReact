import React from 'react';
import PropTypes from 'prop-types';
import { WingBlank, WhiteSpace, Card } from 'antd-mobile';

class UserCard extends React.Component {
    static propTypes = {
        userlist: PropTypes.array.isRequired
    }
    constructor(props) {
        super(props)
        this.state = {};
    }
    render() {
        return (
            <WingBlank>
                <WhiteSpace />
                {this.props.userlist.map(v => (
                    v.avatar && <Card key={v._id}>
                        <Card.Header
                            title={v.user}
                            thumb={require(`../img/${v.avatar}.png`)}
                            extra={<span>{v.title}</span>}
                        ></Card.Header>
                        <Card.Body>
                            {v.type == 'boss' && <div>公司：{v.company}</div>}
                            {v.desc.split('\n').map(d => (
                                <div key={d}>{d}</div>
                            ))}
                            {v.type == 'boss' && <div>薪资：{v.money}</div>}
                        </Card.Body>
                    </Card>
                ))}
            </WingBlank>
        )
    }
}

export default UserCard;