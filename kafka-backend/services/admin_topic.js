var mongoose = require('mongoose');
var { addProductCat } = require('../models/addProductCat');
var { ProductCategory } = require('../models/ProductCategory');
const {prepareSuccess,prepareInternalServerError,prepareNoContent} = require('./responses');
const User = require('../models/User');
const Order = require('../models/Order');
const ObjectId = mongoose.Types.ObjectId;

exports.adminService = function adminService(msg, callback) {
    console.log("In admin Profile service path:", msg.path);
    switch (msg.path) {
        case "addProductCategory":
            addProductCategory(msg, callback);
            break;
        case "getProductCategories":
            getProductCategories(msg, callback);
            break;
        case "removeProductCategory":
            removeProductCategory(msg, callback);
            break;
        case "viewSellersList":
            viewSellersList(msg, callback);
            break;
        case "viewProducts":
            viewProducts(msg, callback);
            break;
        case "viewProductsUnderSeller":
            viewProductsUnderSeller(msg, callback);
            break;
        case "getAdminViewOrders":
            getAdminViewOrders(msg, callback);
            break;   
        case "orderStatusChangeAdmin":
            orderStatusChangeAdmin(msg, callback);
            break; 
    }
}; 

async function orderStatusChangeAdmin(msg, callback) {
    let response = {};
    let err = {};

    Order.update({
        "_id":msg.body.id},
        {
            $set:{
                "orderStatus":msg.body.status
            }
        }
        ).then(async result => {
            response.status=200;
            response.data="Succesfully changed the order status";
            return callback(null, response)
        }).catch(err => {
            err.status = 400;
            err.message = "Error in removing category";
            return callback(err, null);
        });
}

async function viewProductsUnderSeller(msg, callback) {
    let response = {};
    let err = {};
    let result={};
    var pageLimit = 20;
    var currentPage = msg.body.currentPage;
    console.log("In admin topic service. Msg: ", msg);
    var sellerId = msg.body.id;
    var query = [];
    query.push(
        {
            $match: {
                "seller": ObjectId(sellerId)
            }
        },
        {
            $unwind: "$products"
        },
    )
    result = await ProductCategory.aggregate(query).catch(error => {
        console.log(error);
        err = prepareInternalServerError();
        return callback(null, err);
    })
        let pageMax = Math.ceil(result.length / pageLimit);
        if (currentPage > pageMax) {
            currentPage = pageMax;
        }
        let start = (currentPage - 1)* pageLimit;
        let end = currentPage * pageLimit;
        result = result.slice(start, end);
        response.status = 200;
        response.data = result;
        return callback(null, response);
}


// async function viewProducts(msg, callback) {
//     let response = {};
//     let err = {};
//     let product = {};
//     var pageLimit = 20;
//     var currentPage = msg.body.currentPage;
//     console.log("In admin topic service. Msg: ", msg);
//     var query=[];
//     query.push(
//         {
//             $match: {
//                 "productCategoryName": { $regex: msg.body.productCategory, $options: "i" }
//             }
//         },
//         {
//             $unwind: "$products"
//         },
//     )
//     await ProductCategory.aggregate(query)
//     .then(async product => {
//         await User.findOne({_id: product[0].seller})
//         .then(result => {
//             if(result){
//                 sellerName = result.name
//             }
//             //product.push(sellerName);
//             let pageMax = Math.ceil(product.length / pageLimit);
//             if (currentPage > pageMax) {
//                 currentPage = pageMax;
//             }
//             let start = (currentPage - 1) * pageLimit;
//             let end = currentPage * pageLimit;
//             product = product.slice(start, end);
//             response.status = 200;
//             response.data = product;
//             return callback(null, response); 
//         }).catch(error => {
//             console.log(error);
//             err = prepareInternalServerError();
//             return callback(null, err);
//         })
//     }).catch(error => {
//         console.log(error);
//         err = prepareInternalServerError();
//         return callback(null, err);
//     })
//     // let pageMax = Math.ceil(product.length / pageLimit);
//     // if (currentPage > pageMax) {
//     //     currentPage = pageMax;
//     // }
//     // let start = (currentPage - 1) * pageLimit;
//     // let end = currentPage * pageLimit;
//     // product = product.slice(start, end);
//     // response.status = 200;
//     // response.data = product;
//     // return callback(null, response);    
// }

