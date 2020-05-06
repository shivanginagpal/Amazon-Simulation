import React, { Component } from 'react';
import './addProduct.css';
import Navbar from '../Navbar/Navbar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateProduct } from '../../actions/productActions';



class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productDescription: "",
            productName: "",
            productPrice: "",
        }

        this.onChange = this.onChange.bind(this);
        this.updateProduct = this.updateProduct.bind(this);

    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    updateProduct = async (e) => {
        console.log("In Add Product");
        console.log(this.props);
        var data = {
            productPrice: this.state.productPrice,
            productDescription: this.state.productDescription,
            //productName: this.state.productName,
            productCategory: this.props.location.state.productInfo.productCategoryName,
            productId : this.props.location.state.productInfo.products[0]._id,
        }

        await this.props.updateProduct(data, this.props.history)

    }



    render() {

        var product = this.props.location.state.productInfo;

        return (
            <div>

                <Navbar />
                <br />
                <br />
                <div className="container" style={{ fontFamily: "Lato,Arial,Helvetica Neue,sans-serif", marginTop: "50px" }}>
                    <div className="row">
                        <div className="col-md-12">
                            <div id="accordion">
                                <div className="card">
                                    <div className="card-header text-center" id="product-header">
                                        <a className="card-link" id="product-link" data-toggle="collapse" href="#collapseOne">
                                            Update Product
                                        </a>
                                    </div>
                                    <div id="collapseOne" className="collapse show" data-parent="#accordion">
                                        <div className="card-body" id="product-body">
                                            <div className="row">
                                                <div className="card-body text-center">
                                                    <h2>Please Enter Product details</h2>
                                                    <hr />
                                                    <div className="card-body border">
                                                        <div className="form-row ">
                                                            <div className="form-group col-md-9">
                                                                <input id="productName" name="productName" placeholder={product.products[0].productName} disabled="disabled" className="form-control" />
                                                            </div>

                                                            <div className="form-group col-md-9">
                                                                <input id="productDescription" name="productDescription" onChange={this.onChange} 
                                                                value={this.state.productDescription} placeholder={product.products[0].productDescription} 
                                                                className="form-control" required="required" type="text" />
                                                            </div>

                                                            <div className="form-group col-md-9">
                                                                <input id="productPrice" name="productPrice" onChange={this.onChange}
                                                                    value={this.state.productPrice} placeholder={product.products[0].productPrice}
                                                                    className="form-control" type="text"
                                                                    pattern="\d+(\.\d{2})?" title="Please enter a valid price" />
{/* 
                                                                <input type="text" placeholder="Country" id="add" pattern="^[A-Za-z]{1,32}$" required
                                                                    title="lease enter characters only"> */}
                                                            </div>

                                                            </div>
                                                        </div>

                                                    </div>

                                                </div>
                                                <div className="form-rows">
                                                    <div class="text-center"><button type="button" onClick={this.updateProduct} className="btn btn-secondary">Update Product</button></div>
                                                    {this.state.alert}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>



                        <br />
                        <br />


                    </div>

                </div>
        )
    }

}

EditProduct.propTypes = {
                    updateProduct: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
                    auth: state.auth,

})

export default connect(mapStateToProps, { updateProduct})(EditProduct);