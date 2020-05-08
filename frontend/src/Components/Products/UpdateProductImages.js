import React, { Component } from 'react';
import './addProduct.css';
import Navbar from '../Navbar/Navbar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactDropzone from "react-dropzone";
import swal from 'sweetalert';

import { updateProductImage } from '../../actions/productActions';

const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif'
const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => { return item.trim() })
const imageMaxSize = 1000000000 // bytes

class UpdateProductImages extends Component {
    constructor(props) {
        super(props);
        this.state = {

            uploadedPhotos: [],
            uploadedPhotoLimit: 5,
            previewuploadedPhotos: [],
            inputPhotos: [],
            added: false,
            alert: null,
            productStatus: null,

        }

        this.onChange = this.onChange.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.updateImage = this.updateImage.bind(this);

    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
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


    updateImage = async (e) => {

        var data = {
            productCategory: this.props.location.state.productInfo.productCategoryName,
            productId: this.props.location.state.productInfo.products[0]._id,
            productName : this.props.location.state.productInfo.products[0].productName
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
        await this.props.updateProductImage(formdata, this.props.history)
    }



    render() {



        return (
            <div>

                <Navbar />
                <br />
                <br />
                <div className="container" style={{ fontFamily: "Lato,Arial,Helvetica Neue,sans-serif", marginTop: "50px" }}>
                    <div className="card">
                        <div className="card-header text-center" id="product-header">
                            <a className="collapsed card-link" id="product-link" data-toggle="collapse" href="#collapseFour">
                                Update Product Photos
                           </a>
                        </div>
                        <div id="collapseFour" className="collapse show" data-parent="#accordion">
                            <div className="card-body text-center">
                                <h2>Add up to 5 photos of your product</h2>
                                <hr />
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-12 border card-body">
                                            <small>Showcase your product’s best features. Requirements: JPEG, at least 1920 x 1080 pixels, less than 20MB file size.</small>

                                            {this.state.previewuploadedPhotos.length > 0 ? <div>
                                                <h2>Preview of {this.state.previewuploadedPhotos.length} uploaded files</h2>
                                                <div>{this.state.previewuploadedPhotos.map((selectedfile, i) => <img className="mypreview" key={i} src={selectedfile.preview} alt="Property Preview" />)}</div>
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

                            <div class="text-center"><button type="button" onClick={this.updateImage} className="btn btn-secondary">Update Product Images</button></div>
                            <br />
                        </div>
                    </div>
                    <br />
                    <br />

                </div>

            </div>
        )
    }

}

UpdateProductImages.propTypes = {

    auth: PropTypes.object.isRequired,

}

const mapStateToProps = (state) => ({
    auth: state.auth,

})

export default connect(mapStateToProps, { updateProductImage })(UpdateProductImages);