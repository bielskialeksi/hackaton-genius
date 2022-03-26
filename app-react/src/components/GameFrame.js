import React, {Component} from 'react';

import 'materialize-css/dist/css/materialize.min.css';
import { Link } from 'react-router-dom';

const LINK = "http://localhost:1337"

class GameFrame extends React.Component {
    constructor(props) {
        super(props)
    }

    render(){
        const currentPromotion = (this.props.game.attributes.price*(this.props.game.attributes.promotion/100)); 

        return (
            <Link className="link" to={`/gameinfo/${this.props.game.id}`}>
            <div className="games-container col">
                <img src={`${LINK+this.props.game.attributes.icon.data.attributes.url}`}/>
                <div className="row valign-wrapper">
                    <h3 className="col s6 m6 l6 ">{this.props.game.attributes.title}</h3>
                    <p className="col s6 m6 l6">{(this.props.game.attributes.price-currentPromotion).toFixed(2)}$</p>
                </div>
            </div>
            </Link>
        )
    }
}

export default GameFrame;