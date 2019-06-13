import React, { Component } from 'react';
import {get} from '../../../apis/btaApi'; 



class ChooseCity extends Component{
    state={
        cities: []
    }
    componentDidMount(){
        (async ()=>{
            const data = await get("locations")
            // const citiesArray = data.data[1].city_name
            let citiesArray = [];
            data.data.map(city=>(
                citiesArray.push(city.city_name)
            ));
            this.setState({cities: citiesArray})
            console.log(this.state)
        })()
    }
    render(){
    return(
        <div>
            <h1>I would like to get some info on the city: </h1>

        </div>
    )
}}

export default ChooseCity