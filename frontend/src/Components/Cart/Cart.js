import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { connect } from 'react-redux';
import './cart.css';
import {getCart} from '../../actions/cartAction';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartDetails : null
        };
    }

    handleChange = e => {
        this.setState({ ...this.state, [e.target.name] : e.target.value} );
    }

    fetchCartItems(){
        this.props.getCart();
    }


    componentDidMount(){
        this.fetchCartItems();
    }

    componentWillReceiveProps(nextProps){
        this.setState({
          ...this.state,
          cartDetails : !nextProps.cartItems ? this.state.cartDetails : nextProps.cartItems,  
        }
       );	
    }

    render() {
        let cartResult = "";
        if(this.state.cartDetails){
        cartResult = this.state.cartDetails.products.map((item,key)=>
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
                            <div className="form-group">
                                <select value={item.productQuantity}>
                                    <option value="1" >1</option>
                                    <option value="2" >2</option>
                                    <option value="3" >3</option>
                                    <option value="4" >4</option>
                                    <option value="5" >5</option>
                                </select>
                                <i class="a-icon a-icon-text-separator sc-action-separator" role="img" aria-label="|"></i>
                                <a href="#">Delete</a>
                                <i class="a-icon a-icon-text-separator sc-action-separator" role="img" aria-label="|"></i>
                                <a href="#">Save for later</a>
                            </div>
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
                            <br/><h3>Shopping Cart</h3><br/>
                            {cartResult}
                            <br/>
                            {this.state.cartDetails && 
                                <div id= "movecenter" style={{color: "#DC143C", fontWeight: "bold", fontSize: "16px"}}>
                                    <div className="row">
                                        <div className="col-sm" >
                                        Total Price : {this.state.cartDetails.totalAmount}
                                        </div>
                                        <div className="col-sm" >
                                        <button className="btn btn-success">CheckOut</button>
                                        </div>
                                    </div>
                                </div>
                            }
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


export default connect(mapStateToProps, mapDispatchToProps)(Cart);