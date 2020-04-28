var mongoose = require('mongoose');
var { addProductCat } = require('../models/addProductCat');
var { ProductCategory } = require('../models/ProductCategory');
const {prepareSuccess,prepareInternalServerError,prepareNoContent} = require('./responses');
const User = require('../models/User');

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
    }
}; 

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