import React from 'react';
import '../App.css';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import CreatorFrame from '../components/CreatorFrame';

class AboutUs extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            creators: props.state.creators,
            loaded: props.state.loaded
        }
    }

    render(){
        return(
            <React.Fragment>
                <Navbar/>
                <div className="container-games">
                    <h2 className="flow-text center">The Team</h2>
                    <div className="gamepages-container row">
                        {this.state.creators && this.state.creators.data.map((creator,i) => <CreatorFrame key={i} creator={creator}/>)}
                    </div>
                </div>
                <Footer />
            </React.Fragment>
        )
    }
}

export default AboutUs;