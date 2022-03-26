import React, {Component} from 'react';

import 'materialize-css/dist/css/materialize.min.css';
import { Link } from 'react-router-dom';
const LINK = "http://localhost:1337";


class ContainerArticles extends React.Component {
    render(){
        return (
            <Link className="link" to={`/articleinfo/${this.props.id}`}>
            <div className="article-container">
                <img src={LINK+this.props.data.attributes.icon.data.attributes.url}/>
                <div>
                    <h3>{this.props.data.attributes.title}</h3>
                    <p>{this.props.data.attributes.main_text}</p>
                </div>
            </div>
            </Link>
        )
    }
}

export default ContainerArticles;