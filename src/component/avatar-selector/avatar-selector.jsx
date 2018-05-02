import React from 'react';
import { Grid, List } from 'antd-mobile';
import PropTypes from 'prop-types';

class AvatarSelector extends React.Component {
    static propTypes = {
        selectAvatar: PropTypes.func.isRequired
    }
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        const avatarList = 'boy,bull,chick,crab,girl,hedgehog,hippopotamus,koala,lemur,man,pig,tiger,whale,woman,zebra'
            .split(',')
            .map(item => ({
                icon: require(`../img/${item}.png`),
                text: item
            }))

        const gridHeader = this.state.icon ? (
            <div>
                <span>已选择头像</span>
                <img style={{ width: "20" }} src={this.state.icon} />
            </div>
        ) : '请选择头像'
        return (
            <div>
                <List renderHeader={() => gridHeader}>
                    <Grid
                        columnNum={5}
                        data={avatarList}
                        onClick={elem => {
                            this.setState(elem)
                            this.props.selectAvatar(elem.text)
                        }}
                    />
                </List>
            </div>
        )
    }
}

export default AvatarSelector;