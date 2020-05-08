import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { connect } from 'react-redux';
import {getOrder, deleteOrderItem, deleteOrder} from '../../actions/orderAction';


class OrderView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id : "",
            order: {}
        };    
        this.cancelProduct=this.cancelProduct.bind(this);
        this.cancelOrder=this.cancelOrder.bind(this);
    }

    cancelProduct = item => event =>{
        event.preventDefault();
        let payload = {
            "itemId" : this.state.order.data._id,
            "productId" : item._id
        }
        this.props.deleteOrderItem(payload)
    }
    
    cancelOrder = (event) => {
        event.preventDefault();
        this.props.deleteOrder(this.state.order.data._id)
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
        let cancelFlag = false;
        let somevar = "";
        let orderResult = "";
        if(Object.keys(this.state.order).length !== 0){
            somevar = this.state.order.data.products.map((prdct,prdctkey)=>
                {
                    cancelFlag = (prdct.productOrderStatus==="DELIVERED") ? true : cancelFlag;
                }
            );
            orderResult = this.state.order.data.products.map((item,key)=>
                <div class="card" style={{width: "60rem", "backgroundColor" : "#ffff"}}>
                    <div class="card-body">
                        <div className="row">
                            <Link to={{pathname: "/productPage/"+item.productId}}>
                            <div className="col-md" id= "movecenter" style={{fontWeight: "bold"}}>
                                {item.productName}
                            </div>
                            </Link>
                            <div className="col-md" id= "movecenter">
                                Delivery Status : {item.productOrderStatus}
                                <i class="a-icon a-icon-text-separator sc-action-separator" role="img" aria-label="|"></i>
                                {item.productOrderStatus!=="DELIVERED" && item.productOrderStatus!=="CANCELLED" && ( <a href="#" onClick={this.cancelProduct(item)}>Cancel</a>  )}
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
                            <h3 style={{color: "#0D865D", fontWeight: "bold"}}>ORDER DETAILS</h3><br/>
                            
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
                                <div className="col-sm">
                                    <span style={{fontWeight: "bold", fontSize: "16px", paddingRight: "($spacer * .5)"}}>Order Status : </span>
                                    <span>{this.state.order.data && this.state.order.data.orderStatus}</span>
                                    <i class="a-icon a-icon-text-separator sc-action-separator" role="img" aria-label="|"></i>
                                    {this.state.order.data && this.state.order.data.orderStatus!=="DELIVERED" && this.state.order.data.orderStatus!=="CANCELLED" && !cancelFlag && ( <a href="#" onClick={this.cancelOrder}>Cancel Order</a>  )}
                                </div><br/><br/>
                            </div><br/><br/>
                            <div className="row panel panel-body border-bottom border-dark">
                                <div className="col-sm" >
                                    <span style={{fontWeight: "bold", fontSize: "16px", paddingRight: "($spacer * .5)"}}>Delivery Address:  </span>
                                    <span>{this.state.order.data && this.state.order.data.deliveryAddress}</span>
                                </div><br/><br/>
                            </div><br/><br/>
                            <div className="row panel panel-body border-bottom border-dark">
                                <div className="col-sm">
                                    <span style={{fontWeight: "bold", fontSize: "16px", paddingRight: "($spacer * .5)"}}>Payment Method: </span>
                                    <span>{this.state.order.data && this.state.order.data.paymentInfo}</span>
                                </div><br/><br/>
                            </div><br/><br/>
  
                            <div>{orderResult}</div>
                            <div className="row">
                                <div className="col-sm">
                                    <div style={{fontWeight: "bold", textAlign: "right"}}>
                                        SubTotal : ${this.state.order.data && this.state.order.data.subTotal}
                                    </div>
                                </div>
                                <div className="col-sm">
                                    <div style={{fontWeight: "bold", textAlign: "right"}}>
                                        Tax : ${this.state.order.data && this.state.order.data.tax}
                                    </div>
                                </div>
                                <div className="col-sm">
                                    <div style={{color: "#DC143C", fontWeight: "bold", textAlign: "right"}}>
                                        Total Price : ${this.state.order.data && this.state.order.data.totalAmount}
                                    </div>
                                </div>
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
        orderDetails: state.orderReducer.orderDetails,
        updatedOrderDetails: state.orderReducer.updatedOrderItems
    }
}

function mapDispatchToProps (dispatch)
{
    return {
        getOrder: data => dispatch(getOrder(data)),
        deleteOrderItem: data => dispatch(deleteOrderItem(data)),
        deleteOrder: data => dispatch(deleteOrder(data))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(OrderView);