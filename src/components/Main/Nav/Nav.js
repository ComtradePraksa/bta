import React,{ Component } from 'react';
import classes from './Nav.css';
import {Link} from 'react-router-dom';

class Nav extends Component{
    state = {
        toggleLogout: false
    };

    toggleUserMenu = () => {
        this.setState({ toggleUserMenu: !this.state.toggleUserMenu });
    };

    logout = () => {
        //go back to login page
        this.props.loginStatus(false,{});
        //remove token from localStorage
        localStorage.removeItem('jwtoken');
    };

    render() {
        let userPhoto;
        const isAdmin = this.props.loggedUser.is_admin;
        console.log(this.props.loggedUser.photo);
        let adminPanelLink;
        let admin = ''
        if (isAdmin) {
            adminPanelLink = 'Admin panel';
            admin = ' (admin)';
        }
        // if(this.props.loggedUser !== 'undefined'){
        //     userPhoto = <img src={require(`../../../${this.props.loggedUser.photo}`)} alt="" className={classes.fullWidth} />
        // }
        return (
            <div className={classes.Container}>
                <div className={[classes.Nav, classes.flexNav, classes.center].join(' ')}>
                    <div className={classes.Logo} onClick={() => this.props.adminToggle(false)}>
                        <span>bta.</span>
                    </div>
                    <div className={[classes.Menu, classes.flexNav, classes.center].join(' ')}>

                        <div onClick={this.toggleUserMenu} className={[classes.User, classes.fullWidth, classes.flexNav, classes.center].join(' ')}>
                            <div className={classes.UserName}>{this.props.loggedUser.username} {admin}</div>
                            <div className={classes.UserPhoto}>
                                {
                                    (this.props.loggedUser.photo) ? (<img src={require(`../../../${this.props.loggedUser.photo}`)} alt="" className={classes.fullWidth} />) : null
                                }
                            </div>
                            <div className={this.state.toggleUserMenu ? `${classes.UserMenu} ${classes.Show}` : `${classes.UserMenu}`}>
                                <Link to = "/admin">
                                    <div className={[classes.isAdminCheck, classes.fullWidth].join(' ')}>{adminPanelLink}</div>
                                </Link>
                                <Link to="/" onClick = {this.logout} className = {classes.fullWidth}>Logout</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Nav;