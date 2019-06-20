import React, { Component } from 'react';
//import classes from './HotelsCity.css';
import { getFromDatabase } from '../../../../apis/btaApi';
import HotelCity from './HotelCity/HotelCity'

class HotelsCity extends Component {
    state = {
        hotelLinks: []
      };

      getHotelLinkS=()=>{
        (async()=>{
            const res = await getFromDatabase(`/accommodations/id_city/${this.props.city.id}`)
            const hotelsByCityId = res.data;
            const hotelLinks = []
            hotelsByCityId.map(e=>hotelLinks.push(e.link))
            this.setState({hotelLinks})
        })();
      }

    componentDidUpdate(prevProps) {
        if (this.props.city!== prevProps.city) {
            this.getHotelLinkS()
        }
    }

        componentDidMount(){
            this.getHotelLinkS()
        }
        
    render() {
        const view = this.state.hotelLinks.slice(0,5).map((e,index)=><HotelCity key={index} hotelLink={e}/>)
    
       return(
       <React.Fragment>{view}</React.Fragment>
       )
    }
}

export default HotelsCity;