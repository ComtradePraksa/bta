import React, { Component } from 'react';
import axios from 'axios';
import classes from './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import setAuthToken from '../../utils/setAuthToken';
import jwt from 'jsonwebtoken';

class Login extends Component {
  state = {
    username: '',
    password: '',
    //feedback for user(message)
    feedback: '',
    isLogged: false
  };

  inputHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  login = e => {
    const user = {
      username: this.state.username,
      password: this.state.password
    };
    e.preventDefault();

    //no empty fields allowed!!!
    if (!user.username || !user.password) {
      //display feedback
      this.setState({ feedback: 'Username and password are required!' });
    }
    else {
      //check if there is a user with these credentials
      axios({
        method: 'post',
        url: 'http://localhost:3001/login',
        data: user,
        config: { headers: { 'Content-Type': 'application/json' } }
      })
<<<<<<< HEAD
      .then(res => {
        //check if token exists
        if (res.data.token) {
          const token = res.data.token;
          //save token in localStorage
          localStorage.setItem('jwtoken',token);
          //seth auth token so that every axios req has that token uncluded
          setAuthToken(token);
          //decode token to fetch a logged user info!!!
          const loggedUser = jwt.decode(token);
          this.setState({ feedback: `Logged in as ${loggedUser.username}`, isLogged : true});
          this.props.loginStatus(true,loggedUser);
          //redirect to a home page
          this.props.history.push('/home');
        }
        else {
          this.setState({ feedback: 'no user with that credentials' });
        }
      })
      .catch(err=>{console.log(err)});
=======
        .then(res => {
          //check if token exists
          if (res.data.token) {
            const token = res.data.token;
            //save token in localStorage
            localStorage.setItem('jwtoken', token);
            //seth auth token so that every axios req has that token uncluded
            setAuthToken(token);
            //decode token to fetch a logged user info!!!
            const loggedUser = jwt.decode(token);
            this.setState({ feedback: `Logged in as ${loggedUser.username}`, isLogged: true });
            this.props.loginStatus(true, loggedUser);
          }
          else {
            this.setState({ feedback: 'no user with that credentials' });
          }
        })
        .catch(err => { console.log(err) });
>>>>>>> e49ed495b73494e1bfbf3ddca12280d675461978
    }
  };

  componentWillUnmount() {
    this._isMounted = false;
  };

  render() {
    return (
      <div className={classes.LoginWrap} >
        <img src={require('../../assets/airport-2178606_1920.jpg')} alt="front page wallpaper" />
        <img src={require('../../assets/san-francisco-1258848_1920.jpg')} alt="front page wallpaper" />
        <img src={require('../../assets/plane-322864_1920.jpg')} alt="front page wallpaper" />
        <div className={classes.Logo}>
          <div className={classes.LogoTitle}>bta.</div>
          <p className={classes.LogoDescr}>your travel assistant.</p>
        </div>
        <div className={classes.Login}>
        <form onSubmit={this.login} className={[classes.fullWidth, classes.fadein, classes.radius2, classes.rel].join(' ')}>
          <div className={[classes.formHeader, classes.white, classes.upperC, classes.flexCenter, classes.fullWidth].join(' ')}>
            Login to BTA
          </div>
          <div className={[classes.formGroup, classes.fullWidth].join(' ')}>
            <div className={[classes.inputWrapper, classes.flex, classes.rel].join(' ')}>
              <div className={[classes.iconWrapper, classes.flexCenter].join(' ')}>
                <FontAwesomeIcon icon="user" />
              </div>
              <input onChange={this.inputHandler} type="text" name="username" placeholder="username"/>
            </div>
          </div>
          <div className={classes.formGroup}>
            <div className={[classes.inputWrapper, classes.flex].join(' ')}>
              <div className={[classes.iconWrapper, classes.flexCenter].join(' ')}>
                <FontAwesomeIcon icon="key" />
              </div>
              <input onChange={this.inputHandler} type="password" name="password" placeholder="password"/>
            </div>
          </div>
          <div className={classes.feedback}>
            {this.state.feedback}
          </div>
          <button className={[classes.fullWidth, classes.white, classes.radius2, classes.upperC].join(' ')}>Login</button>
          <div className={classes.Warning}>Warning!</div>
          <p className={classes.WarningMessage}>To use this application you need a company account.
          </p>
        </form>
        </div>
      </div>
    );
  }
}

export default Login;