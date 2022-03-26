import React, {Component} from 'react';

import 'materialize-css/dist/css/materialize.min.css';
import { Link } from 'react-router-dom';

const LINK = "http://localhost:1337";

class ContainerSales extends React.Component {
    render(){

        const currentPromotion = (this.props.data[1].attributes.price*(this.props.data[1].attributes.promotion/100)); 

        return (
            <Link className="link" to={`/gameinfo/${this.props.data[1].id}`}>
            <div className="games-container">
                <div className="sales">
                    <img src={LINK+this.props.data[1].attributes.icon.data.attributes.url} />
                    <p className="right">-{this.props.data[1].attributes.promotion}%</p>
                </div>
                <div className="row plus">
                    <h3 className="col s6 m8 l8 left">{this.props.data[1].attributes.title}</h3>
                    <p className="col s6 m4 l4 right">{(this.props.data[1].attributes.price-currentPromotion).toFixed(2)}$</p>
                </div>
            </div>
            </Link>
        )
    }
}

export default ContainerSales;