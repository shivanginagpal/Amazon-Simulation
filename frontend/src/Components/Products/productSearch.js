import React, { Component } from 'react';
import './productSearch.css'
import Navbar from '../Navbar/Navbar';
import PropTypes from 'prop-types';
import { backendURL, isFieldEmpty } from '../SignUp/helperApis';
import { connect } from 'react-redux';
import { productSearch, getProductCategoryNames } from '../../actions/productActions';
import StarRatings from "react-star-ratings";
import Dropdown from 'react-dropdown';
import { Link } from "react-router-dom";
import 'react-dropdown/style.css';

class ProductSearch extends Component {

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
            currentPage: 1

        }

        this.onChange = this.onChange.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.onChangeDropdown = this.onChangeDropdown.bind(this);
        this.onCategoryDropdown = this.onCategoryDropdown.bind(this);
        this.handleRate = this.handleRate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
       
    }
    async componentDidMount() {
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
        this.setState({ currentPage: page }, () => {
            this.onSubmit();
        });
    }

    prevPage = async (e) => {
        let page = this.state.currentPage;
        if (page === 1)
            return;
        page -= 1;
        this.setState({ currentPage: page }, () => {
            this.onSubmit();
        });
    }

    onSubmit = async () => {
        console.log("In submit");
        if (this.state.search === '' && this.state.productCategoryName === '') {
            this.setState({ message: "Please select a product category or search a product / seller name" })
        }
        else {
            const data = {
                currentPage: this.state.currentPage,
                search: this.state.search,
                rating: this.state.rating,
                priceLow: (this.state.priceLow !== '') ? parseInt(this.state.priceLow) : 0,
                priceHigh: (this.state.priceHigh !== '') ? parseInt(this.state.priceHigh) : 99999,
                sort: this.state.sort,
                productCategoryName: this.state.productCategoryName
            }

            console.log(data);
            await this.props.productSearch(data)

            this.setState({
                result: true,
                // rating: 0
            })
        }

    }

    onChangeDropdown = (e) => {
        console.log(e.value);

        this.setState({ sort: e.value }, () => {
            this.onSubmit();
        });
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
            // },
            //      () => {
            //     this.onSubmit();
        });
    }

    handleRate = (rating) => {
        console.log(rating);

        this.setState({ rating: rating }, () => {
            console.log(this.state.rating, 'rating');
            this.onSubmit();
        });

    }

    render() {
        var productCategory = [], pageBar, showPageBar;
        const sortOptions = ["Price Low-High", "Price High-Low", "Rating Low-High", "Rating High-Low"];
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
                let imgSource = isFieldEmpty(product.products.productImage[0]) ?
                    "https://via.placeholder.com/400x300" :
                     product.products.productImage[0];

                avgrating = 0;
                if (product.products.productReview.length > 0) {
                    avgrating = product.products.productRating;
                }
                return (
                    <tr key={product.products._id}>

                        <td class="image"><img src={imgSource} alt="" /></td>
                        <td class="product"><strong> <Link to={{ pathname: `/productPage/${product.products._id}` }}>{product.products.productName}</Link></strong>
                            <br />{product.products.productDescription}</td>
                        <td>  <StarRatings rating={avgrating} starRatedColor="orange" starDimension="15px" starSpacing="2px" /></td>
                        <td class="price text-right">${product.products.productPrice}</td>
                    </tr>
                )
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
                <Navbar />
                <br />
                <br />
                <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" />
                <div class="container-fluid">
                    <div class="row">

                        <div class="col-md-12">
                            <div class="grid search">
                                <div class="grid-body">
                                    <div class="row">

                                        <div class="col-md-3">
                                            <h2 class="grid-title"><i class="fa fa-filter"></i> Filters</h2>
                                            <hr />

                                            <div class="padding"></div>

                                            <h4>By Rating</h4>
                                            <div onClick={() => this.handleRate(4)} >  <StarRatings rating={4} starRatedColor="orange" starDimension="15px" starSpacing="2px" /> & Up</div>
                                            <div onClick={() => this.handleRate(3)}>  <StarRatings rating={3} starRatedColor="orange" starDimension="15px" starSpacing="2px" /> & Up</div>
                                            <div onClick={() => this.handleRate(2)}>  <StarRatings rating={2} starRatedColor="orange" starDimension="15px" starSpacing="2px" /> & Up</div>
                                            <div onClick={() => this.handleRate(1)}>  <StarRatings rating={1} starRatedColor="orange" starDimension="15px" starSpacing="2px" /> & Up</div>
                                            <div onClick={() => this.handleRate(0)}>  <StarRatings rating={0} starRatedColor="orange" starDimension="15px" starSpacing="2px" /> & Up</div>


                                            <div class="padding"></div>
                                            <br />

                                            <h4>By price:</h4>

                                              Enter Low and High range
                                            <div class="slider-primary">
                                                <input type="number" name="priceLow" value={this.state.priceLow} onChange={this.onChange} placeholder="Low" className="form-control" required="required" />

                                            </div>
                                            <br />
                                            <div class="slider-primary">
                                                <input type="number" name="priceHigh" value={this.state.priceHigh} onChange={this.onChange} placeholder="High" className="form-control" required="required" />
                                            </div>
                                            <br />
                                            <div className="form-row" style={{ "padding": '0px 5px' }}>
                                                <button type="button" onClick={this.onSubmit} className="btn btn-warning">Go</button>
                                                {this.state.alert}
                                            </div>

                                        </div>

                                        <div class="col-md-9">
                                            <h2><i class="fa fa-file-o"></i> Result</h2>
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
                                                <div class="col-md-6 text-right">
                                                    <div class="btn-group text-left">
                                                        <Dropdown options={sortOptions} onChange={(e) => this.onChangeDropdown(e)} value={this.state.sort} placeholder="Order By" />

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

ProductSearch.propTypes = {
    getProductCategoryNames: PropTypes.func.isRequired,
    productSearch: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,

}

const mapStateToProps = (state) => ({
    auth: state.auth,
    products: state.products.products_items,
    productCategoryResults: state.products.product_categories,

});
export default connect(mapStateToProps, { productSearch, getProductCategoryNames })(ProductSearch);
