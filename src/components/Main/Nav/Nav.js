import React,{ Component } from 'react';
import classes from './Nav.css';

class Nav extends Component{
    state = {
        toggleMenu: false,
        toggleLogout: false
    };

    toggleMenu = () => {
        this.setState({ toggleMenu: !this.state.toggleMenu });
    };

    toggleUserMenu = () => {
        this.setState({ toggleUserMenu: !this.state.toggleUserMenu });
    };

    logout = (e) => {
        e.preventDefault();
        //go back to login page
        this.props.loginStatus(false,{});
        //remove token from localStorage
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
                    <div className={classes.Logo} onClick={() => this.props.adminToggle(false)}>
                        <span>bta.</span>
                    </div>
                    <div className={[classes.Menu, classes.flexNav, classes.center].join(' ')}>

                        <div onClick={this.toggleUserMenu} className={[classes.User, classes.fullWidth, classes.flexNav, classes.center].join(' ')}>
                            <div className={classes.UserName}>{this.props.loggedUser.username} {admin}</div>
                            <div className={classes.UserPhoto}>
                                <img src={require(`../../../${this.props.loggedUser.photo}`)} alt="" className={classes.fullWidth}/>
                            </div>
                            <div className={this.state.toggleUserMenu ? `${classes.UserMenu} ${classes.Show}` : `${classes.UserMenu}`}>
                                <div className={[classes.isAdminCheck, classes.fullWidth].join(' ')} onClick={() => this.props.adminToggle(true)}>{adminPanelLink}</div>
                                <a href="/link" onClick={this.logout}className = {classes.fullWidth}>Logout</a>
                            </div>
                        </div>
                        <div onClick={this.toggleMenu} className={classes.BurgerMenu}>
                            <div className={this.state.toggleMenu ? `${classes.TransformMenu} ${classes.Line}` : `${classes.Line}`}></div>
                            <div className={this.state.toggleMenu ? `${classes.TransformMenu} ${classes.Line}` : `${classes.Line}`}></div>
                            <div className={this.state.toggleMenu ? `${classes.TransformMenu} ${classes.Line}` : `${classes.Line}`}></div>
                        </div>

                    </div>
                    <ul className={this.state.toggleMenu ? `${classes.NavbarToggle} ${classes.Show}` : `${classes.NavbarToggle}`}>
                        <li><a href="/link">Accommodations</a></li>
                        <li><a href="/link">Transport</a></li>
                        <li><a href="/link">City life</a></li>
                    </ul>
                </div>
            </div>
        );
    }

}

export default Nav;