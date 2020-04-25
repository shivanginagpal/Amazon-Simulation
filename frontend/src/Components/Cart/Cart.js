import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { connect } from 'react-redux';

class Cart extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    render() {
        
        return (
            <div>
                <Navbar />
                <br />
                <br />
                <h3>Shopping Cart!</h3>
                
            </div>
        );
    }
}

export default Cart;