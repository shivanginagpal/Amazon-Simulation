import React, { Component } from 'react';
import '../Products/productSearch.css';
import PropTypes from 'prop-types';
import { isFieldEmpty } from '../SignUp/helperApis';
import { connect } from 'react-redux';
import { sellerProducts, getProductCategoryNames, getProductsUnderSeller } from '../../actions/productActions';
import StarRatings from "react-star-ratings";
import Dropdown from 'react-dropdown';
import { Link } from "react-router-dom";
import 'react-dropdown/style.css';

class SellerProducts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: "",
            result: false,
            products: {},
            sort: '',
            rating: 0,
            priceLow: 0,
            priceHigh: 99999,
            productCategoryName: '',
            message: '',
            sellerId: '',
            //productList: '',
            currentPage: 1
        }

        this.onChange = this.onChange.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.onCategoryDropdown = this.onCategoryDropdown.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }
    async componentDidMount() {
        var sellerId = null;
        if (this.props.id) {
            sellerId = this.props.id;
        } else {
            sellerId = this.props.auth.user.id;
        }
        var data = {
            currentPage: this.state.currentPage,
            id: sellerId
        }
        await this.props.getProductsUnderSeller(data);
        await this.props.getProductCategoryNames();
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
                    productList: products,
                })
            }
        }
        if (nextProps.productCategoryResults) {
            var { productCategoryResults } = nextProps;
            this.setState({
                productCategoryList: productCategoryResults,
            })
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onChangeSearch = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            rating: 0,
            priceLow: 0,
            priceHigh: 99999,
            sort: '',
            message: '',
            currentPage: 1
        });
    }
    nextPage = async (e) => {
        let page = this.state.currentPage;
        page += 1;


        if (this.state.search === '' && this.state.productCategoryName === '') {
            var data = {
                currentPage: this.state.currentPage,
                id: this.props.auth.user.id
            }
            await this.props.getProductsUnderSeller(data);
        }
        else {
            this.setState({ currentPage: page }, () => {
                this.onSubmit();
            });
        }
    }

    prevPage = async (e) => {
        let page = this.state.currentPage;
        if (page === 1)
            return;
        page -= 1;
        if (this.state.search === '' && this.state.productCategoryName === '') {
            var data = {
                currentPage: this.state.currentPage,
                id: this.props.auth.user.id
            }
            await this.props.getProductsUnderSeller(data);
        }

        else {
            this.setState({ currentPage: page }, () => {
                this.onSubmit();
            });
        }
    }

    onSubmit = async () => {
        let sellerId;

        if (this.props.id) {
            sellerId = this.props.id;
        } else {
            sellerId = this.props.auth.user.id;
        }
        console.log("In submit");
        if (this.state.search === '' && this.state.productCategoryName === '') {
            this.setState({ message: "Please select a product category or search a product" })
        }
        else {
            const data = {
                currentPage: this.state.currentPage,
                search: this.state.search,
                rating: this.state.rating,
                priceLow: (this.state.priceLow !== '') ? parseInt(this.state.priceLow) : 0,
                priceHigh: (this.state.priceHigh !== '') ? parseInt(this.state.priceHigh) : 99999,
                sort: this.state.sort,
                productCategoryName: this.state.productCategoryName,
                sellerId: sellerId
            }

            console.log(data);
            await this.props.sellerProducts(data)

            this.setState({
                result: true,
                // search: '',
                // productCategoryName: ''
            })
        }
    }

    onCategoryDropdown = (e) => {
        console.log(e.value);
        if (e.value === "All") {
            e.value = '';
        }
        this.setState({
            productCategoryName: e.value,
            rating: 0,
            priceLow: 0,
            priceHigh: 99999,
            sort: '',
            message: '',
            currentPage: 1
        });
    }

    render() {
        var productCategory = [], pageBar, showPageBar;
        var imgSource="https://via.placeholder.com/400x300";
        var items = [],
            avgrating = 0;

        if (this.state && this.state.productCategoryList) {
            productCategory.push("All");
            this.state.productCategoryList.map(category => {
                productCategory.push(category.productCategoryName);
            })
        }


        if (this.state && this.state.productList) {
            showPageBar = true;
            items = this.state.productList.map(product => {
                let tempProduct = product.products;
                if(product.products[0]){

                    tempProduct = product.products[0]
                }
                console.log(product);

                imgSource = isFieldEmpty(tempProduct.productImage[0]) ?
                    "https://via.placeholder.com/400x300" :
                    tempProduct.productImage[0];

                avgrating = 0;
                if (tempProduct.productReview.length > 0) {
                    avgrating = tempProduct.productRating;
                }

                if( this.props.auth.user.userType === 'seller'){
                return (
                    <tr key={tempProduct._id}>

                        <td class="image"><img src={imgSource} alt="" /></td>
                        <td class="product"><strong>  <Link to={{ pathname: `/sellerProductPage/${tempProduct._id}` }}>{tempProduct.productName}</Link></strong>
                            <br />{tempProduct.productDescription}</td>
                        <td>  <StarRatings rating={avgrating} starRatedColor="orange" starDimension="15px" starSpacing="2px" /></td>
                        <td class="price text-right">${tempProduct.productPrice}</td>
                    </tr>
                )
                }
                else if( this.props.auth.user.userType === 'customer'){
                    return (
                        <tr key={tempProduct._id}>
    
                            <td class="image"><img src={imgSource} alt="" /></td>
                            <td class="product"><strong>  <Link to={{ pathname: `/ProductPage/${tempProduct._id}` }}>{tempProduct.productName}</Link></strong>
                                <br />{tempProduct.productDescription}</td>
                            <td>  <StarRatings rating={avgrating} starRatedColor="orange" starDimension="15px" starSpacing="2px" /></td>
                            <td class="price text-right">${tempProduct.productPrice}</td>
                        </tr>
                    )

                }
            })
        }
        if (showPageBar) {
            pageBar = (
                <div className="col-sm-12 justify-content-center mt-1">
                    <nav aria-label="Page navigation example">
                        <ul class="pagination justify-content-center">
                            <li class="page-item ">
                                <div class="page-link" onClick={this.prevPage} aria-label="Previous"><span aria-hidden="true">&laquo;</span></div>
                            </li>
                            <li class="page-item">
                                <div class="page-link" onClick={this.nextPage} aria-label="Next"><span aria-hidden="true">&raquo;</span></div>
                            </li>
                        </ul>
                    </nav>
                </div>
            );
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

                                            <div class="input-group">
                                                <div class="btn-group text-left">
                                                    <Dropdown options={productCategory} onChange={(e) => this.onCategoryDropdown(e)} value={this.state.productCategoryName} placeholder="All" />
                                                </div>
                                                <input type="text" class="form-control" name="search" placeholder="Search for ....." value={this.state.search} onChange={this.onChangeSearch} />
                                                <span class="input-group-btn" styel={{ "width": '50%', "padding": '0 100px' }}>
                                                    <button className="btn btn-warning" type="button" onClick={this.onSubmit}><i class="fa fa-search"></i></button>
                                                </span>
                                            </div>

                                            <p>Showing all results matching for {this.state.search}</p>

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
                                                {pageBar}
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

SellerProducts.propTypes = {
    getProductCategoryNames: PropTypes.func.isRequired,
    getProductsUnderSeller: PropTypes.func.isRequired,
    sellerProducts: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,

}

const mapStateToProps = (state) => ({
    auth: state.auth,
    products: state.products.products_items,
    productCategoryResults: state.products.product_categories,

});
export default connect(mapStateToProps, { sellerProducts, getProductCategoryNames, getProductsUnderSeller })(SellerProducts);
