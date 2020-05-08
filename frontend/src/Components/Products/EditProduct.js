import React, { Component } from 'react';
import './addProduct.css';
import Navbar from '../Navbar/Navbar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { updateProduct } from '../../actions/productActions';



class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productDescription: "",
            productName: "",
            productPrice: "",
            errors:{}
        }

        this.onChange = this.onChange.bind(this);
        this.updateProduct = this.updateProduct.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.errors);
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors })
        }
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
            productId: this.props.location.state.productInfo.products[0]._id,
        }

        await this.props.updateProduct(data, this.props.history)

    }



    render() {

        var product = this.props.location.state.productInfo;
        const { errors } = this.state;
        console.log(errors);

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
                                                    <form noValidate onSubmit={this.onSubmit}>
                                                    <div className="card-body border">
                                                        <div className="form-row ">
                                                            <div className="form-group col-md-9">
                                                                <input id="productName" name="productName" placeholder={product.products[0].productName} disabled="disabled" className="form-control" />
                                                            </div>

                                                            <div className="form-group col-md-9">
                                                                <input id="productDescription" name="productDescription" onChange={this.onChange}
                                                                    value={this.state.productDescription} placeholder={product.products[0].productDescription}
                                                                    className={classnames('form-control payment-form-control', {
                                                                        'is-invalid': errors.productDescription
                                                                    })}required="required" type="text" />
                                                                    {errors.productDescription && (
                                                                    <div className="invalid-feedback">{errors.productDescription}</div>
                                                                )}
                                                            </div>


                                                            <div className="form-group col-md-9">
                                                                <input id="productPrice" name="productPrice" onChange={this.onChange}
                                                                    value={this.state.productPrice} placeholder={product.products[0].productPrice}
                                                                    className={classnames('form-control payment-form-control', {
                                                                        'is-invalid': errors.productPrice
                                                                    })} type="text" />
                                                                {errors.productPrice && (
                                                                    <div className="invalid-feedback">{errors.productPrice}</div>
                                                                )}
                                                            </div>

                                                        </div>
                                                    </div>
                                                    </form>

                                                </div>
                                                

                                            </div>
                                            <div className="form-rows">
                                                <div class="text-center"><button type="submit" onClick={this.updateProduct} className="btn btn-secondary">Update Product</button></div>
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
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors

})

export default connect(mapStateToProps, { updateProduct })(EditProduct);