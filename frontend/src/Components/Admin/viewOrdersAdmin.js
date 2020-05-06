import React, { Component } from 'react';
import Navbar from './adminNavbar';
import axios from "axios";

 class viewOrdersAdmin extends Component {
     constructor() {
         super();
         this.state = {
             orders: [],
             status: null,
             searchString: ""
         };
         this.searchChangeHandler = this.searchChangeHandler.bind(this);
     }
     searchChangeHandler(e) {
         this.setState({ searchString: e.target.value });
     }
     componentDidMount() {
         axios("/getAdminViewOrders", {
             method: "get"
         }).then(response => {
             this.setState({
                 orders: this.state.orders.concat(response.data)
             })
             console.log(this.state.orders);
         });
     }
     
     handleStatusChange = (status, orderid) => {

     }
    render() {
        
        let orderdetails = this.state.orders.map(order => {
            if(order){
                return(
                    <tr>
                        <td>{order._id}</td>
                        <td>
                            <button class="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {order.orderStatus} </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <button onClick={() => this.handleStatusChange("ongoing", order._id)} class="dropdown-item" >Package arrived</button>
                                <button onClick={() => this.handleStatusChange("Completed", order._id)} class="dropdown-item" >Out for Delivery</button>
                                <button onClick={() => this.handleStatusChange("Completed", order._id)} class="dropdown-item" >Delivered</button>
                            </div>
                        </td>
                    </tr>

                )
            }
        })
        return (
            <div>
                <Navbar/>
                <div className="container" id="viewSellerList">
                    <nav class="navbar navbar-light bg-light">
                        <form class="form-inline">
                            <input
                                class="form-control mr-sm-2"
                                type="search"
                                onChange={this.searchChangeHandler}
                                value={this.state.searchString}
                                placeholder="Search"
                                aria-label="Search"
                            />

                        </form>
                    </nav>
                    <div className="row justify-content-center align-items-center">
                        <div className="col-12">
                            <div className="dash-one">
                                <div className="dash-header">Orders</div>
                                {this.state.orders.length > 0 ? (
                                    <div className="col-10">
                                        <table className="table table-striped table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>Seller Name</th>
                                                    <th>Order Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>{orderdetails}</tbody>
                                        </table>
                                    </div>
                                ) : (
                                        <div>
                                            <h4 style={{ margin: "3em" }}>No orders to display!</h4>
                                        </div>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default viewOrdersAdmin;