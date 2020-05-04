import React, { Component } from 'react';
import Navbar from './adminNavbar';
import axios from "axios";
import product_image from "../../images/adminproduct.jpg";
import './admin.css';

class viewProductsUnderCategory extends Component {
    constructor() {
        super()
        this.state = {
            productdetails: [],
        }
    };

    componentDidMount = () => {
        const productCategory = this.props.match.params.category
        const data = {
            productCategory: productCategory
        }
        console.log("Category Selected ", data);
        axios("/getProductsUnderProductCategory", {
            method: 'get',
            params: { "productCategory": productCategory }
        }).then(res => {
            this.setState({
                productdetails: this.state.productdetails.concat(res.data)
            })
            console.log("This is p", this.state.productdetails);
        })
    }
    render() {
        let products = this.state.productdetails.map(product => {
            console.log(product);
            console.log(product.products[0].productName);
            let unknown = <img src={product_image} className="card-img-top" id="cardadmin-img-top" alt="..." />
            return (
                <div>
                    <div className="itemRight" id="itemRight" >
                        <div className="col-md-3 col-sm-6">
                            <div className="card cardclass" id="cardadminclass" >
                                {unknown}
                                <div className="card-block" id="cardadmin-title-text">
                                    <h6 className="card-title" id="cardadmin-title">SellerName</h6>
                                    <p className="card-text" id="cardadmin-text">{product.products[0].productName}</p>
                                    <span>
                                        <p className="card-text" id="cardadmin-text">{product.products[0].productPrice}</p>
                                        {/* <input id="quant-text" type="number" readOnly value={itemQuantity} /> */}

                                    </span>
                                    {/* <button id="btn-item-add-to-cart" onClick={() => this.props.togglePopup(itemName, itemPrice, itemId, restId, itemQuantity)} className="btn btn-success">Add to cart </button> */}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            )
        })

        return (
            <div>
                <Navbar />
                <div>
                    <div className="container">
                        <div className="row justify-content-start">
                            <div className="row">
                                <div className="col">
                                    <br />
                                    <div className="row">
                                        <div className=" pad-left">
                                            {products}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default viewProductsUnderCategory;