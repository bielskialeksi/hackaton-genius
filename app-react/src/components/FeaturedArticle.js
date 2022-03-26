import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import 'materialize-css/dist/css/materialize.min.css';

const LINK = "http://localhost:1337"

class FeaturedArticle extends React.Component {
    constructor(props) {
        super(props)

        this.renderImage = this.renderImage.bind(this);
        this.renderText = this.renderText.bind(this);
    }
    
    renderImage(){
        return(
            <div className="image-container col s12 m12 l6">
                <div className="simple-img">
                    <img src={LINK+this.props.data.attributes.icon.data.attributes.url} alt=""/>
                </div>
            </div>
        )
    }

    renderText(){
        return(
            <div className="col s12 m12 l6">
                <h3 className="flow-text">{this.props.data.attributes.title}</h3>
                <p>{this.props.data.attributes.main_text}</p>
                <Link className="waves-effect waves-light btn-medium" to={`/articleinfo/${this.props.data.id}`}>READ MORE</Link>
            </div>
        )
    }

    render(){
        if(this.props.id%2==0){
            return (
                <div className="featured-article row ">
                    <this.renderText />
                    <this.renderImage />
                </div>
            )
        }else{
            return (
                <div className="featured-article row ">
                    <this.renderImage />
                    <this.renderText />
                </div>
            )
        }
    }
}

export default FeaturedArticle;