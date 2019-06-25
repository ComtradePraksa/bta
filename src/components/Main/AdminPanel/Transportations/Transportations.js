import React, { Component } from 'react';
import {getFromDatabase, postToDatabase, patchToDatabase, deleteFromDatabase} from '../../../../apis/btaApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './Transportations.css';

class Transportations extends Component {
    _isMounted = false;
    state = {
        locations: [],
        provider: [],
        transportations: [],
        from_location_id: '',
        to_location_id: '',
        type: '',
        provider_id: '',
        updateId: '',
        routeEdit: '',
        regEx_message: ''
    };

    getDatabase = (tableName='/transportations', saveLocation='transportations') => {
        (async () => {
            const data = await getFromDatabase(`${tableName}`);
            const dataToSave = data.data;
            if (this._isMounted) {
                this.setState({[saveLocation]: dataToSave});
            }
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
        } else { this.setState({regEx_message: 'Please, select route for transportation'}); }
    };

    updateHandler = () => {
        let providerName = document.querySelector('#type').value;
        const provider = this.state.provider.find(provider => provider.name === providerName);
        const transportationEditedData = {
            from_location_id: document.querySelector('#from_location_id').value,
            to_location_id: document.querySelector('#to_location_id').value,
            type: provider.type,
            provider_id: provider.id
        };
        (async () => {
            await patchToDatabase('/transportations', this.state.updateId, transportationEditedData);
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

    getRouteForUpdate = (id) => {
        const selectedRoute = this.state.transportations.find(route => route.id === id);
        const locationFrom = this.state.locations.find(city => city.id === selectedRoute['from_location_id']);
        const locationTo = this.state.locations.find(city => city.id === selectedRoute['to_location_id']);
        const providerId = this.state.provider.find(provider => provider.id === selectedRoute['provider_id']);
        const routeEdit = {
            id: selectedRoute.id,
            cityNameFrom: locationFrom.city,
            cityNameTo: locationTo.city,
            type: selectedRoute.type,
            providerName: providerId.name
        };

        this.setState({updateId: id, routeEdit});
        document.querySelector(`#from_location_id [value="${selectedRoute.from_location_id}"]`).selected = true;
        document.querySelector(`#to_location_id [value="${selectedRoute.to_location_id}"]`).selected = true;

        const provider = this.state.provider.find(provider => provider.id === selectedRoute.provider_id);
        document.querySelector(`#type [value="${provider.name}"]`).selected = true;
    };

    componentDidMount() {
        this._isMounted = true;
        (async () => {
            const data = await getFromDatabase(`/locations`);
            const locations = [];
            data.data.map(city => (
                locations.push({ id: city.id, city: city.city_name })
            ));
            if (this._isMounted) {
                this.setState({ locations });
            }
        })();

        this.getDatabase('/provider', 'provider');
        this.getDatabase();
    };

    componentWillUnmount() {
        this._isMounted = false;
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
                    <span onClick={() => this.getRouteForUpdate(transportation.id)}>
                        <FontAwesomeIcon icon={['fas', 'edit']} style={{color: "lightgreen", cursor: "pointer", paddingLeft: "1vw"}}/>
                    </span>
                </div>
            )
        });
        
        const routeForEdit = <div key={this.state.routeEdit.id}>
            {this.state.routeEdit.id}. From {this.state.routeEdit.cityNameFrom} - To {this.state.routeEdit.cityNameTo}, - Provider: {this.state.routeEdit.providerName}, - type of transportation: {this.state.routeEdit.type}
                            </div>;

        return(
            <div className={classes.Transportations}>
                <h2>{(this.state.updateId === '') ? 'Enter new transportation for travel' : 'Edit selected route:'}</h2>
                { (this.state.routeEdit !== '') ? routeForEdit : null }
                <div>
                    <select onClick={this.inputHandler} name="from_location_id" id="from_location_id">
                        <option value="" defaultChecked>Select location from:</option>
                        {locations}
                    </select>
                    <select onClick={this.inputHandler} name="to_location_id" id="to_location_id">
                        <option value="" defaultChecked>Select location to:</option>
                        {locations}
                    </select>
                    <select onClick={this.inputHandler} name="type" id="type">
                        <option value="" defaultChecked>Select provider:</option>
                        {provider}
                    </select>
                </div>
                <p>{this.state.regEx_message}</p>
                { (this.state.updateId === '') ?
                    <button onClick={this.saveHandler}>Add to database</button>
                  : <button onClick={this.updateHandler}>Update route</button> 
                }
                <div className={classes.TransportationsRoutes}>
                    {transportations}
                </div>
            </div>
        )
    }
}

export default Transportations;