async function viewProducts(msg, callback) {
    let response = {};
    let err = {};
    let product = {};
    var pageLimit = 20;
    var currentPage = msg.body.currentPage;
    console.log("In admin topic service. Msg: ", msg);
    var query = [];
    query.push(
        {
            $match: {
                "productCategoryName": { $regex: msg.body.productCategory, $options: "i" }
            }
        },
        {
            $unwind: "$products"
        },
    )
    await ProductCategory.aggregate(query)
        .then(async product => {
            let pdata = async() => {return Promise.all(product[0].map(async item => {
                return User.findOne({"_id":item.seller})
                .then(user =>{
                    sellerName = user.name;

                    sname ={
                        sellerName: sellerName
                    }
                    product.push(sname);
                })
            }))}
            pdata().then(data => {
                result = {
                    product:product
                }
                let pageMax = Math.ceil(product.length / pageLimit);
                if (currentPage > pageMax) {
                    currentPage = pageMax;
                }
                let start = (currentPage - 1) * pageLimit;
                let end = currentPage * pageLimit;
                product = product.slice(start, end);
                response.status = 200;
                response.data = product;
                return callback(null, response);
            })
            .catch(error => {
                    console.log(error);
                    err = prepareInternalServerError();
                    return callback(null, err);
                })
        }).catch(error => {
            console.log(error);
            err = prepareInternalServerError();
            return callback(null, err);
        })
    // let pageMax = Math.ceil(product.length / pageLimit);
    // if (currentPage > pageMax) {
    //     currentPage = pageMax;
    // }
    // let start = (currentPage - 1) * pageLimit;
    // let end = currentPage * pageLimit;
    // product = product.slice(start, end);
    // response.status = 200;
    // response.data = product;
    // return callback(null, response);    
}

function addProductCategory(msg, callback) {
    let response = {};
    let err = {};
    console.log("In admin topic service. Msg: ", msg);

    addProductCat.find({
        $and: [{ "productCategoryName": msg.body.productCategory }]
    }).select().then(async result => {
        console.log("product category", result);
        if (result.length === 0) {
            var newProductCategory = new addProductCat({
                productCategoryName: msg.body.productCategory
            })
            newProductCategory.save().then(result1 => {
                response.data = result1;
                response.message = "successfully added Product category";
                response.status = 200;
                return callback(null, response);
            }).catch(err => {
                err.status = 400;
                err.message = "Error in adding category";
                return callback(err, null);
            });
        } else {
            response.status = 401;
            response.message = "Product category already exists";
            return callback(null, response);
        }
    }).catch(error => {
        console.log(error);
        err.status = 412;
        err.message = "could not add product category";
        err.data = error;
        return callback(err, null);
    })
}

function getProductCategories(msg, callback) {
    let response = {};
    let err = {};
    console.log("In admin topic service. Msg: ", msg);

    addProductCat.find().select('productCategoryName')
        .then(async result => {
            if (result.length === 0) {
                response = prepareNoContent(result);
                return callback(null, response);
            }
            else {
                response = prepareSuccess(result);
                return callback(null, response);
            }
        }).catch(error => {
            err = prepareInternalServerError(error);
            return callback(err, null);
        })
}

function removeProductCategory(msg,callback){
    let response = {};
    let err = {};
    console.log("In admin topic service. Msg: ", msg);
    
    ProductCategory.find({"productCategoryName": msg.body.productCategory
    }).select().then(async result => {
        if(result.length === 0){
            addProductCat.deleteOne({ "_id": msg.body.id})
            .then(result => {
                response.message="successfully removed product category";
                response.status=200;
                return callback(null, response)
            }).catch(err => {
                err.status = 400;
                err.message = "Error in removing category";
                return callback(err, null);
            });
        } else {
            response.status = 201;
            response.message = "Product category contains Products cannot be removed";
            return callback(null, response);
        }
    }).catch(error => {
        console.log(error);
        err.status = 412;
        err.message = "could not remove product category";
        err.data = error;
        return callback(err, null);
    })
}

async function viewSellersList(msg,callback){
    let response = {};
    let err = {};
    console.log("In admin topic service. Msg: ", msg);
    return await User.find({ "userType": "seller"})
        .then((result) => {
            response.status = 200;
            response.message = "successfully retrieved sellers";
            response.data = result;
            return callback(null, response);   
        }).catch((error) => {
            err.status = 400;
            err.message = "error in getting sellers";
            err.data = error;
            return callback(err, null);
        });
}

async function getAdminViewOrders(msg, callback) {
    let response = {};
    let err = {};
    return await Order.find().then((result) => {
        response.status = 200;
        response.message = "successfully retrieved sellers";
        response.data = result;
        return callback(null, response);
    }).catch((error) => {
        err.status = 400;
        err.message = "error in getting sellers";
        err.data = error;
        return callback(err, null);
    });
}