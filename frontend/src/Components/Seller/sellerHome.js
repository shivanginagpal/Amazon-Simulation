import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';
import SellerStatistics from "./SellerStatistics";
import MonthlySalesAmount from "./MonthlySalesAmount";
import './seller.css';


export default class sellerHome extends Component {


    render() {
        return (
            <div>
                <Navbar />
                <div className="display-4">Seller Statistics</div>
                <br />
                <div class="col-xs-12">
                        <div class="text-right" style={{"width":'99.6%', "padding":'0 10px'}}>
                            <Link to={{ pathname: '/addProduct' }}><button class="btn btn-warning my-2 my-sm-0" >Add New Product</button></Link>

                            <br />
                            
                        </div>
                    </div>
                <SellerStatistics />
                <div className="container">
                    <div className="row mt-4">
                        <div className="card card-custom mx-4 mb-5" style={{ boxShadow: "2px 2px 2px #888888", "height": "30em", "width": "55em" }}>
                            <div className="card-body" style={{"height":"30em", "width":"55em"}}>
                                <MonthlySalesAmount />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
