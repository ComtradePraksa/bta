import React, { Component } from 'react';
import {getFromDatabase, postToDatabase} from '../../../../apis/btaApi';

class Provider extends Component {
    state = {
        name: '',
        type: '',
        provider: []
    };

    inputHandler = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    saveHandler = () => {
        const newProvider = {
            name: this.state.name,
            type: this.state.type
        };
        (async () => {
            await postToDatabase('/provider', newProvider);
        })();
    };

    componentDidMount() {
        (async () => {
            const data = await getFromDatabase(`/provider`);
            const provider = data.data;
            this.setState({ provider });
        })();
    };

    render() {
        const providers = this.state.provider.map(provider => {
            return (
                <div key={provider.id} id={provider.id}>
                    {provider.id}. {provider.name} - type: {provider.type}
                </div>
            )
        });

        return(
            <div>
                <h2>Enter new provider for travel</h2>
                <div>
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
                </div>
                <button onClick={this.saveHandler}>Add to database</button>
                <div>
                    {providers}
                </div>
            </div>
        )
    }
}

export default Provider;