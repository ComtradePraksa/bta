import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';
import Users from './Users/Users';
import City from './City/City';
import Accommodation from './Accommodation/Accommodation';
import Provider from './Provider/Provider';
import Routes from './Route/Route';
import Feedback from './Feedback/Feedback';
import classes from './AdminPanel.css';

class AdminPanel extends Component {

    render() {
        return (
            <div className={classes.AdminPanel}>
                <h1>Admin panel</h1>
                <div className={classes.AdminContainer}>
                    <Link to='/adminPanel/users'><div>Users</div></Link>
                    <Link to='/adminPanel/city'><div>City</div></Link>
                    <Link to='/adminPanel/accommodation'><div>Accommodation</div></Link>
                    <Link to='/adminPanel/provider'><div>Provider</div></Link>
                    <Link to='/adminPanel/route'><div>Route</div></Link>
                    <Link to='/adminPanel/feedback'><div>Feedback</div></Link>
                </div>
                <Route path='/adminPanel/users' exact component={Users}/>
                <Route path='/adminPanel/city' exact component={City}/>
                <Route path='/adminPanel/accommodation' exact component={Accommodation}/>
                <Route path='/adminPanel/provider' exact component={Provider}/>
                <Route path='/adminPanel/route' exact component={Routes}/>
                <Route path='/adminPanel/feedback' exact component={Feedback}/>
            </div>
        );
    }
}

export default AdminPanel;