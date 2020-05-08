import React, { Component } from 'react';
import './addProduct.css';
import Navbar from '../Navbar/Navbar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactDropzone from "react-dropzone";
import swal from 'sweetalert';
import { Redirect } from 'react-router';
import classnames from 'classnames';
import { postProduct, getProductCategoryNames } from '../../actions/productActions';

const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif'
const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => { return item.trim() })
const imageMaxSize = 1000000000 // bytes

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productDescription: "",
            productCategory: "",
            productName: "",
            productPrice: "",
            uploadedPhotos: [],
            uploadedPhotoLimit: 5,
            previewuploadedPhotos: [],
            inputPhotos: [],
            added: false,
            alert: null,
            productStatus:null,
            errors:{}

        }

        this.onChange = this.onChange.bind(this);
        this.onDrop = this.onDrop.bind(this);
       // this.onSubmit = this.onSubmit.bind(this);
        this.addProduct = this.addProduct.bind(this);
        this.productCategoryChangeHandler = this.productCategoryChangeHandler.bind(this);

    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    productCategoryChangeHandler = (e) => { this.setState({ productCategory: e.target.value }) }

    async componentDidMount() {
        await this.props.getProductCategoryNames();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.productCategoryResults) {
            var { productCategoryResults } = nextProps;
            if (productCategoryResults.noRecord) {
                this.setState({
                    noRecord: productCategoryResults.noRecord
                });
            } else {
                this.setState({
                    productCategoryList: productCategoryResults,
                })
            }
        }
        if(nextProps.status){
			var {status} = nextProps;
			this.setState({
				productStatus:status
			})
        }
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors })
        }
    }

    verifyFile = (files) => {
        if (files) {
            const currentFile = files;
            const currentFileType = currentFile.type
            const currentFileSize = currentFile.size
            if (currentFileSize > imageMaxSize) {
                alert("This file is not allowed. " + currentFileSize + " bytes is too large")
                return false
            }
            if (!acceptedFileTypesArray.includes(currentFileType)) {
                alert("This file is not allowed. Only images are allowed.")
                return false
            }
            return true
        }
    }

    onDrop = (selectedFiles, rejectedFiles) => {
        let index;
        for (index = 0; index < selectedFiles.length; ++index) {
            const selectedfile = selectedFiles[index];
            const rejectedfile = rejectedFiles[index];
            if (rejectedfile) {
                this.verifyFile(rejectedfile)
            }

            if (selectedfile) {
                const isVerified = this.verifyFile(selectedfile)
                if (isVerified) {
                    if (this.state.previewuploadedPhotos.length < this.state.uploadedPhotoLimit) {
                        this.setState(({ previewuploadedPhotos }) => ({
                            previewuploadedPhotos: previewuploadedPhotos.concat(selectedfile)
                        }))

                        console.log(this.state.selectedfile);

                        this.setState({
                            uploadedPhotos: this.state.uploadedPhotos.concat(selectedfile)
                        })

                        console.log(this.state.uploadedPhotos);

                    } else {
                        console.log(this.state.previewuploadedPhotos.length);
                        alert("You can upload a maximum of 5 images only!")
                    }
                }
            }
        }
    }

   
    addProduct =  async (e) => {
        console.log("In Add Product");
        console.log(this.state.startDate);
        var data = {
            productPrice: this.state.productPrice,
            productCategory: this.state.productCategory,
            productDescription: this.state.productDescription,
            productName: this.state.productName,
        }

        var formdata = new FormData();

        for (var i = 0; i < this.state.uploadedPhotos.length; i++) {
            formdata.append('productImage', this.state.uploadedPhotos[i]);
            console.log(this.state.uploadedPhotos[i]);
        }

        Object.keys(data).forEach(function (key) {
            formdata.append(key, data[key]);
        });

        // Display the key/value pairs
        for (var pair of formdata.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
      await this.props.postProduct(formdata, this.props.history).then(res => {
            if (this.state.productStatus === 200) {
                swal({
                  text: "Product added Sucessfully!"
                }).then(() => {
                    window.location.replace("/sellerHome");
                })
                
            }
              
              else {
                swal({
                  text: "Error adding product, please try again",
                  button: "ok"
                }).then()
              }
        })			
    }

   

    render() {

        let redirectVar = null;
        var productCategoryDropDown = [];

        const { errors } = this.state;
        console.log(errors);


        if (this.state.added) {
            redirectVar = <Redirect to="/sellerHome" />
        }


        if (this.state && this.state.productCategoryList) {
           
            productCategoryDropDown = this.state.productCategoryList.map(category => {
                return (
                    <option key={category._id} value={category.productCategoryName}>{category.productCategoryName}</option>
                );

            })
        }

        return (
            <div>
                {redirectVar}
                <Navbar />
                <br />
                <br />
                <div className="container" style={{ fontFamily: "Lato,Arial,Helvetica Neue,sans-serif", marginTop: "50px" }}>
                    <div className="row">
                        <div className="col-md-12">
                            <div id="accordion">
                                <div className="card">
                                    <div className="card-header" id = "product-header">
                                        <a className="card-link" id="product-link" data-toggle="collapse" href="#collapseOne">
                                            Add Product
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
                                                                <input id="productName" name="productName" onChange={this.onChange} 
                                                                value={this.state.productName} placeholder="Product Name" 
                                                                className={classnames('form-control payment-form-control', {
                                                                    'is-invalid': errors.productName
                                                                })} required="required" type="text" />
                                                                {errors.productName && (
                                                                    <div className="invalid-feedback">{errors.productName}</div>
                                                                )}
                                                            </div>

                                                            <div className="form-group col-md-9">
                                                                <input id="productDescription" name="productDescription"
                                                                 onChange={this.onChange} value={this.state.productDescription}
                                                                  placeholder="Product Description"    className={classnames('form-control payment-form-control', {
                                                                    'is-invalid': errors.productDescription
                                                                })} required="required" type="text" />
                                                                  {errors.productDescription && (
                                                                    <div className="invalid-feedback">{errors.productDescription}</div>
                                                                )}
                                                            </div>

                                                            <div className="form-group col-md-9">
                                                                <input id="productPrice" name="productPrice" onChange={this.onChange} 
                                                                value={this.state.productPrice} placeholder="Product Price" 
                                                                className={classnames('form-control payment-form-control', {
                                                                    'is-invalid': errors.productPrice
                                                                })} required="required" type="text" />
                                                                  {errors.productPrice && (
                                                                    <div className="invalid-feedback">{errors.productPrice}</div>
                                                                )}
                                                            </div>
                                                            <div className="form-group col-md-6">
                                                                <select    className={classnames('form-control payment-form-control', {
                                                                    'is-invalid': errors.productCategory
                                                                })} style={{ width: "100%" }} onChange={this.productCategoryChangeHandler}>
                                                                    <option style={{ color: "#ccc", }} value="" hidden>Product Category</option>
                                                                    {productCategoryDropDown}

                                                                </select><br />
                                                                {errors.productCategory && (
                                                                    <div className="invalid-feedback">{errors.productCategory}</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="card">
                        <div className="card-header" id="product-header">
                            <a className="collapsed card-link" id="product-link" data-toggle="collapse" href="#collapseFour">
                                Product Photos
                           </a>
                        </div>
                        <div id="collapseFour" className="collapse" data-parent="#accordion">
                            <div className="card-body text-center">
                                <h2>Add up to 5 photos of your product</h2>
                                <hr />
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-12 border card-body">
                                            <small>Showcase your product’s best features. Requirements: JPEG, at least 1920 x 1080 pixels, less than 20MB file size, 1 photos minimum.</small>

                                            {this.state.previewuploadedPhotos.length > 0 ? <div>
                                                <h2>Preview of {this.state.previewuploadedPhotos.length} uploaded files</h2>
                                                <div>{this.state.previewuploadedPhotos.map((selectedfile,i) => <img className="mypreview" key={i} src={selectedfile.preview} alt="Property Preview" />)}</div>
                                            </div> : null}
                                            <h2> Uploaded {this.state.uploadedPhotos.length} Files </h2>
                                            <br></br>
                                            <ReactDropzone name="uploadedPhoto" onDrop={this.onDrop} accept={acceptedFileTypes} multiple={true} maxSize={imageMaxSize} >
                                                Drop your images here!!
                                      </ReactDropzone>
                                            <div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <br />

                    <div className="form-row">
                        <button type="button" onClick={this.addProduct} className="btn btn-secondary">Add Product</button>
                        {this.state.alert}
                    </div>
                    <br />
                    <br />
                </div>

            </div>
        )
    }

}

AddProduct.propTypes = {
    getProductCategoryNames: PropTypes.func.isRequired,
    postProduct: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors : PropTypes.object.isRequired

}

const mapStateToProps = (state) => ({
    auth: state.auth,
    productCategoryResults: state.products.product_categories,
    status: state.products.status,
    errors: state.errors
})

export default connect(mapStateToProps, { postProduct, getProductCategoryNames })(AddProduct);