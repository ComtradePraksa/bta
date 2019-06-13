import React, { Component } from 'react';
import { getById } from '../../../apis/btaApi';

class Welcome extends Component {
    state = {
        userName: '',
        userPhoto: ''
    }

    componentDidMount() {
        (async () => {
           const user = await getById(1);
           const userName = user.data.name;
           const userPhoto = user.data.photo;
           this.setState({userName, userPhoto});
        })();
    }


    render() {
        return (
            <div>
                <div>Welcome 
                    <img src={require(`../../../${this.state.userPhoto}`)} alt={this.state.userName}/>
                    {this.state.userName}
                </div>

            </div>
        )
    }
}

export default Welcome;