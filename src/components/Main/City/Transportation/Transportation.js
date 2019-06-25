import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './Transportation.css';
import { getFromDatabase } from '../../../../apis/btaApi';

class Transportation extends Component{
    state = {
        open: false,
        transportations: [],
        providers: [],
    }
    componentDidMount(){
        (async () => {
            const data = await getFromDatabase(`/transportations`);
            this.setState({
                transportations: data.data
            })
        })();
        (async () => {
            const data = await getFromDatabase(`/provider`);
            this.setState({
                providers: data.data
            })
        })();
    }
    componentDidUpdate(){
        console.log(123)
    }
    toggleDisplay = () => {
        this.setState({
            open: !this.state.open
        })
    }
    render (){
        console.log(this.props.city.id)
        console.log(this.state.transportations);
        console.log(this.state.providers);
        const cityTrans = this.state.transportations.filter(transportation=> {
            return transportation.from_location_id === this.props.city.id
                    || transportation.to_location_id === this.props.city.id;
        })
        console.log(cityTrans);
        return (
            <div className = {classes.TransportationWrapper}>
                <div onClick = {this.toggleDisplay} className = {classes.TransportationTitle}>
                    <span>Transport</span><FontAwesomeIcon icon="chevron-down" />
                </div>
                {this.state.open && 
                    <div className = {classes.TransportationBody}>
                        Here goes a the real info!!!
                        asfsdfsdkfj
                    </div>
                }
            </div>
        );
    }
}

export default Transportation;