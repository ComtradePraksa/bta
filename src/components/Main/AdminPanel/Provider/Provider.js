import React, { Component } from 'react';
import {getFromDatabase, postToDatabase, deleteFromDatabase} from '../../../../apis/btaApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './Provider.css';

class Provider extends Component {
    state = {
        name: '',
        type: '',
        provider: []
    };

    getDatabase = () => {
        (async () => {
            const data = await getFromDatabase(`/provider`);
            const provider = data.data;
            this.setState({ provider });
        })();
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
            this.getDatabase();
        })();
    };

    deleteHandler = (id) => {
        (async () => {
            await deleteFromDatabase('/provider', id);
            this.getDatabase();
        })();
    };

    componentDidMount() {
        this.getDatabase();
    };

    render() {
        const providers = this.state.provider.map(provider => {
            return (
                <div key={provider.id} className={classes.ProviderDetails}>
                    <div onClick={() => this.deleteHandler(provider.id)}>{provider.name} - type: {provider.type} <FontAwesomeIcon icon="trash-alt" style={{color: "red", cursor: "pointer", paddingLeft: "1vw"}}/></div>
                </div>
            )
        });

        return(
            <div className={classes.Provider}>
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
                <div className={classes.ProviderList}>
                    {providers}
                </div>
            </div>
        )
    }
}

export default Provider;