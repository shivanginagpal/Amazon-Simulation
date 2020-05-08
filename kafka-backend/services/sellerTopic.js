
var { ProductCategory } = require('../models/ProductCategory');
const { prepareSuccess, prepareInternalServerError, prepareNoContent } = require('./responses');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

exports.sellerService = function sellerService(msg, callback) {
    //console.log("In seller topic Service path:", msg.path);
    switch (msg.path) {
        case "addProduct":
            addProduct(msg, callback);
            break;
        case "sellerProductSearch":
            sellerProductSearch(msg, callback)
            break;
        case "productUpdate":
            productUpdate(msg, callback)
            break;
        case "productImageUpdate":
            productImageUpdate(msg, callback)
            break;
        case "removeProduct":
            removeProduct(msg, callback)
            break;

    }
};

function prepareQuery(request) {
    let query = [];
    let sellerId = ObjectId(request.body.sellerId);
    console.log(request);
    // get products only for that particular seller
    query.push({
        $match: {
            $and: [{ "productCategoryName": { $regex: request.body.productCategoryName, $options: "i" } },
            { "seller": sellerId }]
        }
    },
        {
            $unwind: "$products"
        },
    );
    //search for product name
    if (request.body.search) {
        query.push(
            {
                $match: {
                $and: [{ "products.productName": { $regex: request.body.search, $options: "i" } },
                        { "seller": sellerId },
                        { "productCategoryName": { $regex: request.body.productCategoryName, $options: "i" } } 
                      ]
            }
                
            }
        );
    }
    query.push(
        {
            $match: {
                "products.productRemoved": false
            }
        }
    )
    console.log('query is', query);
    return query;
}

function addProduct(msg, callback) {
    let response = {};
    let err = {};
    console.log("In seller topic service. Msg: ", msg);

    ProductCategory.find({
        $and: [{ "productCategoryName": msg.body.productCategory }, { "seller": msg.user._id }]
    }).select().then(async result => {
        console.log("product received");
        console.log(result);

        // create new product category and add product 
        if (result.length === 0) {
            var newProductCategory = new ProductCategory({
                productCategoryName: msg.body.productCategory,
                seller: msg.user._id,
            })

            newProductCategory.save(async (error, result1) => {
                if (error) {
                    console.log(error);
                    err.status = 410;
                    err.message = "could not create new product category";
                    err.data = error;
                    return callback(err, null);
                } else {
                    console.log("product category created " + result1);
                    var newProduct = {
                        productName: msg.body.productName,
                        productPrice: msg.body.productPrice,
                        productDescription: msg.body.productDescription,
                        productImage: msg.images.productImage,
                    }
                    ProductCategory.update(
                        { _id: result1._id },
                        { $push: { products: newProduct } },
                        { new: true }
                    )
                        .then(result2 => {
                            console.log("product added" + result2);
                            response.status = 200;
                            response.message = "product added";
                            return callback(null, response);
                        })
                        .catch(error => {
                            console.log(error);
                            err.status = 410;
                            err.message = "could not append to product category";
                            err.data = error;
                            return callback(err, null);
                        })
                }
            })
        }
        else {
            // append to existing product category
            console.log("append to product category");

            var newProduct = {
                productName: msg.body.productName,
                productPrice: msg.body.productPrice,
                productDescription: msg.body.productDescription,
                productImage: msg.images.productImage,
            }
            console.log(msg.images.productImage);
            console.log(newProduct);

            ProductCategory.update(
                { _id: result[0]._id },
                //  { $push: { products: newProduct } },
                { $addToSet: { products: newProduct } },
                { new: true }
            )
                .then(result3 => {
                    console.log("product added" + result3);
                    response.status = 200;
                    response.message = "product added";
                    return callback(null, response);
                })
                .catch(error => {
                    console.log(error);
                    err.status = 411;
                    err.message = "could not append to product category";
                    err.data = error;
                    return callback(err, null);
                })
        }

    }).catch(error => {
        console.log(error);
        err.status = 412;
        err.message = "could not get product category";
        err.data = error;
        return callback(err, null);
    })

}

async function sellerProductSearch(msg, callback) {

    let err = {};
    let response = {};
    var pageLimit = 20;
    var currentPage = msg.body.currentPage;
    let result = [];

    result = await ProductCategory.aggregate(prepareQuery(msg)).catch(error => {
        console.log(error);
        err = prepareInternalServerError();
        return callback(null, err);
    })

    let pageMax = Math.ceil(result.length / pageLimit);

    if (currentPage > pageMax) {
        currentPage = pageMax;
    }
    let start = (currentPage - 1) * pageLimit;
    let end = currentPage * pageLimit;
    result = result.slice(start, end);

    response = prepareSuccess(result);
    return callback(null, response);

}

async function productUpdate(msg, callback) {
    let err = {};
    let response = {};
    const productFields = {};

    if (msg.body.productDescription) productFields.productDescription = msg.body.productDescription;
    if (msg.body.productPrice) productFields.productPrice = msg.body.productPrice;
    if (msg.body.productName) productFields.productName = msg.body.productName;


    await ProductCategory.findOne({ $and: [{ "productCategoryName": msg.body.productCategory }, { "seller": msg.user._id }] })
        .then(async productcategory => {
            if (productcategory) {
              //check for the product and update price and description
                let existingproduct = await productcategory.products.find(product => product._id == msg.body.productId);
                if (existingproduct) {
                    console.log(existingproduct);
                    if (msg.body.productDescription) {
                        existingproduct.productDescription = msg.body.productDescription;
                    }
                    if (msg.body.productPrice) {
                        existingproduct.productPrice = msg.body.productPrice;
                    }

                    await productcategory.save().then(result => {
                        response = prepareSuccess(existingproduct);
                        return callback(null, response);
                    }).catch(error => {
                        err = prepareInternalServerError(error);
                        return callback(null, err);
                    })

                }
                else {
                    response = prepareNoContent();
                    return callback(null, response);
                }

            }
        }).catch(error => {
            err = prepareInternalServerError(error);
            return callback(null, err);
        })
}

async function productImageUpdate(msg, callback) {

    let err = {};
    let response = {};

    await ProductCategory.findOne({ $and: [{ "productCategoryName": msg.body.productCategory }, { "seller": msg.user._id }] })
        .then(async productcategory => {
            if (productcategory) {
               // check for product and update image
                let existingproduct = await productcategory.products.find(product => product._id == msg.body.productId);
                if (existingproduct) {
                    console.log(existingproduct);
                    existingproduct.productImage = msg.images.productImage;

                    await productcategory.save().then(result => {
                        response = prepareSuccess(existingproduct);
                        return callback(null, response);
                    }).catch(error => {
                        err = prepareInternalServerError(error);
                        return callback(null, err);
                    })

                }
                else {
                    response = prepareNoContent();
                    return callback(null, response);
                }

            }
        }).catch(error => {
            err = prepareInternalServerError(error);
            return callback(null, err);
        })

}

async function removeProduct(msg, callback) {
    let err = {};
    let response = {};

    await ProductCategory.updateOne(
        { "products._id": msg.body.productId },
        {
            'products.$.productRemoved': true,
        },
        { new: true })
        .then(product => {
            response = prepareSuccess(product);
            return callback(null, response);
        }).catch(error => {
            err = prepareInternalServerError(error);
            return callback(null, err);
        })
}