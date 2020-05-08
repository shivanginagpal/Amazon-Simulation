import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';
import axios from "axios";
import { getID } from "../SignUp/helperApis";
import SellerStatistics from "./SellerStatistics";
import MonthlySalesAmount from "./MonthlySalesAmount";
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
                            <br />
                            <SellerStatistics/>
                        </div>
                    </div>
                
                
                <div className="container">
                    <div className="row mt-4">
                        <div className="card card-custom mx-4 mb-5" style={{ boxShadow: "2px 2px 2px #888888", "height": "18em", "width": "30em" }}>
                            <div className="card-body" >
                                <MonthlySalesAmount />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
