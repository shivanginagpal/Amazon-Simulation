import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { connect } from 'react-redux';
import {getOrder} from '../../actions/orderAction';


class OrderSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id : "",
            order: {}
        };    
    }

    componentDidMount(){
        this.setState({...this.state, id : this.props.match.params.id });
        this.props.getOrder(this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            ...this.state,
            order : !nextProps.orderDetails ? this.state.order : nextProps.orderDetails
          }
         );
    }

    render() {
        let orderResult = "";
        if(Object.keys(this.state.order).length !== 0){
            orderResult = this.state.order.data.products.map((item,key)=>
                <div class="card" style={{width: "60rem", "backgroundColor" : "#ffff"}}>
                    <div class="card-body">
                        <div className="row">
                            <div className="col-md" id= "movecenter" style={{fontWeight: "bold"}}>
                                {item.productName}
                            </div>
                            <div className="col-md" id= "movecenter">
                                Quantity : {item.productQuantity}
                            </div>
                            <div className="col-md" id= "movecenter">
                                Product Price : ${item.productPrice}
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
                <div className="container" id= "movecenter">
                    <div className="row">
                        <div className="col-md-12" >
                            <h3 style={{color: "#0D865D", fontWeight: "bold"}}>ORDER SUMMARY</h3><br/>
                            
                            <br/>
                            <div className="row" >
                                <div className="col-sm" style={{fontWeight: "bold", fontSize: "16px"}} id="movecenter">
                                Order Number : {this.state.order.data && this.state.order.data._id}<br/>
                                <br/>
                                </div>
                                <div className="col-sm" style={{fontWeight: "bold", fontSize: "16px"}} id="movecenter">
                                    Ordered Date : {this.state.order.data && this.state.order.data.orderDate.slice(0,10)}
                                
                                </div>
                            </div>
                            <div className="row panel panel-body border-bottom border-dark">
                                <div className="col-sm" style={{ fontWeight: "bold", fontSize: "16px"}}>
                                    <span style={{paddingRight: "($spacer * .5)"}}></span>
                                </div>
                            </div><br/><br/>
                            <div className="row panel panel-body border-bottom border-dark">
                                <div className="col-sm" style={{ fontWeight: "bold", fontSize: "16px"}}>
                                    <span style={{paddingRight: "($spacer * .5)"}}>Order Status : {this.state.order.data && this.state.order.data.orderStatus}</span>
                                </div><br/><br/>
                            </div><br/><br/>
                            <div className="row panel panel-body border-bottom border-dark">
                                <div className="col-sm" style={{ fontWeight: "bold", fontSize: "16px"}}>
                                    <span style={{paddingRight: "($spacer * .5)"}}>Delivery Address: {this.state.order.data && this.state.order.data.deliveryAddress} </span>
                                </div><br/><br/>
                            </div><br/><br/>
                            <div className="row panel panel-body border-bottom border-dark">
                                <div className="col-sm" style={{fontWeight: "bold", fontSize: "16px"}}>
                                    <span style={{paddingRight: "($spacer * .5)"}}>Payment Method: {this.state.order.data && this.state.order.data.paymentInfo}</span>
                                </div><br/><br/>
                            </div><br/><br/>
                                
                                
                                
                            <div>{orderResult}</div>
                            <div style={{color: "#DC143C", fontWeight: "bold", textAlign: "right"}}>
                                Total Price : ${this.state.order.data && this.state.order.data.totalAmount}
                            </div>
                            

                        </div>
                    </div>

                </div>
                
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        orderDetails: state.orderReducer.orderDetails
    }
}

function mapDispatchToProps (dispatch)
{
    return {
        getOrder: data => dispatch(getOrder(data)),
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary);