import React, {Component} from 'react';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import MaterialIcon, {colorPalette} from 'material-icons-react';
import { Button, Modal, Row, Col, Dropdown, Divider, Icon, SideNav, SideNavItem } from 'react-materialize';
import {Link} from 'react-router-dom';

import Logo from '../img/Logo_Title.png';
import WhiteLogo from '../img/White_Logo.png';
import Login from './modals/login';
import Register from './modals/register';

class Navbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
            user: {},
            callback: props.callback || null,
        }

        this.DropdownHandler = this.DropdownHandler.bind(this);
        this.Logout = this.Logout.bind(this);
        this.LogedIn = this.LogedIn.bind(this);
    }

    componentDidMount(){
        var elems = document.querySelectorAll('.sidenav');
        M.Sidenav.init(elems, {});
        
        var data = localStorage.getItem('user');
        this.setState({
            user : JSON.parse(localStorage.getItem('user'))
        });
    }

    handleSearchChange(event){
        let text = event.target.value;
        //changing state
        let stateCopy = JSON.parse(JSON.stringify(this.state));
        stateCopy.search = text;
        this.setState(stateCopy);
        
        if (this.state.callback){
            this.state.callback(text);
        };
    }

    LogedIn(){
        var data = localStorage.getItem('user');
        this.setState({
            user : JSON.parse(localStorage.getItem('user'))
        });
    }

    Logout(){
        localStorage.removeItem('user');
        this.setState({
            user : {}
        })
    }

    DropdownHandler(props){
        if(props.isLoggedIn){
            return(
                <>
                    <a onClick={this.Logout}>Log Out</a>
                    <Link className="link" to={`/order`}>Previous Order</Link>
                </>
            )
        }else{
            return(
                <>
                    <Register callback={this.LogedIn} button={<a>Register</a>}/>
                    <Login callback={this.LogedIn} button={<a>Log In</a>}/>
                </>
            )
        }
    }

    render(){
        return (
            <>
                <nav className="navup">
                    <div className="nav-wrapper">
                    <Link className="left hide-on-med-and-down" to="/"><img className="responsive-img" src={WhiteLogo}/></Link>
                    <ul className="hide-on-med-and-down">
                        <li className="center"><Link to="/">Shop</Link></li>
                        <li className="center"><Link to="/about-us">About Us</Link></li>
                    </ul>
                    <Link className="brand-logo center" to="/"><img className="responsive-img" src={Logo}/></Link>
                    <a href="#" data-target="mobile-demo" className="sidenav-trigger"><MaterialIcon className="material-icons" icon="menu"/></a>
                    <ul className="hide-on-med-and-down right">
                        <li className="center"><Link to="/basket">Basket</Link></li>
                        <li className="center profile">
                            <Dropdown id="profile_dropdown" trigger={<a>Profile</a>} >
                                <this.DropdownHandler isLoggedIn={this.state.user && this.state.user.Bearer} />
                            </Dropdown>
                        </li>
                    </ul>
                    </div>
                </nav>
                <nav className="navdown">
                    <div className="nav-wrapper">
                    {this.props.callback && <div className="searchbar white valign-wrapper">
                        <div className="search-icon"><MaterialIcon icon="search"/></div>
                        <input className="search-input" placeholder="Search..." value={this.state.search} onChange={(event) => this.handleSearchChange(event)}></input>
                    </div>}
                    <ul className="hide-on-med-and-down">
                        <li className="center"><Link to="/">Home</Link></li>
                        <li className="center"><Link to="/games">Games</Link></li>
                        <li className="center"><Link to="/articles">Articles</Link></li>
                    </ul>
                    </div>
                </nav>
        
                <ul className="sidenav" id="mobile-demo">
                <li className="center"><Link to="/">Shop</Link></li>
                <li className="center"><Link to="/about-us">About Us</Link></li>
                <li className="center"><Link to="/games">Games</Link></li>
                <li className="center"><Link to="/articles">Articles</Link></li>
                </ul>
            </>
        )
    }
}

export default Navbar;