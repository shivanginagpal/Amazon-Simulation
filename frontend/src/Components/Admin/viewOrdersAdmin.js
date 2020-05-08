import React, { Component } from 'react';
import Navbar from './adminNavbar';
import axios from "axios";
import swal from 'sweetalert';

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
     
     handleStatusChange = (status, orderid, productId) => {
         const data ={
             id:orderid,
             productId:productId,
             status:status
         }
         console.log("IN HANDLE STATUS CHANGE", data);
        
         this.setState({
             id: orderid,
             productId: productId,
             status: status
         })
         axios.post('/orderStatusChangeAdmin',data)
         .then((response) => {
             if(response.status === 200){
                 swal({
                     title: "Changed!",
                     text: "You Successfully changed order status!",
                     icon: "success",
                     button: "OK"
                 }).then(() => {
                     window.location.reload();
                 }).catch(error => console.log(error.response.data));
             }
         }).catch(error => {console.log(error)});
     }
    render() {
        
        let orderdetails = this.state.orders.map(order => {
            // console.log("THIS IS ORDER",order);
            // order.customerName.toUpperCase().includes(this.state.searchString.toUpperCase()) ||
            //     order.products.productName.toUpperCase().includes(this.state.searchString.toUpperCase()) ||
            let str = order.orderDate;
            let date = str.substring(0, str.indexOf('T'));
            if(order.products.productOrderStatus.toUpperCase().includes(this.state.searchString.toUpperCase()) ||
   
            order.products.productSellerName.toUpperCase().includes(this.state.searchString.toUpperCase())
            ){
                return(
                    <tr>
                        <td>{order.products.productSellerName}</td>
                        
                        <td>{order.products.productName}</td>
                        <td>{order.customerName}</td>
                        <td>{date}</td>
                        <td>
                            <button class="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {order.products.productOrderStatus} </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <button onClick={() => this.handleStatusChange("PACKAGE_ARRIVED", order._id, order.products.productId)} class="dropdown-item" >Package arrived</button>
                                <button onClick={() => this.handleStatusChange("OUT_FOR_DELIVERY", order._id, order.products.productId)} class="dropdown-item" >Out for Delivery</button>
                                <button onClick={() => this.handleStatusChange("DELIVERED", order._id, order.products.productId)} class="dropdown-item" >Delivered</button>
                            </div>
                        </td>
                    </tr>
                )
            }
        })
        return (
            <div>
                <Navbar/>
                <div className="container" >
                    <div className="dash-one">
                        <div className="display-4">Orders</div>
                        <nav class="navbar navbar-light bg-light" id="viewsellersearch">
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
                            
                                {this.state.orders.length > 0 ? (
                                    <div className="col-10">
                                        <table className="table table-striped table-bordered lead">
                                            <thead>
                                                <tr>
                                                    <th>Seller Name</th>
                                                    <th>Product Name</th>
                                                    <th>Customer Name</th>
                                                    <th>Order Date</th>
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