import React, { Component } from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
import Users from './Users/Users';
import City from './City/City';
import Accommodation from './Accommodation/Accommodation';
import Provider from './Provider/Provider';
import Transportations from './Transportations/Transportations';
import Feedback from './Feedback/Feedback';
import classes from './AdminPanel.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Nav from '../Nav/Nav';

class AdminPanel extends Component {
    
    logout = () => {
        //logout
        this.props.loginStatus(false, {});
        localStorage.removeItem('jwtoken');
    };

    render() {
        if (!this.props.loggedUser.is_admin) {
            return <Redirect to="/home"/>;
        }
        
        return (
            <div className={classes.AdminPanel}>
                <Nav loggedUser={this.props.loggedUser} loginStatus={this.props.loginStatus} />
                <div className={classes.AdminH1}><h1>Administration panel</h1></div>
                <div className={classes.AdminContainer}>
                    <Link to={`${this.props.match.url}/users`}><div className={classes.AdminPanelLink}><div className={classes.icon}><FontAwesomeIcon icon="users" size='3x' /></div>Users</div></Link>
                    <Link to={`${this.props.match.url}/city`}><div className={classes.AdminPanelLink}><div className={classes.icon}><FontAwesomeIcon icon="city" size='3x' /></div>City</div></Link>
                    <Link to={`${this.props.match.url}/accomodation`}><div className={classes.AdminPanelLink}><div className={classes.icon}><FontAwesomeIcon icon="hotel" size='3x' /></div>Accommodation</div></Link>
                    <Link to={`${this.props.match.url}/provider`}><div className={classes.AdminPanelLink}><div className={classes.icon}><FontAwesomeIcon icon="plane" size='3x' /></div>Provider</div></Link>
                    <Link to={`${this.props.match.url}/route`}><div className={classes.AdminPanelLink}><div className={classes.icon}><FontAwesomeIcon icon="route" size='3x' /></div>Route</div></Link>
                    <Link to={`${this.props.match.url}/feedback`}><div className={classes.AdminPanelLink}><div className={classes.icon}><FontAwesomeIcon icon="comments" size='3x' /></div>Feedback</div></Link>
                </div>
                <div className={classes.AdminComponent}>
                    <Route path={`${this.props.match.path}/users`} exact component={Users} />
                    <Route path={`${this.props.match.path}/city`} exact component={City} />
                    <Route path={`${this.props.match.path}/accomodation`} exact component={Accommodation} />
                    <Route path={`${this.props.match.path}/provider`} exact component={Provider} />
                    <Route path={`${this.props.match.path}/route`} exact component={Transportations} />
                    <Route path={`${this.props.match.path}/feedback`} exact render={ () => <Feedback/> } />
                </div>
            </div>
        );
    }
}

export default AdminPanel;