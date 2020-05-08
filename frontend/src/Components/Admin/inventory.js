import React, { Component } from 'react';
import Navbar from './adminNavbar';
import axios from "axios";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './admin.css';
import { hostaddress } from './settings';


class inventory extends Component {
    constructor() {
        super();
        this.state = {
            categories: [],
            searchString: "",
            productCat: '',
            category: null,
            modal: false
        };
        this.searchChangeHandler = this.searchChangeHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
        //this.showModal = this.showModal.bind(this);
    }
    searchChangeHandler(e) {
        this.setState({ searchString: e.target.value });
    }
    handleChange = (e) => {
        this.setState({
            productCat: e.target.value
        });

    }
    showModal = () => {
        console.log('hello');
        this.setState({
            modal: !this.state.modal
        });
    };
    componentWillMount() {
        axios("/getProductCategories", {
            method: "get"
        }).then(response => {
            this.setState({
                categories: this.state.categories.concat(response.data)
            })
            console.log(this.state.categories);
        });
    }
    deleteProductCategory = (category) => {
        const data ={
            id:category._id,
            productCategory: category.productCategoryName
        }
        console.log("deleteProductcategory data", data);
        
        axios.post("/removeProductCategory", data)
        .then(res => {
            console.log(res);
            if(res.status === 200){
            swal({
                title: "Deleted!",
                text: "You Successfully deleted product category!",
                icon: "success",
                button: "OK"
            })
                .then(() => {
                    window.location.reload();
                })
            .catch(error => console.log(error.response.data));
            } else if (res.status === 201) {
                swal({
                    title: "Sorry!",
                    text: "cannot delete product category!",
                    icon: "error",
                    button: "OK"
                })
                    .then(() => {
                        window.location.reload();
                    })
                    .catch(error => console.log(error.response.data));
            }
        }
        ).catch(error => {console.log(error)});   
    }

    addProductCategory = (e) => {
        const data ={
            productCategory: this.state.productCat
        }

        axios("/addProductCategory",{
            method: 'post',
            data: data
        }).then((response) => {
            console.log(response);
            if(response.status === 200){
                swal({
                    title:"Success",
                    text: "Product category added successfully",
                    icon: "success",
                    button: "OK"
                }).then(() => {
                    window.location.reload();
                })
                    .catch(error => console.log(error.response.data));
            } else if(response.status === 201){
                swal({
                    title: "Sorry",
                    text: "Product category already exists",
                    icon: "error",
                    button: "OK"
                }).then(() => {
                    window.location.reload();
                })
                    .catch(error => console.log(error.response.data));

            }
        }).catch((error) => {
            console.log('add project not 2xx response');
        });
    }

    render() {
        const closeBtn = (
            <button className="close" onClick={() => this.showModal()}>
                &times;
            </button>
        );
        let productCategory = this.state.categories.map(category => {
            let url = 'http://'+ hostaddress + ':3000/viewProductsUnderCategory/' + category.productCategoryName;
            if (
                category.productCategoryName.toUpperCase()
                    .includes(this.state.searchString.toUpperCase())
            ) {
                return (
                    <tr>
                        <td><a href={url}>{category.productCategoryName}</a></td>
                        <td>
                            <Link
                                className="btn btn-danger btn-sm"
                                onClick={() => this.deleteProductCategory(category)}
                            >
                                Delete
                            </Link>
                        </td>
                    </tr>
                )
            }
        })

        return (
            <div>
                <Navbar />
                <div className="container">
                    <button type="button" class="btn btn-success" id="addproductcategory" onClick={() => this.showModal()}>Add Product Category</button>
                    <nav class="navbar navbar-light bg-light">
                        <form class="form-inline">
                            <input
                                class="form-control mr-sm-2"
                                type="search"
                                onChange={this.searchChangeHandler}
                                value={this.state.searchString}
                                placeholder="Search"
                                aria-label="Search"
                            />
                        </form>
                    </nav>
                    <div className="row justify-content-center align-items-center">
                        <div className="col-12">
                            <div className="dash-one">
                                <div className="display-4">Product Categories</div>
                                {this.state.categories.length > 0 ? (
                                    <div className="col-10">
                                        <table className="table table-striped table-bordered lead">
                                            <thead>
                                                <tr>
                                                    <th>Product Category</th>
                                                </tr>
                                            </thead>
                                            <tbody>{productCategory}</tbody>
                                        </table>
                                    </div>
                                ) : (
                                        <div>
                                            <h4 style={{ margin: "3em" }}>No Product categories to display!</h4>
                                        </div>
                                    )}

                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    isOpen={this.state.modal}
                    toggle={() => this.showModal()}
                    className="modal-popup"
                    scrollable
                >
                    <ModalHeader
                        toggle={() => this.showModal()}
                        close={closeBtn}
                    >
                        Add Product Category
                    </ModalHeader>
                    <ModalBody className="modal-body">
                        {/* <form > */}
                            <div className="form-group">
                                <h4 className="font-weight-bold">Product Category: </h4><br />
                                <input onChange={this.handleChange} name='projectTitle' className='form-control' type='text' required></input><br /><br />
                            </div>
                            <button className='btn btn-primary' onClick={() => this.addProductCategory()}>Submit</button>
                        {/* </form> */}
                    </ModalBody>
                    <ModalFooter>
                        <Button
                        color="secondary"
                        onClick={() => this.showModal()}
                      >
                        Cancel
                      </Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default inventory;