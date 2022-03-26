import React, {Component} from 'react';

import 'materialize-css/dist/css/materialize.min.css';
import { Link } from 'react-router-dom';

const LINK = "http://localhost:1337";

class ContainerPopular extends React.Component {
    render(){
        return (
            <Link className="link" to={`/gameinfo/${this.props.data.id}`}>
            <div className="popular-container">
                <div className="img" style={{background : `url(${LINK+this.props.data.attributes.icon.data.attributes.url}) center`}}></div>
                <div className="row valign-wrapper">
                    <h3 className="col s6 m6 l6 ">{this.props.data.attributes.title}</h3>
                    <p className="col s6 m6 l6">{this.props.data.attributes.price}$</p>
                </div>
            </div>
            </Link>
        )
    }
}

export default ContainerPopular;