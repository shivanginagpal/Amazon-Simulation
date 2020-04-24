import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';
import './seller.css';

export default class sellerHome extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <br />
             
               
                    <div class="col-xs-12">
                        <div class="text-right" style={{"width":'99.6%', "padding":'0 10px'}}>
                            <Link to={{ pathname: '/addProduct' }}><button class="btn btn-warning my-2 my-sm-0" >Add New Product</button></Link>
                        </div>
                    </div>
            
                "Welcome to seller Home"
            </div>
        )
    }
}
