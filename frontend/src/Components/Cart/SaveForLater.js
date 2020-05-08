import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { connect } from 'react-redux';
import './cart.css';
import {deleteSavedItem, saveForLater, getSavedForLater} from '../../actions/cartAction';

class SaveForLater extends Component {
    constructor(props) {
        super(props);
        this.state = {
            savedDetails: null
        };
        this.deleteItem=this.deleteItem.bind(this);
        this.moveToCart=this.moveToCart.bind(this);
    }

    deleteItem = item => event =>{
        event.preventDefault();
        let payload = {
            "itemId" : item.itemId,
            "email" : this.state.savedDetails.data.customerEmail
        }
        this.props.deleteSavedItem(payload);
    }

    moveToCart = item => event =>{
        event.preventDefault();
        let payload = {
            "itemId" : item.itemId,
            "email" : this.state.savedDetails.data.customerEmail,
            "cartStatus" : "IN_CART",
            "totalAmount" : this.state.savedDetails.data.totalAmount + item.totalPrice
        }
        this.props.saveForLater(payload);
    }

    componentDidMount(){
        this.props.getSavedForLater();
    }

    componentWillReceiveProps(nextProps){
        this.setState({
          ...this.state,
          savedDetails : !nextProps.updatedSavedItems ? (!nextProps.savedItems ? this.state.savedDetails : nextProps.savedItems) : nextProps.updatedSavedItems
        }
       );	
    }

    render() {
        let savedResult = "";
        if(this.state.savedDetails && this.state.savedDetails.status && Object.keys(this.state.savedDetails.data.products).length!==0){
            savedResult = this.state.savedDetails.data.products.map((item,key)=>
            <div class="card" style={{width: "60rem", "backgroundColor" : "#ffff"}}>
                <div class="card-body">
                    <h5 class="card-title" >{item.productName}</h5>
                    <div className="row">
                        <div className="col-md-3">
                            <b>Seller :</b> {item.sellerName}
                        </div>
                        <div className="col-md-3" id= "movecenter">
                            Unit Price : ${item.productPrice}
                        </div>
                        <div className="col-md-3" id= "movecenter">
                            <div className="form-group">
                                <i class="a-icon a-icon-text-separator sc-action-separator" role="img" aria-label="|"></i>
                                <a href="#" onClick={this.deleteItem(item)}>Delete</a>
                                <i class="a-icon a-icon-text-separator sc-action-separator" role="img" aria-label="|"></i>
                                <a href="#" onClick={this.moveToCart(item)}>Move to Cart</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
        }
        else{
            savedResult = <div style={{color: "#DC143C", fontWeight: "bold", fontSize: "16px"}}><h5>No Saved Items!</h5></div>
        }
        return (
            <div>
                <br />
                <br />
                <div className="container" id= "movecenter">
                    <div className="row">
                        <div className="col-md-12" >
                            <br/><h4 id= "movecenter">Saved for later</h4><br/>
                            {savedResult}
                            <br/>
                        </div>
                    </div>

                </div>
                
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
       savedItems : state.cartReducer.savedItems,
       updatedSavedItems : state.cartReducer.updatedSavedItems
    }
}

function mapDispatchToProps (dispatch)
{
    return {
        deleteSavedItem: data => dispatch(deleteSavedItem(data)),
        saveForLater: data => dispatch(saveForLater(data)),
        getSavedForLater: data => dispatch(getSavedForLater(data))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(SaveForLater);