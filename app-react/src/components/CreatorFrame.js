import React, {Component} from 'react';

import 'materialize-css/dist/css/materialize.min.css';

const LINK = "http://localhost:1337"

class CreatorFrame extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: props.creator
        }
    }

    render(){
        return (
            <div className="creator-container col s12 m12 l12 z-depth-3">
                <div className="col s12 m12 l4 center">
                    <img className="responsive-img" src={`${LINK+this.state.data.attributes.icon.data.attributes.url}`}/>
                </div>
                <div className="col s12 m12 l8">
                    <h3>{this.state.data.attributes.name}</h3>
                    <p>{this.state.data.attributes.description}</p>
                </div>
            </div>
        )
    }
}

export default CreatorFrame;