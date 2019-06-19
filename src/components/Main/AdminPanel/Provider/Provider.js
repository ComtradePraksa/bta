import React, { Component } from 'react';
import { postToDatabase } from '../../../../apis/btaApi';

class Provider extends Component {
    state = {
        name: '',
        type: ''
    };

    inputHandler = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    saveHandler = () => {
        (async () => {
            await postToDatabase('/provider', this.state);
        })();
    };

    render() {
        console.log(this.state);
        return(
            <div>
                <h2>Enter new provider for travel</h2>
                <input onBlur={this.inputHandler} type="text" name="name" placeholder="Enter provider name"/>
                <select onClick={this.inputHandler} name="type">
                    <option value="" defaultChecked>Select type:</option>
                    <option value="Airplane">Airplane</option>
                    <option value="Bus">Bus</option>
                    <option value="Company car">Company car</option>
                    <option value="Rent a car">Rent a car</option>
                    <option value="Train">Train</option>
                    <option value="Taxi">Taxi</option>
                </select>
                <button onClick={this.saveHandler}>Add to database</button>
            </div>
        )
    }
}

export default Provider;