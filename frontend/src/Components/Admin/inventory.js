import React, { Component } from 'react';
import Navbar from './adminNavbar';
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './admin.css'

class inventory extends Component {
    constructor() {
        super();
        this.state = {
            categories: [],
            searchString: "",
            modal: false
        };
        this.searchChangeHandler = this.searchChangeHandler.bind(this);
        //this.showModal = this.showModal.bind(this);
    }
    searchChangeHandler(e) {
        this.setState({ searchString: e.target.value });
    }
    showModal = () => {
        console.log('hello');
        this.setState({
            modal: !this.state.modal
        });
    };
    componentDidMount() {
        axios("/getProductCategories", {
            method: "get"
        }).then(response => {
            this.setState({
                categories: this.state.categories.concat(response.data)
            })
            console.log(this.state.categories);
        });
    }

    render() {
        const closeBtn = (
            <button className="close" onClick={() => this.showModal()}>
                &times;
            </button>
        );
        let productCategory = this.state.categories.map(category => {
            if (
                category.productCategoryName.toUpperCase()
                    .includes(this.state.searchString.toUpperCase())
            ) {
                return (
                    <tr>
                        <td>{category.productCategoryName}</td>
                        <td>
                            <Link
                                to="/viewsellerProfile"
                                className="btn btn-danger btn-sm"
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
                    <button type="button" class="btn btn-success" onClick={() => this.showModal()}>Add Product Category</button>

                    

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
                                <div className="dash-header">Product Categories</div>
                                {this.state.categories.length > 0 ? (
                                    <div className="col-10">
                                        <table className="table table-striped table-bordered">
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
                        This is modal body
                    </ModalBody>
                    <ModalFooter>
                        {/* <Button
                        color="secondary"
                        onClick={() => this.showModal()}
                      >
                        Cancel
                      </Button> */}
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default inventory;