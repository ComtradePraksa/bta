import React, { Component } from 'react';
import classes from './Nav.css';
import { Link } from 'react-router-dom';
import OutsideAlert from '../../../OutsideAlert'

class Nav extends Component {
    state = {
        toggleLogout: false,
        isOpenUserMenu: false
    };

    toggleUserMenu = () => {
        this.setState({ isOpenUserMenu: !this.state.isOpenUserMenu });
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
            adminPanelLink = 'Admin\xa0panel';
        }
        return (
            <div className={classes.Container}>
                <div className={[classes.Nav, classes.flexNav, classes.center].join(' ')}>
                    <Link to="/home">
                        <div className={classes.Logo}>
                            <span>bta.</span>
                        </div>
                    </Link>
                    <div className={[classes.Menu, classes.flexNav, classes.center].join(' ')}>

                        <OutsideAlert isOpenUserMenu={this.state.isOpenUserMenu} toggleUserMenu={this.toggleUserMenu}>
                            <div onClick={this.toggleUserMenu} className={[classes.User, classes.fullWidth, classes.flexNav, classes.center].join(' ')}>
                                <div className={classes.UserName}>{this.props.loggedUser.username} {admin}</div>
                                <div className={classes.UserPhoto}>
                                    {
                                        (this.props.loggedUser.photo) ? (<img src={require(`../../../${this.props.loggedUser.photo}`)} alt="" className={classes.fullWidth} />) : null
                                    }
                                </div>
                                <div className={this.state.isOpenUserMenu ? `${classes.UserMenu} ${classes.Show}` : `${classes.UserMenu}`}>
                                    {
                                        isAdmin ? <Link to="/admin/users"
                                        className={[classes.fullWidth].join(' ')}>{adminPanelLink}
                                    </Link> : ""
                                    }
                                    <Link to="/" onClick={this.logout} className={classes.fullWidth}>Logout</Link>
                                </div>
                            </div>
                        </OutsideAlert>
                    </div>
                </div>
            </div>
        );
    }

}

export default Nav;