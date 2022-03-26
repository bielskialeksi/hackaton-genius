import React, {Component} from 'react';

import 'materialize-css/dist/css/materialize.min.css';
import {Link} from 'react-router-dom';

import logo from '../img/Logo_Title.png';
import InstaLogo from '../img/instagram.png';
import LinkedinLogo from '../img/linkedin.png';
import TwitterLogo from '../img/twitter.png';
import FbLogo from '../img/facebook.png';

class Footer extends React.Component {

    render(){
        return (
            <React.Fragment>
                <footer className="page-footer">
                    <div className="container center">
                        <div className="row">
                            <div className="col l4 s12">
                                <ul>
                                <li className="is-footer"><a className="grey-text text-lighten-3" href="#">Legal Notice</a></li>
                                <li className="is-footer"><p className="grey-text text-lighten-3" href="#">Contact Us</p></li>
                                <li><p href="#!" className="color">(+33)6 00 00 00 00</p></li>
                                <li><p href="#!" className="color">contact@fireball.com</p></li>
                                </ul>
                            </div>
                            <div className="col l4 s12">
                                <img className="responsive-img" src={logo} />
                                <ul>
                                <li className="is-footer color"><Link to="/">Home</Link></li>
                                <li className="is-footer color"><Link to="/games">Games</Link></li>
                                <li className="is-footer color"><Link to="/articles">Articles</Link></li>
                                </ul>
                                <div className="social-network">
                                    <a href="#"><img src={InstaLogo}/></a>
                                    <a href="#"><img src={LinkedinLogo}/></a>
                                    <a href="#"><img src={TwitterLogo}/></a>
                                    <a href="#"><img src={FbLogo}/></a>
                                </div>
                            </div>
                            <div className="col l4 s12">
                                <ul>
                                <li className="is-footer"><a className="grey-text text-lighten-3" href="https://en.wikipedia.org/wiki/Terms_of_service" target="_blank" rel="nofollow">Terms of Service</a></li>
                                <li className="is-footer"><a className="grey-text text-lighten-3" href="https://en.wikipedia.org/wiki/Privacy_policy" target="_blank" rel="nofollow">Privacy Policy</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="footer-copyright">
                        <div className="container center">
                        © 2022 Fireball. All rights reserved
                        </div>
                    </div>
                </footer>
            </React.Fragment>
        )
    }
}

export default Footer;