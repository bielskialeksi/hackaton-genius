import React from 'react';

import 'materialize-css/dist/css/materialize.min.css';
import { Link } from 'react-router-dom';

const LINK = "http://localhost:1337"

class ArticleFrame extends React.Component {
    constructor(props) {
        super(props)
    }

    render(){
        return (
            <Link className="link" to={`/articleinfo/${this.props.article.id}`}>
            <div className="article-container col s12 m6 l6">
                <img src={`${LINK+this.props.article.attributes.icon.data.attributes.url}`}/>
                <h3>{this.props.article.attributes.title}</h3>
                <p>{this.props.article.attributes.main_text}</p>
            </div>
            </Link>
        )
    }
}

export default ArticleFrame;