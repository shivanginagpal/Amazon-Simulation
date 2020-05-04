import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { connect } from 'react-redux';
import './cart.css';
import {getCart} from '../../actions/cartAction';

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartDetails : null
        };
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    fetchCartItems(){
        this.props.getCart();
    }

    handleSubmit = e => {
        e.preventDefault();
        let data = {
            cart: this.state.cartDetails
        };
        alert("CART DATA --"+JSON.stringify(data));
       //this.props.placeOrder(data)
    }


    componentDidMount(){
        this.fetchCartItems();
    }

    componentWillReceiveProps(nextProps){
        this.setState({
          ...this.state,
          cartDetails : !nextProps.cartItems ? this.state.cartDetails : nextProps.cartItems  
        }
       );	
    }

    render() {
        let cartResult = "";
        if(this.state.cartDetails && this.state.cartDetails.status){
        cartResult = this.state.cartDetails.data.products.map((item,key)=>
            <div class="card" style={{width: "60rem", "backgroundColor" : "#ffff"}}>
                <div class="card-body">
                    <h5 class="card-title" >{item.productName}</h5>
                    <div className="row">
                        <div className="col-md-3">
                            <b>Seller :</b> {item.sellerName}
                        </div>
                        <div className="col-md-3" id= "movecenter">
                            Unit Price : {item.productPrice}
                        </div>
                        <div className="col-md-3" id= "movecenter">
                            Quantity : {item.productQuantity}
                        </div>
                        <div className="col-md-3" id= "movecenter" style={{color: "#DC143C", fontWeight: "bold"}}>
                            Price : {item.totalPrice}
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
                            <br/><h3>Checkout</h3><br/>
                            <form onSubmit={this.handleSubmit}>
                                {cartResult}
                                <br/>
                                {this.state.cartDetails && this.state.cartDetails.status &&
                                    <div style={{color: "#DC143C", fontWeight: "bold", fontSize: "16px"}}>
                                        <div className="row">
                                            <div className="col-sm" >
                                                Total Price : {this.state.cartDetails.data.totalAmount}
                                            </div>
                                            <div className="col-sm" >
                                            <   button className="btn btn-success">Place Order</button>
                                            </div>
                                            <div className="col-sm" >
                                                <Link to={{pathname: "/cart"}} class="btn btn-danger">Cancel</Link>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </form>
                        </div>
                    </div>

                </div>
                
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
       cartItems: state.cartReducer.cartItems
    }
}

function mapDispatchToProps (dispatch)
{
    return {
        getCart: data => dispatch(getCart(data))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Checkout);