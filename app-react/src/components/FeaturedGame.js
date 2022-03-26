import React, {Component} from 'react';

import 'materialize-css/dist/css/materialize.min.css';

const LINK = "http://localhost:1337"

class FeaturedGame extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        if(this.props.callback){
            this.props.callback(this.props.data.id)
        }
    }

    render(){
        const color = this.props.selected === true && "grey darken-1" || "grey darken-3"
        return (
            <div onClick={this.handleClick} className={`featured-game ${color}`}>
                <div className="icon" style={{background:`url(${LINK+this.props.data.attributes.icon.data.attributes.url})`}}></div>
                <h3 className="truncate">{this.props.data.attributes.title}</h3>
            </div>
        )
    }
}

export default FeaturedGame;