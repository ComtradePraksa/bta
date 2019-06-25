import React, { Component } from 'react';
import {getFromDatabase, postToDatabase, deleteFromDatabase} from '../../../../apis/btaApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './Provider.css';

class Provider extends Component {
    _isMounted = false;
    state = {
        name: '',
        type: '',
        provider: [],
        regEx_message: '',
        true_message: ''
    };

    getDatabase = () => {
        (async () => {
            const data = await getFromDatabase(`/provider`);
            const provider = data.data;
            if (this._isMounted) {
                this.setState({ provider });
            }
        })();
    };

    inputHandler = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    saveHandler = () => {
        if (this.state.name && this.state.type !== '') {
            const newProvider = {
                name: this.state.name,
                type: this.state.type
            };
            (async () => {
                await postToDatabase('/provider', newProvider);
                this.getDatabase();
            })();
            this.setState({true_message: '- Successfully aded new provider -'});
        } else { this.setState({regEx_message: 'Please, enter provider name and type!'}); }
    };

    deleteHandler = (id) => {
        (async () => {
            await deleteFromDatabase('/provider', id);
            this.getDatabase();
        })();
        this.setState({true_message: '- Successfully deleted provider -'});
    };

    componentDidMount() {
        this._isMounted = true;
        this.getDatabase();
    };

    componentWillUnmount() {
        this._isMounted = false;
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
                {
                    (this.state.regEx_message !== '' && this.state.true_message === '') ? 
                    <p className={classes.Message}>{this.state.regEx_message}</p> :
                    <p className={classes.MessageTrue}>{this.state.true_message}</p>
                }
                <button onClick={this.saveHandler}>Add to database</button>
                <div className={classes.ProviderList}>
                    {providers}
                </div>
            </div>
        )
    }
}

export default Provider;