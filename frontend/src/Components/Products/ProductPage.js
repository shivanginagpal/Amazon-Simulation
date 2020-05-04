import React, { Component } from 'react';
import './productSearch.css'
import Navbar from '../Navbar/Navbar';
import './ProductPage.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProduct } from '../../actions/productActions';
import StarRatings from "react-star-ratings";

class ProductPage extends Component {
	constructor(props) {
		super(props);
	}

	async componentDidMount() {
		if (this.props.match.params.id) {
			await this.props.getProduct(this.props.match.params.id);
		}
	}

	componentWillReceiveProps(nextProps) {
		console.log(nextProps);
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
	}

	render() {

		
		var singleProduct = [],avgrating = 0;
		if (this.state && this.state.product) {
			singleProduct = this.state.product[0].products[0];
		
		
		if (singleProduct.productReview.length > 0) {
			avgrating = singleProduct.productRating;
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
										<div> <a href="#"><img src="https://s9.postimg.org/tupxkvfj3/image.jpg" /></a></div>
									</div>
									<div class="img-small-wrap">
										<div class="item-gallery"> <img src="https://s9.postimg.org/tupxkvfj3/image.jpg" /> </div>
										<div class="item-gallery"> <img src="https://s9.postimg.org/tupxkvfj3/image.jpg" /> </div>
										<div class="item-gallery"> <img src="https://s9.postimg.org/tupxkvfj3/image.jpg" /> </div>
										<div class="item-gallery"> <img src="https://s9.postimg.org/tupxkvfj3/image.jpg" /> </div>
									</div>
								</article>
							</aside>
							<aside class="col-sm-7">
								<article class="card-body p-5">
									<h3 class="title mb-3 text-left">{singleProduct.productName} </h3>

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
									
								

									<hr />
									<div class="row">
										<div class="col-sm-5">
											<dl class="param param-inline">
												<dt>Quantity: </dt>
												<dd>
													<select class="form-control form-control-sm" style={{ "width": '70px' }}>
														<option> 1 </option>
														<option> 2 </option>
														<option> 3 </option>
													</select>
												</dd>
											</dl>
										</div>
										
									</div>
									<hr />
					
									<a href="#" class="btn btn-lg btn-warning text-uppercase"> <i class="fas fa-shopping-cart"></i> Add to cart </a>
								</article>
							</aside>
						</div>
					</div>


				</div>



				<br /><br /><br />
				<article class="bg-secondary mb-3">
					<div class="card-body text-center">
						<h4 class="text-white">HTML UI KIT <br /> Ready to use Bootstrap 4 components and templates </h4>
						<p class="h5 text-white"> for Ecommerce, marketplace, booking websites
and product landing pages</p>   <br />
						<p><a class="btn btn-warning" target="_blank" href="http://bootstrap-ecommerce.com/"> Bootstrap-ecommerce.com
 <i class="fa fa-window-restore "></i></a></p>
					</div>
					<br /><br /><br />
				</article>
			</div >
		);

	}
}

ProductPage.propTypes = {
	getProduct: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,

}

const mapStateToProps = (state) => ({
	auth: state.auth,
	productResult: state.products.product,

});
export default connect(mapStateToProps, { getProduct })(ProductPage);
