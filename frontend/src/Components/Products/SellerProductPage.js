import React, { Component } from 'react';
import './productSearch.css'
import Navbar from '../Navbar/Navbar';
import './ProductPage.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProduct, getCustomerName, postReviewToProduct, deleteProduct } from '../../actions/productActions';
import { postProductToCart } from '../../actions/cartAction';
import StarRatings from "react-star-ratings";
import swal from 'sweetalert';
import { Link } from "react-router-dom";
import { backendURL, isFieldEmpty } from '../SignUp/helperApis';
import axios from 'axios';


class SellerProductPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            message: "",
            alert: null,
            bigImageIndex: 0,
            reviews: [],
            comment: '',
            rating: 0
        }

        this.onChange = this.onChange.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.getCutomerReviews = this.getCutomerReviews.bind(this);

    }

    async componentDidMount() {
        if (this.props.match.params.id) {
            await this.props.getProduct(this.props.match.params.id);
        }
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.productResult) {
            var { productResult } = nextProps;
            if (productResult.noRecord) {
                this.setState({
                    noRecord: productResult.noRecord
                });
            } else {
                this.setState({
                    product: productResult,
                })
            }
        }
        if (nextProps.deleteStatus) {
            var { deleteStatus } = nextProps;
        }
        this.setState({
            deleteStatus: deleteStatus
        })
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }



    deleteProduct = async () => {
        //console.log("In deleteProduct");
        const data = {
            productId: this.state.product[0].products[0]._id,
        }

        await this.props.deleteProduct(data, this.props.history).then(res => {
            if (this.state.deleteStatus === 200) {
                swal({
                    text: "Product deleted Sucessfully!"
                }).then(() => {
                    window.location.replace("/sellerHome");
                })
            }
            else {
                swal({
                    text: "Error deleting product, please try again",
                    button: "ok"
                }).then()
            }
        })
    }


    getCutomerReviews = async () => {

        var singleProduct = [], customerReviews = [];
        singleProduct = this.state.product[0].products[0];


        await singleProduct.productReview.map(async (review, count) => {
            // await this.props.getCustomerName(review.customerId)
            axios.get("/getCustomerName", {
                method: 'get',
                params: { "customerId": review.customerId }
            })
                .then(async result => {

                    let tempReview = {
                        name: result.data.name,
                        comment: review.comment,
                        rating: review.rating,
                    }
                    customerReviews.push(tempReview);
                    if ((count + 1) === singleProduct.productReview.length) {
                        this.setState({
                            reviews: customerReviews,
                            name: '',
                        })
                    }

                }).catch(error => {
                    console.log(error);
                    swal({
                        text: "Error getting product reviews, please try again",
                        button: "ok"
                    }).then()
                })
        })


    }


    render() {

        let imgSource = [], smallImage = [], reviewCard = [], productInfo = [];

        var singleProduct = [], avgrating = 0, sellerName = "";
        if (this.state && this.state.product) {
            productInfo = this.state.product[0];
            singleProduct = this.state.product[0].products[0];
            sellerName = this.state.product[1];

            if (singleProduct.productReview.length > 0) {
                avgrating = singleProduct.productRating;
            }

            for (let i = 0; i < singleProduct.productImage.length; i++) {
                imgSource.push(isFieldEmpty(singleProduct.productImage[i]) ?
                    "https://via.placeholder.com/150x100" :
                    singleProduct.productImage[i]);

                smallImage.push(<div class="item-gallery" key={i}> <img src={imgSource[i]} onClick={() => { this.setState({ bigImageIndex: i }) }} /> </div>);
            }

            for (let reviewIndex = 0; reviewIndex < this.state.reviews.length; reviewIndex++) {
                reviewCard.push(
                    <div key={reviewIndex}>
                        <h5><b>{this.state.reviews[reviewIndex].name} </b></h5>
                        <b> <StarRatings rating={this.state.reviews[reviewIndex].rating} starRatedColor="orange" starDimension="15px" starSpacing="2px" /> </b>
                        <div><p><b>Review: {this.state.reviews[reviewIndex].comment} </b></p></div>
                        <hr />
                    </div>
                )
            }

        }

        return (
            <div>
                <Navbar />
                <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
                <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
                <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

                <div class="container">
                    <hr />
                    <div class="card">
                        <div class="row">
                            <aside class="col-sm-5 border-right">
                                <article class="gallery-wrap">
                                    <div class="img-big-wrap">
                                        <div> <a href="#"><img src={imgSource[this.state.bigImageIndex]} /></a></div>
                                    </div>
                                    <div class="img-small-wrap">
                                        {smallImage}
                                    </div>
                                </article>
                            </aside>
                            <aside class="col-sm-7">
                                <article class="card-body p-5">
                                    <h3 class="title mb-3 text-left">{singleProduct.productName} </h3>

                                    <dl class="item-property">
                                        <dt>Seller</dt>
                                        <dd><p>{sellerName}</p></dd>
                                    </dl>
                                    <dl class="param param-feature">
                                        <dt>Avg Rating#</dt>
                                        <dd> <StarRatings rating={avgrating} starRatedColor="orange" starDimension="15px" starSpacing="2px" /></dd>
                                    </dl>
                                    <p class="price-detail-wrap">
                                        <span class="price h3 text-warning">
                                            <span class="currency">US $</span><span class="num">{singleProduct.productPrice} </span>
                                        </span>

                                    </p>
                                    <dl class="item-property">
                                        <dt>Description</dt>
                                        <dd><p>{singleProduct.productDescription} </p></dd>
                                    </dl>
                                    {/* <div class="row"> */}
                                    <Link to={{ pathname: `/editProduct`, state: { productInfo } }}><button type="button" className="btn btn-lg btn-warning text-uppercase">Update Product</button></Link>
                                    <br /> <br />
                                    <Link to={{ pathname: `/updateProductImages`, state: { productInfo } }}><button type="button" className="btn btn-lg btn-warning text-uppercase">Update Images</button></Link>
                                    {/* </div> */}
                                    <br /> <br />
                                    <button type="button" onClick={this.deleteProduct} className="btn btn-lg btn-danger text-uppercase">Delete Product</button>
                                </article>
                            </aside>
                        </div>
                    </div>

                    <div class="card">
                        <div class="row">
                            <aside class="col-sm-12 ">
                                <br />
                                <div onClick={this.getCutomerReviews}><a href="#"><h6 class="text-center">Click here to see customer Reviews and Ratings </h6></a></div>
                                <br />
                                <div style={{ "padding": '0px 30px' }}>
                                    {reviewCard}
                                </div>
                                {/* <div class="form-group">
									<h4 class="text-center"><label>Add Review</label></h4>
									<div class="text-center"> <StarRatings starHoverColor="orange" starRatedColor="orange" rating={this.state.rating} numberOfStars={5} name='rating' starDimension="20px" starSpacing="2px" changeRating={this.changeRating} /></div>
									{this.state.message}
									<textarea class="form-control rounded-0" id="exampleFormControlTextarea2" rows="3" onChange={this.onChange} name="comment" value={this.state.review}></textarea>
									<br />
									<div class="text-center"><button type="button" onClick={this.onAddReview} className="btn btn-lg btn-warning text-uppercase">Submit review</button></div>
								</div> */}
                            </aside>
                        </div>
                    </div>
                </div>
                <br /><br /><br />

            </div >
        );

    }
}

SellerProductPage.propTypes = {
    getProduct: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired

}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    productResult: state.products.product,
    deleteStatus: state.products.deleteStatus,

});

function mapDispatchToProps(dispatch) {
    return {
        getProduct: data => dispatch(getProduct(data)),
        deleteProduct: data => dispatch(deleteProduct(data))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(SellerProductPage);
