import React, { Component } from 'react';
import { getFromDatabase } from '../../../apis/btaApi';
import classes from './Welcome.css';

class Welcome extends Component {
    state = {
        userName: '',
        userPhoto: '',
        isAdmin: ''
    }

    componentDidMount() {
        (async () => {
           const user = await getFromDatabase(`/users/2`);
           const userName = user.data.name;
           const userPhoto = user.data.photo;
           if (user.data.is_admin === 1) { this.setState({isAdmin: ' - admin'}); }
           this.setState({userName, userPhoto});
           console.log(userPhoto)
        })();
    };

    render() {
        return (
            <div className={classes.Container}>
                <div className={classes.Welcome}>Welcome</div>
                <img className={classes.Photo} src={require(`../../../${this.state.userPhoto}`)} alt={this.state.userName} />
                <div className={classes.Title}>{this.state.userName}{this.state.isAdmin}</div>
            </div>
        )
    };
}

export default Welcome;
