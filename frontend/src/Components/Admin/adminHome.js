import React, { Component } from 'react';
import Navbar from './adminNavbar';
import NoOfOrdersPerDay from './NoOfOrdersPerDay';
import Top5SoldProducts from './Top5SoldProducts';
import OrderStatusAdminGraph from './OrderStatusAdminGraph';
import Top5Customers from './Top5Customers';
import Top5Sellers from './Top5Sellers';
import Top10ProductsRating from './Top10ProductsRating';
 class adminHome extends Component {
    render() {
        return (
            <div className="main-wrapper">
                <Navbar />
                <div className="content-wrapper">
                    <div className="dash-one">
                        <p className="dash-header">Admin Dashboard</p>
                    </div>
                    <div className='rowC' style={{ display: "flex", flexDirection: "row" }}>

                        <div className="container">
                            <div className="row mt-8">
                                <div className="card card-custom mx-4 mb-5" style={{ boxShadow: "2px 2px 2px #888888", "height": "28em", "width": "30em" }}>

                                    <div className="card-body" style={{"height":"28em", "width":"30em"}} >
                                        <NoOfOrdersPerDay />
                                    </div>
                                </div>

                                <div className="card card-custom mx-4 mb-5" style={{ boxShadow: "2px 2px 2px #888888", "height": "28em", "width": "30em" }}>

                                    <div className="card-body" >
                                        <Top5SoldProducts />
                                    </div>
                                </div>

                                <div className="card card-custom mx-4 mb-5" style={{ boxShadow: "2px 2px 2px #888888", "height": "18em", "width": "30em" }}>
                                    <div className="card-body" >
                                        <OrderStatusAdminGraph />
                                    </div>
                                </div>

                                <div className="card card-custom mx-4 mb-5" style={{ boxShadow: "2px 2px 2px #888888", "height": "18em", "width": "30em" }}>
                                    <div className="card-body" >
                                        <Top5Customers />
                                    </div>
                                </div>

                                <div className="card card-custom mx-4 mb-5" style={{ boxShadow: "2px 2px 2px #888888", "height": "18em", "width": "30em" }}>
                                    <div className="card-body" >
                                        <Top5Sellers />
                                    </div>
                                </div>

                                <div className="card card-custom mx-4 mb-5" style={{ boxShadow: "2px 2px 2px #888888", "height": "18em", "width": "30em" }}>
                                    <div className="card-body" >
                                        <Top10ProductsRating />
                                    </div>
                                </div>
                               
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default adminHome;
