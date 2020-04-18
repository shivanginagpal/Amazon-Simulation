import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import Navbar from './Navbar';
import Slideshow from './slideshow';
import './LandingPage.css';

class LandingPage extends Component {
    render(){

        return (
            <div>
                <Navbar/>
                <br/>
                <br/>
                <div>
                    <Slideshow/>
                </div>
            </div>
        );
    }
}

export default LandingPage;