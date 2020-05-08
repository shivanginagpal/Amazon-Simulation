import React, { Component } from 'react';
import Navbar from './adminNavbar';
import NoOfOrdersPerDay from './NoOfOrdersPerDay';
import Top5SoldProducts from './Top5SoldProducts';
import OrderStatusAdminGraph from './OrderStatusAdminGraph';
import Top5Customers from './Top5Customers';
import Top5Sellers from './Top5Sellers';
import Top10ProductsRating from './Top10ProductsRating';
import Top10ProductsViewed from './Top10ProductsViewed';

 class adminHome extends Component {
    render() {
        return (
            <div className="main-wrapper">
                <Navbar />
                <div className="content-wrapper">
                    <div className="dash-one">
                        <h3 className="display-4">Admin Dashboard</h3>
                    </div>
                    {/* <div className='rowC' style={{ display: "flex", flexDirection: "row" }}> */}

                        {/* <div className="container"> */}
                            <div className="row mt-8">
                            <div className="card card-custom mx-4 mb-5" style={{ boxShadow: "2px 2px 2px #888888", "height": "30em", "width": "55em" }}>

                                    <div className="card-body" style={{"height":"30em", "width":"55em"}} >
                                        <NoOfOrdersPerDay />
                                    </div>
                                </div>

                            <div className="card card-custom mx-4 mb-5" style={{ boxShadow: "2px 2px 2px #888888", "height": "30em", "width": "55em" }}>

                                <div className="card-body" style={{ "height": "30em", "width": "55em" }}>
                                        <Top5SoldProducts />
                                    </div>
                                </div>

                                <div className="card card-custom mx-4 mb-5" style={{ boxShadow: "2px 2px 2px #888888", "height": "30em", "width": "55em" }}>

                                <div className="card-body" style={{ "height": "30em", "width": "55em" }} >
                                        <Top10ProductsViewed />
                                    </div>
                                </div>

                                <div className="card card-custom mx-4 mb-5" style={{ boxShadow: "2px 2px 2px #888888", "height": "30em", "width": "55em" }}>
                                <div className="card-body" style={{ "height": "30em", "width": "55em" }}>
                                <Top10ProductsRating />
                                    </div>
                                </div>

                                <div className="card card-custom mx-4 mb-5" style={{ boxShadow: "2px 2px 2px #888888", "height": "30em", "width": "55em" }}>
                                <div className="card-body" style={{ "height": "30em", "width": "55em" }} >
                                        <Top5Customers />
                                    </div>
                                </div>

                                <div className="card card-custom mx-4 mb-5" style={{ boxShadow: "2px 2px 2px #888888", "height": "30em", "width": "55em" }}>
                                <div className="card-body" style={{ "height": "30em", "width": "55em" }}>
                                        <Top5Sellers />
                                    </div>
                                </div>

                                <div className="card card-custom mx-4 mb-5" style={{ boxShadow: "2px 2px 2px #888888", "height": "30em", "width": "55em" }}>
                                <div className="card-body" style={{ "height": "30em", "width": "55em" }} >
                                        
                                <OrderStatusAdminGraph />
                                    </div>
                                </div>
                               
                                
                            </div>
                        {/* </div> */}
                    {/* </div> */}
                </div>
            </div>
        )
    }
}
export default adminHome;
