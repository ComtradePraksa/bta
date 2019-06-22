import React, { Component } from 'react';
import {Route, Link, Redirect} from 'react-router-dom';
import Users from './Users/Users';
import City from './City/City';
import Accommodation from './Accommodation/Accommodation';
import Provider from './Provider/Provider';
import Transportations from './Transportations/Transportations';
import Feedback from './Feedback/Feedback';
import classes from './AdminPanel.css';

class AdminPanel extends Component {
    render() {
        //check if logged user is admin
        // if not, redirect to home page
        if (!this.props.loggedUser.is_admin) {
            return <Redirect to = "/home"/>;
        }
        
        return (
            <div className={classes.AdminPanel}>
                <h1>Admin panel</h1>
                <div className={classes.AdminContainer}>
                    <Link to={`${this.props.match.url}/users`}><div>Users</div></Link>
                    <Link to={`${this.props.match.url}/city`}><div>City</div></Link>
                    <Link to={`${this.props.match.url}/accomodation`}><div>Accommodation</div></Link>
                    <Link to={`${this.props.match.url}/provider`}><div>Provider</div></Link>
                    <Link to={`${this.props.match.url}/route`}><div>Route</div></Link>
                    <Link to={`${this.props.match.url}/feedback`}><div>Feedback</div></Link>
                </div>
                <Route path={`${this.props.match.path}/users`} exact component={Users}/>
                <Route path={`${this.props.match.path}/city`} exact component={City}/>
                <Route path={`${this.props.match.path}/accomodation`} exact component={Accommodation}/>
                <Route path={`${this.props.match.path}/provider`} exact component={Provider}/>
                <Route path={`${this.props.match.path}/route`} exact component={Transportations}/>
                <Route path={`${this.props.match.path}/feedback`} exact render={() => <div><Feedback /></div> }/>
            </div>
        );
    }
}

export default AdminPanel;