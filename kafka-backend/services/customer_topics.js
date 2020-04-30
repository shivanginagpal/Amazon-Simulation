var { ProductCategory } = require('../models/ProductCategory');
var User = require('../models/User');
const { prepareSuccess, prepareInternalServerError } = require('./responses');
const redisClient = require("../utils/redisConfig");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;



exports.customerService = function customerService(msg, callback) {
   // console.log("In customer topic Service path:", msg.path);
    switch (msg.path) {
        case "productSearchResults":
            productSearchResults(msg, callback);
            break;
        case "addProductReview":
            addProductReview(msg, callback);
            break;
        case "addProductRating":
            addProductRating(msg, callback);
            break;

    }
};


function prepareQuery(request, sellerId, product) {
    let query = [];


    if (request.productCategoryName && sellerId) {
        query.push(
            {
                $match: {
                    $and: [{ "productCategoryName": { $regex: request.productCategoryName, $options: "i" } },
                    { "seller": sellerId }]
                }
            },
            {
                $unwind: "$products"
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
    console.log('query is', query);
    return query;
}
async function productSearchResults(msg, callback) {

     let response = {};
    let result = {};
    let productName = "";
    // console.log("In product search ==============================================================================")
    // console.log(msg.body);

    var sellerId = null;

    // await User.findOne({ name: msg.body.search }).then(result => {
    //     if (result) {
    //         sellerId = result._id;
    //     }

    // })
    // console.log(sellerId);

    // if (sellerId === null) {
    //     productName = msg.body.search;
    // }

    redisClient.get(msg.body.productCategoryName, async (err, products) => {
        if (products) {
            products = JSON.parse(products);
            console.log('REDIS HIT')
            //response.status = 200;
             response = prepareSuccess(products);
            return callback(null, response);
        } else {
            result = await ProductCategory.aggregate(prepareQuery(msg.body, sellerId, productName))
                .skip(msg.body.pageLimit * (msg.body.currentPage - 1)).limit(msg.body.pageLimit).catch(error => {
                    console.log(error);
                    err = prepareInternalServerError();
                    return callback(err, null);
                })
            redisClient.setex(msg.body.productCategoryName, 36000, JSON.stringify(result), function (error, reply) {
                if (error) {
                    console.log(error);
                }
            });
            response = prepareSuccess(result);
            console.log(response);
            return callback(null, response);
        }
    })
}

async function addProductRating(msg, callback) {
    let response = {};
    let err = {};
    await ProductCategory.findOne({ "products._id": msg.body._id })
        .select('products')
        .then(async result => {
            if (result.products.productReview) {
                db.users.aggregate([
                    { count: { $size: '$result.products.productReview.CustomerId' } }
                ])
                await ProductCategory.findOneAndUpdate(({ "products._id": msg.body._id },
                    { $set: { "products.productRating": result.products.productReview.rating / count } }))
                    .then(result1 => {
                        response.data = result1;
                        response.status = 200;
                        return callback(null, response);
                    }).catch(error => {
                        console.log(error);
                        err.status = 410;
                        err.message = "could not add product rating to product";
                        err.data = error;
                        return callback(err, null);
                    })
            }
        });
}


async function addProductReview(msg, callback) {
    let response = {};
    let err = {};
    let query = [];
    console.log("In seller topic service. Msg: ", msg);
    var review = {
        customerId: msg.body.customerId,
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
    let result = await ProductCategory.aggregate(query)


    var { customers } = result;
    console.log(customers);
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
            return callback(err, null);
        })



}