var { ProductCategory } = require('../models/ProductCategory');
var User = require('../models/User');
const { prepareSuccess, prepareInternalServerError } = require('./responses');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

exports.customerService = function customerService(msg, callback) {
    //console.log("In customer topic Service path:", msg.path);
    switch (msg.path) {
        case "productSearchResults":
            productSearchResults(msg, callback);
            break;
        case "addProductReview":
            addProductReview(msg, callback);
            break;
        case "getProduct":
            getProduct(msg, callback);
            break;
        case "getCustomerReview":
            getCustomerReview(msg, callback);
            break;
        case "getCustomerName":
            getCustomerName(msg, callback);
            break;
        case "updateProductViews":
            updateProductViews(msg, callback);
            break;
    }
};

function prepareQuery(request, sellerId, product) {
    let query = [];
    filterRating = 0;
    filterPrice = 0;


    if (request.productCategoryName && sellerId) {
        query.push(
            {
                $match: {
                    $and: [{ "productCategoryName": { $regex: request.productCategoryName, $options: "i" } },
                    { "seller": sellerId }]
                }
            },
            {
                $unwind: "$products",
            }
        );
    }
    else if (sellerId) {
        query.push(
            {
                $match: {
                    "seller": sellerId
                }
            },
            {
                $unwind: "$products"
            }

        )
    }
    else {
        if (request.productCategoryName) {
            query.push(
                {
                    $match: {
                        "productCategoryName": { $regex: request.productCategoryName, $options: "i" }
                    }
                },
                {
                    $unwind: "$products"
                },
            )
        }
        if (product) {
            query.push(
                {
                    $unwind: "$products"
                },
                {
                    $match: {

                        "products.productName": {
                            $regex: request.search, $options: "i"
                        }
                    }
                }
            )
        }

    }

    query.push(
        {
            $match: {
                "products.productRemoved": false
            }
        }
    )

    // if (request.priceLow && request.priceHigh) {
    query.push(

        { $match: { 'products.productPrice': { $gte: request.priceLow, $lte: request.priceHigh } } },

    )
    // }
    if (request.rating) {
        query.push(

            { $match: { 'products.productRating': { $gte: request.rating } } },

        )
    }

    if (request.sort === "Price Low-High") {
        query.push(
            { $sort: { 'products.productPrice': 1 } }
        )
    }
    if (request.sort === "Price High-Low") {
        query.push(
            { $sort: { 'products.productPrice': -1 } }
        )
    }
    if (request.sort === "Rating Low-High") {
        query.push(
            { $sort: { 'products.productRating': 1 } }
        )
    }
    if (request.sort === "Rating High-Low") {
        query.push(
            { $sort: { 'products.productRating': -1 } }
        )
    }

    console.log('query is', query);
    return query;
}

async function productSearchResults(msg, callback) {

    let response = {};
    let result = [];
    let productName = "";
    console.log("In product search ")
    console.log(msg.body);
    var pageLimit = 20;
    var currentPage = msg.body.currentPage;

    var sellerId = null;

    await User.findOne({ name: msg.body.search }).then(result => {
        if (result) {
            sellerId = result._id;
        }

    })
    console.log(sellerId);

    if (sellerId === null) {
        productName = msg.body.search;
    }

    result = await ProductCategory.aggregate(prepareQuery(msg.body, sellerId, productName)).catch(error => {
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

async function addProductReview(msg, callback) {
    let response = {};
    let err = {};
    let query = [];
    console.log("In customer topic service. Msg: ", msg);
    var review = {
        customerId: msg.user._id,
        comment: msg.body.comment,
        rating: msg.body.rating,
    };
    query.push(
        {
            $unwind: "$products"
        },
        {
            $match: { "products._id": ObjectId(msg.body._id) }
        },
        {
            $unwind: "$products.productReview"
        },
        {
            $count: "customers"
        }
    )
    console.log(query);
    let result = await ProductCategory.aggregate(query);

    console.log(result);

    let avgrating = msg.body.rating;
    if (result.length > 0) {
        avgrating = ((msg.body.productRating * result[0].customers) + msg.body.rating) / (result[0].customers + 1);
        console.log(avgrating);
    }
    await ProductCategory.updateOne(
        { "products._id": msg.body._id },
        {
            'products.$.productRating': avgrating,
            $addToSet: { 'products.$.productReview': review }
        },
        { new: true })
        .then((result) => {
            response = prepareSuccess(result);
            return callback(null, response);
        }).catch(error => {
            err = prepareInternalServerError(error);
            return callback(null, err);
        })
}


async function getProduct(msg, callback) {
    let response = {};
    let err = {};
    let sellerName = '';
    console.log("In customer topic service. Msg: ", msg);

    await ProductCategory.find({ "products._id": msg.body }, { "products.$": 1, "seller": 1, "productCategoryName": 1 })
        .then(async product => {

            await User.findOne({ _id: product[0].seller }).then(result => {
                if (result) {
                    sellerName = result.name;
                }
                product.push(sellerName);
                response = prepareSuccess(product);
                return callback(null, response);

            }).catch(error => {
                err = prepareInternalServerError(error);
                return callback(null, err);
            })
        }).catch(error => {
            err = prepareInternalServerError(error);
            return callback(null, err);
        })
}

async function updateProductViews(msg, callback) {
    let response = {};
    let err = {};
    let count;
    var dateTimeStamp = new Date().toString();
    var dateToday = dateTimeStamp.split(' ').splice(0, 4).join(' ');
    console.log(dateToday);

    await ProductCategory.find({ "products._id": msg.body.productId }, {
        "_id": 0, "products.$": 1
    })
        .then(async product => {

            console.log("count", product[0].products[0].productViewCount);
            if (msg.user.userType === 'customer') {

                if (product[0].products[0].productViewDate === dateToday) {
                    console.log("In If ......");
                    count = product[0].products[0].productViewCount;
                    count++;

                }
                else {
                    console.log("In else ......");
                    count = 1;
                }
            }
        }
        )
    console.log(dateToday, count);

    await ProductCategory.updateOne({ "products._id": msg.body.productId },
        {
            $set: {
                'products.$.productViewCount': count,
                "products.$.productViewDate": dateToday
            }
        }
        ,
        { new: true })
        .then((result) => {
            response = prepareSuccess();
            return callback(null, response);
        }).catch(error => {
            err = prepareInternalServerError(error);
            return callback(null, err);
        })
}

async function getCustomerName(msg, callback) {
    let response = {};
    let err = {};

    await User.findOne({ _id: msg.body }, { "name": 1, "_id": 0 }).then(result => {

        response = prepareSuccess(result);
        return callback(null, response);

    }).catch(error => {
        err = prepareInternalServerError(error);
        return callback(null, err);
    })
}

async function getCustomerReview(msg, callback) {
    let response = {};
    let err = {};

    console.log("In getCustomerReview, msg", msg);

    await ProductCategory.find({ "products.productReview.customerId": msg.user._id }, { "products.$": 1 })
        .then(product => {
            response = prepareSuccess(product);
            return callback(null, response);
        }).catch(error => {
            err = prepareInternalServerError(error);
            return callback(null, err);
        })
}