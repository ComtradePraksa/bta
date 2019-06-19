import React,{ Component } from 'react';
import classes from './Nav.css';

class Nav extends Component{

    state = {
        toggleMenu: false,
        toggleLogout: false
    }

    toggleMenu = () => {
        this.setState({
            toggleMenu: !this.state.toggleMenu
        })
    }
    toggleUserMenu = () => {
        this.setState({
            toggleUserMenu: !this.state.toggleUserMenu
        })
    }

    logout = (e) => {
        e.preventDefault();
        //go back to login page
        this.props.loginStatus(false,{});
        //remove token from localStorage
        localStorage.removeItem('jwtoken');
    }

    render(){
        const isAdmin = this.props.loggedUser.is_admin;
        let adminPanelLink;
        let admin = ''
        if(isAdmin) {
            adminPanelLink = <a href = "/link">Admin panel</a>
            admin = ' (admin)'
        }
        return (
            <div className={classes.Container}>
                <div className={classes.Nav}>
                    <div className={classes.Logo}>
                        <span>bta.</span>
                    </div>
                    <div className={classes.Menu}>

                        <div onClick={this.toggleUserMenu} className={classes.User}>
                            <div className={classes.UserName}>{this.props.loggedUser.username} {admin}</div>
                            <div className={classes.UserPhoto}>
                                <img src={require(`../../../${this.props.loggedUser.photo}`)} alt = "" />
                            </div>
                            <div className={this.state.toggleUserMenu ? `${classes.UserMenu} ${classes.Show}` : `${classes.UserMenu}`}>
                                {adminPanelLink}
                                <a href="/link" onClick={this.logout}>Logout</a>
                            </div>
                        </div>
                        <div onClick={this.toggleMenu} className={classes.BurgerMenu}>
                            <div className={this.state.toggleMenu ? `${classes.TransformMenu} ${classes.Line}` : `${classes.Line}`}></div>
                            <div className={this.state.toggleMenu ? `${classes.TransformMenu} ${classes.Line}` : `${classes.Line}`}></div>
                            <div className={this.state.toggleMenu ? `${classes.TransformMenu} ${classes.Line}` : `${classes.Line}`}></div>
                        </div>

                    </div>
                    <ul className={this.state.toggleMenu ? `${classes.NavbarToggle} ${classes.Show}` : `${classes.NavbarToggle}`}>
                        <li><a href="/link">Accomations</a></li>
                        <li><a href="/link">Transport</a></li>
                        <li><a href="/link">City life</a></li>
                    </ul>
                </div>
            </div>
        );
    }

}

export default Nav;