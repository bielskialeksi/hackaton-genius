import React from 'react';
import ApiUtilities from '../api/ApiUtilities.js';

import '../App.css';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Loader from '../components/Loader';

const LINK = "http://localhost:1337"

class ArticleInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            article: null,
            loaded: false
        }     
    }

    async componentDidMount(){
        const id = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
        //const article = this.props.state.articles.data.find(article=>article.id===parseInt(id))
        const article = await ApiUtilities.getArticle(id)

        this.setState({article: article.data, loaded: true})
    }


    render(){
        if (this.state.loaded === false){
            return <Loader />
        }
        return(     
            <React.Fragment>
                <Navbar/>
                <div className="gameinfo-container center white-text">
                    <div className="container">
                        <h1>{this.state.article.attributes.title}</h1>
                        <img src={LINK+this.state.article.attributes.icon.data.attributes.url}/>
                        <h2 className="left-align">{this.state.article.attributes.main_text}</h2>
                        <p className="left-align content">{this.state.article.attributes.text}</p>
                        <p>Article wrote by {this.state.article.attributes.author}</p>
                        <p>Posted on {this.state.article.attributes.publish}</p>
                    </div>
                </div>
                <Footer />
            </React.Fragment>
        )
    }
}

export default ArticleInfo;