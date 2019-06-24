import React, { Component } from 'react';
import {getFromDatabase, postToDatabase, patchToDatabase, deleteFromDatabase} from '../../../../apis/btaApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './Transportations.css';

class Transportations extends Component {
    state = {
        locations: [],
        provider: [],
        transportations: [],
        from_location_id: '',
        to_location_id: '',
        type: '',
        provider_id: '',
        updateId: ''
    };

    getDatabase = (tableName='/transportations', saveLocation='transportations') => {
        (async () => {
            const data = await getFromDatabase(`${tableName}`);
            const dataToSave = data.data;
            this.setState({[saveLocation]: dataToSave});
        })();
    };

    inputHandler = (e) => {
        if (e.target.name === 'type') {
            const providerId = this.state.provider.find(provider => provider.name === e.target.value);
            let id, type;
            if (providerId !== undefined) {id = providerId.id; type = providerId.type;}
            this.setState({ [e.target.name]: type, provider_id: id });
        } else { this.setState({ [e.target.name]: e.target.value }); }
    };

    saveHandler = () => {
        if (this.state.from_location_id && this.state.to_location_id && this.state.type !== '') {
            const transportationData = {
                from_location_id: this.state.from_location_id,
                to_location_id: this.state.to_location_id,
                type: this.state.type,
                provider_id: this.state.provider_id
            };
    
            (async () => {
                await postToDatabase('/transportations', transportationData);
                this.getDatabase();
            })();
        } else { alert('Select route for transportation'); }
    };

    updateHandler = () => {
        (async () => {
            await patchToDatabase('/transportations', this.state.updateId, this.state.accommodationsNew);
            this.getDatabase();
        })();
        this.setState({updateId: ''});
    };

    deleteHandler = (id) => {
        (async () => {
            await deleteFromDatabase('/transportations', id);
            this.getDatabase();
        })();
    };

    getDataForUpdate = (id) => {
        this.setState({updateId: id});
    };

    componentDidMount() {
        (async () => {
            const data = await getFromDatabase(`/locations`);
            const locations = [];
            data.data.map(city => (
                locations.push({ id: city.id, city: city.city_name })
            ));
            this.setState({ locations });
        })();

        this.getDatabase('/provider', 'provider');
        this.getDatabase();
    };

    render() {
        const locations = this.state.locations.map(city => {
            return (
                <option key={city.id} value={city.id}>{city.city}</option>
            )
        });

        const provider = this.state.provider.map(provider => {
            return (
                <option key={provider.id} value={provider.name} id={provider.id}>{provider.name}-{provider.type}</option>
            )
        });

        const transportations = this.state.transportations.map(transportation => {
            const locationFrom = this.state.locations.find(city => city.id === transportation['from_location_id']);
            const locationTo = this.state.locations.find(city => city.id === transportation['to_location_id']);
            const providerId = this.state.provider.find(provider => provider.id === transportation['provider_id']);
            let cityNameFrom, cityNameTo, providerName;
            if (locationFrom !== undefined) {cityNameFrom = locationFrom.city;}
            if (locationTo !== undefined) {cityNameTo = locationTo.city;}
            if (providerId !== undefined) {providerName = providerId.name;}
            
            return (
                <div key={transportation.id}>
                    {transportation.id}. From {cityNameFrom} - To {cityNameTo}, - Provider: {providerName}, - type of transportation: {transportation.type}
                    <span onClick={() => this.deleteHandler(transportation.id)}>
                        <FontAwesomeIcon icon="trash-alt" style={{color: "red", cursor: "pointer", paddingLeft: "1vw"}}/>
                    </span>
                    <span onClick={() => this.getDataForUpdate(transportation.id)}>
                        <FontAwesomeIcon icon={['fas', 'edit']} style={{color: "lightgreen", cursor: "pointer", paddingLeft: "1vw"}}/>
                    </span>
                </div>
            )
        });

        return(
            <div className={classes.Transportations}>
                <h2>Enter new transportation for travel</h2>
                <div>
                    <select onClick={this.inputHandler} name="from_location_id">
                        <option value="" defaultChecked>Select location from:</option>
                        {locations}
                    </select>
                    <select onClick={this.inputHandler} name="to_location_id">
                        <option value="" defaultChecked>Select location to:</option>
                        {locations}
                    </select>
                    <select onClick={this.inputHandler} name="type">
                        <option value="" defaultChecked>Select provider:</option>
                        {provider}
                    </select>
                </div>
                <button onClick={this.saveHandler}>Add to database</button>
                <div>
                    {transportations}
                </div>
            </div>
        )
    }
}

export default Transportations;