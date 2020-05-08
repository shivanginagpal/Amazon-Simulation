import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { connect } from 'react-redux';
import {getSellerOrders} from '../../actions/orderAction';


class SellerOrdersOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: null
        };     
    }

    componentDidMount(){
        this.props.getSellerOrders();
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            ...this.state,
            orders : !nextProps.allOrders ? this.state.orders : nextProps.allOrders
          }
         );
    }

    render() {
        let openOrdersList = "";
        let deliveredOrdersList="";
        let cancelledOrdersList = "";
        //alert("ORDERS FETCHED "+JSON.stringify(this.state.orders));
        if(this.state.orders && Object.keys(this.state.orders).length !== 0){
            //alert("UI INSIDE IF"+JSON.stringify(this.state.orders))
            //
            cancelledOrdersList = this.state.orders.data.filter(item => 
                Object.keys(item).some(key => item['orderStatus'].includes('CANCELLED'))).map((item,key)=>
                <div class="card" style={{width: "20rem", "backgroundColor" : "#ffff"}}>
                   <Link to={{pathname: "/viewSoldOrder/"+item._id}} style={{ textDecoration: "none", color : "black"}}>
                        <div class="card-body" >
                            <div id= "movecenter" style={{fontWeight: "bold"}}>
                                Order Number : {item._id} <br/>
                            </div><br/>
                            <div id= "movecenter" >
                                Ordered Date : {item.orderDate.slice(0,10)}<br/>
                            </div><br/>
                            <div id= "movecenter" >
                                Order Status : {item.orderStatus}
                            </div><br/>

                        </div> 
                    </Link> 
                </div> 
            );

            deliveredOrdersList = this.state.orders.data.filter(item => 
                Object.keys(item).some(key => item['orderStatus'].includes('DELIVERED'))).map((item,key)=>
                <div class="card" style={{width: "20rem", "backgroundColor" : "#ffff"}}>
                    <Link to={{pathname: "/viewSoldOrder/"+item._id}} style={{ textDecoration: "none", color : "black" }}>
                        <div class="card-body" >
                            <div id= "movecenter" style={{fontWeight: "bold"}}>
                                Order Number : {item._id} <br/>
                            </div><br/>
                            <div id= "movecenter" >
                                Ordered Date : {item.orderDate.slice(0,10)}<br/>
                            </div><br/>
                            <div id= "movecenter" >
                                Order Status : {item.orderStatus}
                            </div><br/>
                        </div>  
                    </Link>
                </div> 
            );

            openOrdersList = this.state.orders.data.filter(item => 
                Object.keys(item).some(key => item['orderStatus'].includes('NEW'))).map((item,key)=>
                <div class="card" style={{width: "20rem", "backgroundColor" : "#ffff"}}>
                    <Link to={{pathname: "/viewSoldOrder/"+item._id}} style={{ textDecoration: "none", color : "black" }}>
                        <div class="card-body" >
                            <div id= "movecenter" style={{fontWeight: "bold"}}>
                                Order Number : {item._id} <br/>
                            </div><br/>
                            <div id= "movecenter" >
                                Ordered Date : {item.orderDate.slice(0,10)}<br/>
                            </div><br/>
                            <div id="movecenter">
                                {item.orderStatus!=="CANCELLED" && item.orderStatus!=="DELIVERED" && <button className="btn btn-danger btn-sm" >cancel</button>}
                            </div>
                        </div>  
                    </Link>
                </div> 
            );
        }

        return (
            <div>
                <Navbar />
                <br />
                <br />
                <div className="container">
                    <div className="row">
                        <div className="col-md" >
                            <h5 style={{fontWeight: "bold", textAlign: "center"}}>OPEN ORDERS</h5>              
                            {openOrdersList} 
                        </div>
                        <div className="col-md" >
                            <h5 style={{fontWeight: "bold", textAlign: "center"}}>DELIVERED ORDERS</h5>  
                            {deliveredOrdersList}                          
                        </div>
                        <div className="col-md" >
                            <h5 style={{fontWeight: "bold", textAlign: "center"}}>CANCELLED ORDERS</h5>    
                            {cancelledOrdersList}                      
                        </div>
                    </div>

                </div>
                
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        allOrders: state.orderReducer.allSellerOrders
    }
}

function mapDispatchToProps (dispatch)
{
    return {
        getSellerOrders: data => dispatch(getSellerOrders(data))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(SellerOrdersOptions);