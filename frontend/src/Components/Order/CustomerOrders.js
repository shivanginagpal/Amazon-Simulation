import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { connect } from 'react-redux';
import {getMyOrders} from '../../actions/orderAction';


class CustomerOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: null
        };    
    }

    componentDidMount(){
        this.props.getMyOrders();
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            ...this.state,
            orders : !nextProps.allOrders ? this.state.orders : nextProps.allOrders
          }
         );
    }

    render() {
        let ordersResult ="";
       
        if(this.state.orders){
            ordersResult = this.state.orders.filter(item => 
                Object.keys(item).some(key => !item['orderStatus'].includes('CANCELLED') && !item['orderStatus'].includes('DELIVERED'))).map((item,key)=>
            <div class="card" style={{width: "60rem", "backgroundColor" : "#ffff"}}>
                <div class="card-body" >
                    <div className="row">
                        <div className="col-md">
                            <div className="row">
                                <Link to={{pathname: "/viewOrder/"+item._id}}>
                                    <div className="col-md"  id= "movecenter" style={{fontWeight: "bold"}}>
                                        Order Number : {item._id} <br/>
                                    </div>
                                </Link>
                                <div className="col-md" id= "movecenter" >
                                    Ordered Date : {item.orderDate.slice(0,10)}<br/>
                                </div>
                                <div className="col-md"id= "movecenter" >
                                    Order Status : {item.orderStatus}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            );
        }
        return (
            <div>
                <Navbar />
                <br />
                <br />
                <Link to={{pathname: "/cancelledOrders"}} ><h6 style={{color : "#DC143C", fontWeight: "bold", textAlign: "right", marginRight: "30px"}}>Cancelled Orders</h6></Link>
                <div className="container" id= "movecenter">
                    <div className="row">
                        <div className="col-md-12" >
                            <h3 style={{fontWeight: "bold"}}>YOUR ORDERS</h3>
                            <br/>
                            {ordersResult}
                            
                        </div>
                    </div>

                </div>
                
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        allOrders: state.orderReducer.allCustomerOrders
    }
}

function mapDispatchToProps (dispatch)
{
    return {
        getMyOrders: data => dispatch(getMyOrders(data)),
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(CustomerOrders);