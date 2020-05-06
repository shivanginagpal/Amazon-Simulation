import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { backendURL, isFieldEmpty } from '../SignUp/helperApis';
import { connect } from 'react-redux';
import { getCustomerReviews } from '../../actions/productActions';
import StarRatings from "react-star-ratings";
import Dropdown from 'react-dropdown';
import { Link } from "react-router-dom";

class CustomerReviews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            productList: {}
        }
        //this.onSubmit = this.onSubmit.bind(this);
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

    // nextPage = async (e) => {
    //     let page = this.state.currentPage;
    //     page += 1;
    //     this.setState({ currentPage: page }, () => {
    //         this.onSubmit();
    //     });
    // }

    // prevPage = async (e) => {
    //     let page = this.state.currentPage;
    //     if (page === 1)
    //         return;
    //     page -= 1;
    //     this.setState({ currentPage: page }, () => {
    //         this.onSubmit();
    //     });
    // }

    render() {
        if(this.state.productList)
        {
            console.log("productList: ",this.state.productList);
        }
        return (
            <div>
                "customer reviews"
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
    products: state.products.products_items
});

export default connect(mapStateToProps, { getCustomerReviews })(CustomerReviews);
