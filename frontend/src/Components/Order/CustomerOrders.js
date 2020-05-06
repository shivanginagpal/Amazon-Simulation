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
            //alert("UI INSIDE IF"+JSON.stringify(this.state.orders))
            ordersResult = this.state.orders.map((item,key)=>
                <div className="row">
                    <div className="col-md">
                        <div style={{fontWeight: "bold", textAlign: "left"}}>
                            Order Number : {item._id}<br/>
                            Ordered Date : {item.orderDate.slice(0,10)}<br/>
                            Order Status : {item.orderStatus}
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