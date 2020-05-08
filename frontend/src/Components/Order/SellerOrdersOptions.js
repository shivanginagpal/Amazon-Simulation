import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { connect } from 'react-redux';
import {getSellerOrders, cancelOrderBySeller} from '../../actions/orderAction';
import { getID } from '../SignUp/helperApis';


class SellerOrdersOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: null
        };     
        this.cancelSellerProductsInOrder = this.cancelSellerProductsInOrder.bind(this);
    }

    cancelSellerProductsInOrder = item => event => {
        event.preventDefault();
        let payload = {
            order_id: item._id,
            seller_id: getID()
        }
        this.props.cancelOrderBySeller(payload);
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
        let cancelFlag = false;
        let somevar = "";
        let ordFil = "";
        let openOrdersList = "";
        let deliveredOrdersList="";
        let cancelledOrdersList = "";
        let arr = [];
        if(this.state.orders && Object.keys(this.state.orders).length !== 0){
            ordFil = this.state.orders.data.map((item,key)=> 
            {
                somevar = item.products.map((prdct,prdctkey)=>
                 {
                   cancelFlag = (prdct.productOrderStatus!=="CANCELLED") ? true : cancelFlag;
                 }
                );
                if(cancelFlag){ 
                   arr.push(item._id);
                   cancelFlag = false;
                }  
            }
            );
            
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
                        <div class="card-body" >
                        <Link to={{pathname: "/viewSoldOrder/"+item._id}} style={{ textDecoration: "none", color : "black" }}>
                            <div id= "movecenter" style={{fontWeight: "bold"}}>
                                Order Number : {item._id} <br/>
                            </div><br/>
                            <div id= "movecenter" >
                                Ordered Date : {item.orderDate.slice(0,10)}<br/>
                            </div>
                            <br/>
                            </Link>
                            <div id="movecenter">
                                
                                {item.orderStatus!=="CANCELLED" && item.orderStatus!=="DELIVERED" && arr.indexOf(item._id)!== -1  &&  <button className="btn btn-danger btn-sm" onClick={this.cancelSellerProductsInOrder(item)}>cancel</button>}
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
        getSellerOrders: data => dispatch(getSellerOrders(data)),
        cancelOrderBySeller: data => dispatch(cancelOrderBySeller(data))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(SellerOrdersOptions);