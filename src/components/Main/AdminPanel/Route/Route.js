import React, { Component } from 'react';
import { getFromDatabase, postToDatabase } from '../../../../apis/btaApi';

class Route extends Component {
    state = {
        locations: [],
        provider: [],
        routes: [],
        from_loaction_id: '',
        to_location_id: '',
        type: '',
        provider_id: ''
    };

    inputHandler = (e) => {
        if (e.target.name === 'type') {
            this.setState({ [e.target.name]: e.target.value, provider_id: e.target.id });
        } else { this.setState({ [e.target.name]: e.target.value }); }
    };

    saveHandler = () => {
        const routeData = {
            from_loaction_id: this.state.from_loaction_id,
            to_location_id: this.state.to_location_id,
            type: this.state.type,
            provider_id: this.state.provider_id
        };

        (async () => {
            await postToDatabase('/transportations', routeData);
        })();
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

        (async () => {
            const data = await getFromDatabase(`/provider`);
            const providers = data.data;
            this.setState({ provider: providers });
        })();
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

        return(
            <div>
                <h2>Enter new route for travel</h2>
                <div>
                    <select onClick={this.inputHandler} name="from_loaction_id">
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
            </div>
        )
    }
}

export default Route;