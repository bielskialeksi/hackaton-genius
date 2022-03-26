import React from 'react';
import ApiUtilities from '../api/ApiUtilities.js';

import '../App.css';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ArticleFrame from '../components/ArticleFrame';
import Loader from '../components/Loader.js';

class Articles extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
            articles: {},
            loaded: false
        }
    }

    async componentDidMount(){
        const articles = await ApiUtilities.getArticle();
        this.setState({articles: articles, loaded: true});
    }

    handleChange = (text) => {
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.search = text
        this.setState(stateCopy)
    }

    render(){
        if (this.state.loaded === false){
            return (
                <Loader/>
            )
        }

        const showArticles= this.state.articles.data.filter(
            (article,key)=>article.attributes.title.toLowerCase().includes(this.state.search.toLowerCase())
        )
        
        return(
            <>
                <Navbar callback={this.handleChange}/>
                <div className="container-articles">
                    <h2 className="flow-text">Articles</h2>
                    <div className="gamepages-container row">
                        {this.state.articles && showArticles.map((article,i) => <ArticleFrame key={i} article={article}/>)}
                    </div>
                </div>
                <Footer />
            </>
        )
    }
}

export default Articles;