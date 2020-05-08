import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { backendURL, isFieldEmpty } from '../SignUp/helperApis';
import { connect } from 'react-redux';
import { getCustomerReviews } from '../../actions/productActions';
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";

class CustomerReviews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            reviewed_products: {}
        }
    }

    async componentDidMount() {
        await this.props.getCustomerReviews();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.products) {
            var { products } = nextProps;
            if (products.noRecord) {
                this.setState({
                    noRecord: products.noRecord
                });
            } else {
                this.setState({
                    productList: products
                })
            }
        }
    }

    render() {
        let items = [];
        //console.log("productList: ",this.state.productList);
        const { products_items = [], loading } = this.props.products;

        if (products_items === null || loading) {
            
            return "Product Loading";
           
        }
        else {
            products_items.map(product => {
            let item = product.products[0];
            let result;

            let imgSource = isFieldEmpty(item.productImage[0]) ?
                    "https://via.placeholder.com/400x300" :
                    item.productImage[0];

                if (item.productReview.length > 0) {
                    item.productReview.map(review => {
                        console.log(this.props.auth.user.id);
                        console.log(review.customerId);
                        if (review.customerId === this.props.auth.user.id) {

                            result = (
                                <div>
                                    <tr key={item._id}>
                                        <td class="image"><img src={imgSource} alt="" /></td>
                                        <td class="product"><strong> <Link to={{ pathname: `/productPage/${item._id}` }}>{item.productName}</Link></strong>
                                            <br />{item.productDescription}</td>
                                        <td>  <StarRatings rating={review.rating} starRatedColor="orange" starDimension="15px" starSpacing="2px" /></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Your Comment
                                        </td>
                                        <td></td>
                                        <td>
                                            {review.comment}
                                        </td>
                                    </tr>
                                </div>
                            )
                            items.push(result);
                        }
                    })
                }
            });
        }
        return (
            <div>
                <br />
                <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" />
                <div class="container">
                    <div class="row">

                        <div class="col-md-12">
                            <div class="grid search">
                                <div class="grid-body">
                                    <div class="row">

                                        <div class="col-md-9">
                                            <h2><i class="fa fa-file-o"></i> Products</h2>
                                            <hr />

                                            <div class="padding"></div>

                                            <div class="row">

                                                <div class="col-sm-6">
                                                    <div class="btn-group" style={{ "padding": '0 45px' }}>
                                                    </div>
                                                </div>
                                            </div>
                                            <br />
                                            {this.state.message}
                                            <div class="table-responsive">
                                                <table class="table table-hover">
                                                    <tbody>{items}
                                                    </tbody></table>
                                            </div>
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

CustomerReviews.propTypes = {
    getCustomerReviews: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    products: state.products
});

export default connect(mapStateToProps, { getCustomerReviews })(CustomerReviews);