import React, { Component } from 'react';
import classes from './Nav.css';
import { Link } from 'react-router-dom';

class Nav extends Component {
    state = {
        toggleLogout: false
    };

    toggleUserMenu = () => {
        this.setState({ toggleUserMenu: !this.state.toggleUserMenu });
    };

    logout = () => {
        this.props.loginStatus(false, {});
        localStorage.removeItem('jwtoken');
    };

    render() {
        const isAdmin = this.props.loggedUser.is_admin;
        let adminPanelLink;
        let admin = ''
        if (isAdmin) {
            adminPanelLink = 'Admin panel';
            admin = ' (admin)';
        }
        return (
            <div className={classes.Container}>
                <div className={[classes.Nav, classes.flexNav, classes.center].join(' ')}>
                    <Link to = "/home">
                        <div className={classes.Logo}>
                            <span>bta.</span>
                        </div>
                    </Link>
                    <div className={[classes.Menu, classes.flexNav, classes.center].join(' ')}>

                        <div onClick={this.toggleUserMenu} className={[classes.User, classes.fullWidth, classes.flexNav, classes.center].join(' ')}>
                            <div className={classes.UserName}>{this.props.loggedUser.username} {admin}</div>
                            <div className={classes.UserPhoto}>
                                {
                                    (this.props.loggedUser.photo) ? (<img src={require(`../../../${this.props.loggedUser.photo}`)} alt="" />) : null
                                }
                            </div>
                            <div className={this.state.toggleUserMenu ? `${classes.UserMenu} ${classes.Show}` : `${classes.UserMenu}`}>
                                <Link to="/home/admin">
                                    <div className={[classes.isAdminCheck, classes.fullWidth].join(' ')}>{adminPanelLink}</div>
                                </Link>
                                <Link to="/" onClick={this.logout} className={classes.fullWidth}>Logout</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Nav;