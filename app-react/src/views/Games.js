import React from 'react';

import '../App.css';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import GameFrame from '../components/GameFrame';
import Checkbox from '../components/Checkbox';
import Loader from '../components/Loader';

import ApiUtilities from '../api/ApiUtilities.js';

class Games extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            games: {},
            search: '',
            filters: {
                categories: [],
                prices: {
                    min: 0,
                    max : 1000,

                    previous_min: 0,
                    previous_max: 0,
                }
            },
            loaded: false,
            urlCategory: '',
        }

        this.ShowFilters = this.ShowFilters.bind(this);
    }

    async componentDidMount(){
        const games = await ApiUtilities.getGames();
        this.setState({games: games, loaded: true});

        const filter = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
        if(filter!="games"&&filter!=""){
            this.setState({urlCategory: filter})
            this.handleCategory(filter, true);
        }
    }

    handleChange = (text) => {
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.search = text
        this.setState(stateCopy)
    }

    handleCategory = (name, state) => {
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        if(state){
            stateCopy.filters.categories.push(name)
        }else{
            const index = stateCopy.filters.categories.indexOf(name);
            if (index > -1) {
                stateCopy.filters.categories.splice(index, 1);
            }
        }
        this.setState(stateCopy)
    }

    handlePriceChange(type, event){
        let stateCopy = JSON.parse(JSON.stringify(this.state));

        let newValue = parseInt(event.target.value != NaN &&  event.target.value || 0);
        if(newValue === NaN){
            newValue = this.state.filters.prices['previous_'+type];
        }
        stateCopy.filters.prices[type] = newValue
        stateCopy.filters.prices['previous_'+type] = newValue
        this.setState(stateCopy)
    }

    ShowFilters(){
        const filter = this.state.urlCategory;
        if(filter!="games" && filter!=''){return(<div className="col s6 m1 l1"></div>);}

        return(
            <div className="hide-on-med-and-down filters col s6 m2 l2">
                <div className="input-field col s12">
                    <input value={this.state.filters.prices.min} placeholder="min" id="first_name" type="text" className="validate white-text" onChange={(event) => this.handlePriceChange('min', event)}/>
                    <label className="active" htmlFor="first_name">Minimum Price</label>
                </div>
                <div className="input-field col s12">
                    <input value={this.state.filters.prices.max} placeholder="max" id="last_name" type="text" className="validate white-text" onChange={(event) => this.handlePriceChange('max', event)} />
                    <label className="active" htmlFor="last_name">Maximum Price</label>
                </div>
                <form className="check-box" action="#">
                    {this.props.state.categories && this.props.state.categories.data.map((category,i) => <Checkbox key={i} callback={this.handleCategory} data={category}/>)}
                </form>
            </div>
        )
    }

    render(){
        if (this.state.loaded == false){
            return (
                <Loader/>
            )
        }
        const showGames = this.state.games.data.filter(
            (game,key)=>game.attributes.title.toLowerCase().includes(this.state.search.toLowerCase())
        )
        for (const [key, value] of Object.entries(showGames)) {
            //price checking
            const currentPromotion = value.attributes.promotion > 0 && value.attributes.price - (value.attributes.price*(value.attributes.promotion/100)) || value.attributes.price; 
            if(currentPromotion < this.state.filters.prices.min || currentPromotion > this.state.filters.prices.max){
                delete showGames[key];
                continue;
            }

            //categories checking
            if(!value.attributes.categories || this.state.filters.categories.length === 0){continue};
            
            let hasCategory = true;
            for (const [_, checkedCategory] of Object.entries(this.state.filters.categories)) {
                let hasFound = false
                for (const [_, category] of Object.entries(value.attributes.categories.data)) {
                    if(category.attributes.name === checkedCategory){
                        hasFound = true
                    }
                }
                if(!hasFound){
                    hasCategory = false;
                    break;
                }
            }
            if(!hasCategory){
                delete showGames[key];
            }
        }
        return(
            <>
                <Navbar callback={this.handleChange}/>
                <div className="row games-row">
                    <this.ShowFilters/>
                    <div className="container-games col s12 m10 l10">
                        <h2 className="flow-text">{`${this.state.urlCategory} Games`}</h2>
                        {this.state.games && showGames.map((game,i) => <GameFrame key={i} game={game}/>)}
                    </div>
                </div>
                <Footer />
            </>
        )
    }
}

export default Games;