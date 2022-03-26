import React from 'react';
import {Link} from 'react-router-dom';

import ApiUtilities from '../api/ApiUtilities.js';

import '../App.css';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Loader from '../components/Loader';

import M from 'materialize-css';
import { Carousel } from 'react-materialize';

const LINK = "http://localhost:1337";

class GameInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            game: null,
            id: null,
            loaded: false
        }

        this.addToBasket = this.addToBasket.bind(this);
        this.buyGame = this.buyGame.bind(this);
    }

    async componentDidMount(){
        const id = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
        const game = await ApiUtilities.getGames(id)

        this.setState({game: game.data, loaded: true, id: parseInt(id)})

        var elems = document.querySelectorAll('.carousel');
        var instances = M.Carousel.init(elems, {});
    }

    buyGame(){
        this.addToBasket()
    }

    addToBasket(event){
        var existingEntries = JSON.parse(localStorage.getItem('basket')) || [];
        var item = existingEntries.find(item=>item.id === this.state.id);
        if (item){
            M.toast({html: 'Game is already in basked!'})
            return;
        }else{
            //new to basket
            existingEntries.push({
                id: this.state.id,
                amount: 1
            })
        }
        localStorage.setItem('basket', JSON.stringify(existingEntries));
        M.toast({html: 'Added game to basket!'})
    }

    render(){
        if (this.state.loaded === false){
            return (
                <>
                    <Navbar/>
                    <Loader/>
                    <Footer/>
                </>
            )
        }

        const images = [];
        const categories = [];

        //images handler
        for (const [key, value] of Object.entries(this.state.game.attributes.images.data)) {
            images.push(LINK+value.attributes.url)
        };

        //categories handler
        for (const [key, value] of Object.entries(this.state.game.attributes.categories.data)) {
            categories.push(value)
        };

        const currentPromotion = (this.state.game.attributes.price*(this.state.game.attributes.promotion/100)); 

        return(
            <>
                <Navbar/>
                <div className="gameinfo-container white-text">
                    <div className="row">
                    <h1>{this.state.game.attributes.title}</h1>
                        <div className="col right-part s12 m12 l8">
                            <Carousel
                                carouselId="Carousel-32"
                                images={images}
                                options={{
                                    fullWidth: true,
                                    indicators: true
                                }}
                            />
                            <h2>{this.state.game.attributes.main_description}</h2>
                            <p>Type</p>
                            {categories.map((category,i) => <Link key={i} to={`/games/${category.attributes.name}`} >{category.attributes.name}</Link>)}
                            <p>{this.state.game.attributes.description}</p>
                        </div>
                        <div className="col left-part s12 m12 l4">
                            <div className="center-align">
                                <img className="" src={LINK+this.state.game.attributes.icon.data.attributes.url} />
                            </div>
                            
                            <div className="container">
                                <p>{(this.state.game.attributes.price-currentPromotion).toFixed(2)}$</p>
                                <div><Link to="/basket" onClick={this.buyGame} className="purchase waves-effect waves-light btn-large">PURCHASE</Link></div>
                                <div><a onClick={this.addToBasket} className="add-basket waves-effect waves-light btn-large">ADD TO BASKET</a></div>
                                <div className="row">
                                    <div className="col border s12 m12 l12">
                                        <div className="col left s6 m6 l6"><p>Developper</p></div>
                                        <div className="col right s6 m6 l6"><p>{this.state.game.attributes.developer}</p></div>
                                    </div>
                                    <div className="col border s12 m12 l12">
                                        <div className="col left s6 m6 l6"><p>Editor</p></div>
                                        <div className="col right s6 m6 l6"><p>{this.state.game.attributes.editor}</p></div>
                                    </div>
                                    <div className="col border s12 m12 l12">
                                        <div className="col left s6 m6 l6"><p>Release date</p></div>
                                        <div className="col right s6 m6 l6"><p>{this.state.game.attributes.publishDate}</p></div>
                                    </div>
                                    <div className="col border s12 m12 l12">
                                        <div className="col left s6 m6 l6"><p>Platform</p></div>
                                        <div className="col right s6 m6 l6"><p>{this.state.game.attributes.platform}</p></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        )
    }
}

export default GameInfo;