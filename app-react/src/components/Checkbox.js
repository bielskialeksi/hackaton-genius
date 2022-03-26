import React, {Component} from 'react';

import 'materialize-css/dist/css/materialize.min.css';

class Checkbox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            callback: props.callback || null,
        }
    }

    handleClick(event){
        if (this.state.callback){
            this.state.callback(this.props.data.attributes.name, event.target.checked)
        }
    }

    render(){
        return (
            <p>
                <label>
                    <input type="checkbox" className="filled-in" onClick={(event) => this.handleClick(event)}/>
                    <span>{this.props.data.attributes.name}</span>
                </label>
            </p>
        )
    }
}

export default Checkbox;