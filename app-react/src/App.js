import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';

//website views
import Home from './views/Home.js'
import Games from './views/Games.js'
import GameInfo from './views/GameInfo.js'
import ArticleInfo from './views/ArticleInfo.js'
import Articles from './views/Articles.js'
import AboutUs from './views/AboutUs.js'
import Loader from './components/Loader';
import Basket from './views/Basket.js'
import Order from './views/Order.js'

import 'materialize-css/dist/css/materialize.min.css';
import { Component } from 'react';
import ApiUtilities from './api/ApiUtilities.js';
import { Footer, Navbar } from 'react-materialize';

class App extends Component{
  constructor(props){
    super(props);
    this.state= {
       creators: [],
       categories: [],
       loaded: false
    }
  }

  async componentDidMount () {
    //loading every stuff needed to start the website 
    const creators = await ApiUtilities.getCreator();
    const categories = await ApiUtilities.getCategories();
    const discover = await ApiUtilities.getDiscover();
    const discoverArticles = await ApiUtilities.getDiscoverArticles();

    this.setState({
      creators: creators,
      categories: categories,
      discover: discover,
      discoverArticles: discoverArticles,
      loaded: true
    })
  }

  render(){
    //website hasn't loaded yet, starting loading screen
    if (this.state.loaded == false){
      return (
        <>
            <Navbar/>
            <Loader/>
            <Footer/>
        </>
      )
    }

    //starting main router
    return (

      //comment
      <Router>
        <Routes>
          <Route exact path='/' element={<Home state={this.state}/>} />
          <Route exact path='/about-us' element={<AboutUs state={this.state}/>} />
          <Route exact path='/games' element={<Games state={this.state}/>} />
          <Route exact path='/articles' element={<Articles state={this.state}/>} />
          <Route exact path='/gameinfo/:id' element={<GameInfo state={this.state}/>} />
          <Route exact path='/articleinfo/:id' element={<ArticleInfo state={this.state}/>} />
          <Route exact path='/games' element={<Games state={this.state}/>} />
          <Route exact path='/games/:filter' element={<Games state={this.state}/>} />
          <Route exact path='/basket' element={<Basket state={this.state}/>} />
          <Route exact path='/order' element={<Order state={this.state}/>} />
        </Routes>
      </Router>
    )
  }
}

export default App;
