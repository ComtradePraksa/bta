import React, { Component } from 'react';
import Users from './Users/Users';
import City from '../City/City';

class AdminPanel extends Component {
    state = {
        option: ''
    };

    optionHandler = (e) => {
        this.setState ({ option: e.target.id });
    };

    render() {
        let optionForRender = '';
        if (this.state.option === 'Users') {
            optionForRender = <Users />;
        } else if (this.state.option === 'City') {
            optionForRender = <City />
        }

        return (
            <div>
                <h1>Admin panel</h1>
                <div onClick={this.optionHandler} id='Users'>Users</div>
                <div onClick={this.optionHandler} id='City'>City</div>
                <div onClick={this.optionHandler} id='Accomodation'>Accomodation</div>
                <div onClick={this.optionHandler} id='Provider'>Provider</div>
                <div onClick={this.optionHandler} id='Route'>Route</div>
                <div onClick={this.optionHandler} id='Feedback'>Feedback</div>
                {optionForRender}
            </div>
        );
    }
}

export default AdminPanel;