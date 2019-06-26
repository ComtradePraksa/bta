import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './Transportation.css';
import { getFromDatabase } from '../../../../apis/btaApi';

class Transportation extends Component{
    state = {
        open: false,
        cityTransportations: [],
    };

    componentDidMount() {
        (async () => {
            const data = await getFromDatabase(`/city_transportations`);
            this.setState({
                cityTransportations: data.data
            });
        })();
    };
    toggleDisplay = () => {
        this.setState({
            open: !this.state.open
        });
    };

    render() {
        const transportations = this.state.cityTransportations.filter(t => {
            return t.from_loc === this.props.city.city
            || t.to_loc === this.props.city.city
        })
        return (
            <div className = {classes.TransportationWrapper}>
                <div onClick = {this.toggleDisplay} className = {classes.TransportationTitle}>
                    <h3>Transport</h3><FontAwesomeIcon icon="chevron-down" />
                </div>
                {this.state.open && 
                    <div className = {classes.TransportationBody}>
                       {
                           transportations.length ? (
                            transportations.map(t=>{
                                return (
                                    <div key={t.id} className={classes.Transportation}>
                                        <div className={classes.Info}><span>From:</span> {t.from_loc}</div>
                                        <div className={classes.Info}><span>To:</span>{t.to_loc}</div>
                                        <div className={classes.Info}><span>Provider:</span> {t.name}</div>
                                        <div className={classes.Info}><span>Type:</span> {t.type}</div>
                                    </div>
                                );
                            })
                           ) : (
                            <div className = {classes.Transportation}>No transportations connected with this city so far!</div>
                           )
                       }
                    </div>
                }
            </div>
        );
    }
}

export default Transportation;