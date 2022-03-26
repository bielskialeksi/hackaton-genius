import React, {Component} from 'react';

import 'materialize-css/dist/css/materialize.min.css';
import { Collapsible, CollapsibleItem } from 'react-materialize';

const LINK = "http://localhost:1337"

class OrderFrame extends React.Component {
    constructor(props) {
        super(props)
    }

    render(){
        console.log(this.props);
        return (
            <Collapsible>
                <CollapsibleItem header={`Order ${this.props.data[1].id} | TOTAL ${(this.props.data[1].attributes.price).toFixed(2)}$`} node="div" className="black">
                    {this.props.data[1].attributes.games.data.map((data,i) => <p key={i}>{data.attributes.title}</p>)}
                </CollapsibleItem>
            </Collapsible>
        )
    }
}

export default OrderFrame;