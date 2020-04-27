var { ProductCategory } = require('../models/ProductCategory');
var User = require('../models/User');
const { prepareSuccess, prepareInternalServerError } = require('./responses');


exports.customerService = function customerService(msg, callback) {
    console.log("In customer topic Service path:", msg.path);
    switch (msg.path) {
        case "productSearchResults":
            productSearchResults(msg, callback);
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
    console.log("In product search ")
    console.log(msg.body);

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

           result = await ProductCategory.aggregate(prepareQuery(msg.body, sellerId,productName))
           .skip(msg.body.pageLimit * (msg.body.currentPage - 1)).limit(msg.body.pageLimit).catch(error => {
            console.log(error);
            err = prepareInternalServerError();
            return callback(err, null);
        })

    response = prepareSuccess(result);
    console.log(response);
    return callback(null, response);


}