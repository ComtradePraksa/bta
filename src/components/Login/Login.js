import React, { Component } from 'react';
import axios from 'axios';
import classes from './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Login extends Component {
  state = {
    username: '',
    password: '',
    //feedback for user(message)
    feedback: ''
  }

  inputHandler = e => {
    this.setState ({ [e.target.name]: e.target.value });
  };

  login = e => {
    const user = {
      username: this.state.username,
      password: this.state.password
    };
    e.preventDefault();

    //no empty fields allowed!!!
    if(!user.username || !user.password){
      //display feedback
      this.setState({ feedback: 'Username and password are required!' });
    }
    else{
      //check if there is a user with these credentials
      axios({
        method: 'post',
        url: 'http://localhost:3001/users',
        data: user,
        config: { headers: { 'Content-Type': 'application/json' } }
      })
      .then(res => {
        //there is a user in db
        if (res.data.data.length) {
          //redirect to a home page
          this.setState({ feedback: `Logged in as ${res.data.data[0].username}` });
        }
        else {
          this.setState({ feedback: 'no user with that credentials' });
        }
      })
      .catch(err=>{console.log(err)});
    }
  }

  render() {
    return (
      <div className={classes.loginWrapper} >
        <form onSubmit={this.login}>
          <div className={classes.formHeader}>
            Login to BTA
          </div>
          <div className={classes.formGroup}>
            <div className={classes.inputWrapper}>
              <div className={classes.iconWrapper}>
                <FontAwesomeIcon icon="user" />
              </div>
              <input onChange={this.inputHandler} type="text" name="username" placeholder="username"/>
            </div>
          </div>
          <div className={classes.formGroup}>
            <div className={classes.inputWrapper}>
              <div className={classes.iconWrapper}>
                <FontAwesomeIcon icon="key" />
              </div>
              <input onChange={this.inputHandler} type="password" name="password" placeholder="password"/>
            </div>
          </div>
          <div className="feedback">
            {this.state.feedback}
          </div>
          <button className={classes.btn}>Login</button>
        </form>
      </div>
    );
  }
}

export default Login;