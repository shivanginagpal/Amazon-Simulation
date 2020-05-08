import React, { Component } from 'react';
import './productSearch.css'
import Navbar from '../Navbar/Navbar';
import './ProductPage.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProduct, getCustomerName, postReviewToProduct, updateProductViews } from '../../actions/productActions';
import { postProductToCart } from '../../actions/cartAction';
import StarRatings from "react-star-ratings";
import swal from 'sweetalert';
import { backendURL, isFieldEmpty } from '../SignUp/helperApis';
import axios from 'axios';
import { Link } from "react-router-dom";



class ProductPage extends Component {
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
		this.onAddReview = this.onAddReview.bind(this);
		this.onAddToCart = this.onAddToCart.bind(this);
		this.getCutomerReviews = this.getCutomerReviews.bind(this);
		this.changeRating = this.changeRating.bind(this);
	}

	async componentDidMount() {
		if (this.props.match.params.id) {
			await this.props.getProduct(this.props.match.params.id);
			await this.props.updateProductViews(this.props.match.params.id);
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
		if (nextProps.status) {
			var { status } = nextProps;
			this.setState({
				cartStatus: status
			})
		}
		// if (nextProps.customer_name) {
		// 	var { customer_name } = nextProps;
		// 	this.setState({
		// 		name: customer_name
		// 	})
		// }
		if (nextProps.reviewStatus) {
			var { reviewStatus } = nextProps;
		}
		this.setState({
			reviewStatus: reviewStatus
		})
	}

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	}

	onAddToCart = async () => {

		const data = {
			sellerId: this.state.product[0].seller,
			productId: this.state.product[0].products[0]._id,
			productQuantity: this.state.value,
			productPrice: this.state.product[0].products[0].productPrice
		}

		await this.props.postProductToCart(data).then(res => {
			if (this.state.cartStatus === 200) {
				swal({
					text: "Product added to cart!"
				}).then()
			}
			else {
				swal({
					text: "Error adding product to cart, please try again",
					button: "ok"
				}).then()
			}
		})
	}

	onAddReview = async () => {

		if (this.state.rating !== 0 && this.state.comment !== "") {
			const data = {
				_id: this.state.product[0].products[0]._id,
				productRating: this.state.product[0].products[0].productRating,
				comment: this.state.comment,
				rating: this.state.rating
			}
			//console.log(data);

			await this.props.postReviewToProduct(data).then(res => {
				if (this.state.reviewStatus === 200) {
					swal({
						text: "Review added successfully!"
					}).then(() => {
						window.location.reload();
					})
				}
				else {
					swal({
						text: "Error adding review, please try again",
						button: "ok"
					}).then()
				}
			})
		} else {
			this.setState({
				message: " * Please add both rating and review",
			})
		}
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


	decrease = () => {
		if (this.state.value !== 1) {
			this.setState({ value: this.state.value - 1 });
		}
	}

	increase = () => {
		this.setState({ value: this.state.value + 1 });
	}

	changeRating = (newRating, name) => {
		this.setState({ rating: newRating });
	}


	render() {

		let imgSource = [], smallImage = [], reviewCard = [], addReviewBox = [], count = 0, reviewFoundFlag = false;

		var singleProduct = [], avgrating = 0, sellerName = "", seller = "";
		if (this.state && this.state.product) {
			singleProduct = this.state.product[0].products[0];
			sellerName = this.state.product[1];
			seller = this.state.product[0].seller;

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

			if (singleProduct.productReview.length > 0) {
				for (count = 0; count < singleProduct.productReview.length; count++) {
					if (singleProduct.productReview[count].customerId === this.props.auth.user.id) {
						//console.log('review found', count)
						reviewFoundFlag = true;
						break;
					}
				}

			}

			if (reviewFoundFlag === false) {
				//console.log("not found")
				addReviewBox.push(
					<div class="form-group" key={this.props.auth.user.id}>
						<h4 class="text-center"><label>Add Review</label></h4>
						<div class="text-center"> <StarRatings starHoverColor="orange" starRatedColor="orange" rating={this.state.rating} numberOfStars={5} name='rating' starDimension="20px" starSpacing="2px" changeRating={this.changeRating} /></div>
						<div style={{ "color": 'red' }}><b>{this.state.message}</b></div>
						<textarea class="form-control rounded-0" id="exampleFormControlTextarea2" rows="3" onChange={this.onChange} name="comment" value={this.state.review}></textarea>
						<br />
						<div class="text-center"><button type="button" onClick={this.onAddReview} className="btn btn-lg btn-warning text-uppercase">Submit review</button></div>
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
										<dd><p><Link to={{ pathname: `/sellerProfile/${seller}` }}>{sellerName}</Link></p></dd>
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

									<p><b>Quantity</b></p>
									<div className="def-number-input number-input">
										<button onClick={this.decrease} className="minus"></button>
										<input className="quantity" name="quantity" placeholder="1" value={this.state.value} onChange={this.onChange}
											type="number" />
										<button onClick={this.increase} className="plus"></button>
									</div>
									<button type="button" onClick={this.onAddToCart} className="btn btn-lg btn-warning text-uppercase">Add to cart</button>
									{this.state.alert}
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
								{addReviewBox}
							</aside>
						</div>
					</div>
				</div>
				<br /><br /><br />

			</div >
		);

	}
}

ProductPage.propTypes = {
	getProduct: PropTypes.func.isRequired,
	postProductToCart: PropTypes.func.isRequired,
	postReviewToProduct: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired

}

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors,
	productResult: state.products.product,
	status: state.cartReducer.status,
	reviewStatus: state.products.reviewStatus

});

function mapDispatchToProps(dispatch) {
	return {
		getProduct: data => dispatch(getProduct(data)),
		postProductToCart: data => dispatch(postProductToCart(data)),
		postReviewToProduct: data => dispatch(postReviewToProduct(data)),
		updateProductViews : (data) => dispatch(updateProductViews(data))
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
