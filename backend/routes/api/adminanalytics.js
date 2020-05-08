const express = require('express');
const router = express.Router();
const Order = require('../../models/Order');
var { ProductCategory } = require('../../models/ProductCategory');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

router.get("/noOfOrdersPerDay", (req, res) => {
    Order.aggregate([
        {
            $project:{
                orderId: "$_id",
                date: { $dateToString: { format: "%Y-%m-%d", date: "$orderDate" } }
            }
        },
        {
            $group:
             {
                _id: "$date",
                count: {
                    $sum: 1
                }
            }
        }])
        .then(result => {
            console.log("messages retreived", result);
            res.end(JSON.stringify(result));
        }).catch(err => {
            console.log(err);
            res.end("could not get messages");
        })
})

router.get("/orderStatusAdminGraph", (req, res) => {
    console.log("IN NOOF ORDERS PER DAY");
    Order.aggregate([
        {
            $group: {
                _id: "$orderStatus",
                orders: { $sum: 1 }
            }
        }])
        .then(result => {
            console.log("messages retreived", result);
            res.end(JSON.stringify(result));
        }).catch(err => {
            console.log(err);
            res.end("could not get messages");
        })
})

router.get("/top5Customers", (req, res) => {
    Order.aggregate([
        {
            $group: {
                _id: "$customerName",
                amount: {
                    $sum: "$totalAmount"
                }
            }
        }, {
            $sort: { "amount": -1 }
        }
    ]).limit(5)
        .then(result => {
            res.end(JSON.stringify(result));
        }).catch(err => {
            res.end("could not get messages");
        })
});
router.get("/top10ProductsViewed",(req, res) => {
    ProductCategory.aggregate([
        {
            $unwind: "$products"
        },{
            $project: {
                "_id":0,
                "productName": "$products.productName",
                "count": "$products.productViewCount"
            }
        },{
            $sort:{"count":-1}
        }
    ]).limit(10)
        .then(result => {
            res.end(JSON.stringify(result));
        }).catch(err => {
            res.end("could not get messages");
        })
        
})
router.get("/top10ProductsBasedOnRating", (req, res) => {
    ProductCategory.aggregate([
        {
            $unwind: "$products"
        }, {
            $project: {
                "productName": "$products.productName",
                "productRating": "$products.productRating"
            }
        }, {
            $sort: { "productRating": -1 }
        }
    ]).limit(10)
        .then(result => {
            res.end(JSON.stringify(result));
        }).catch(err => {
            res.end("could not get messages");
        })
})


router.get("/top5Sellers", (req, res) => {
    Order.aggregate([
        {
            $unwind:"$products"
        },
        {
            $group: {
                _id: "$products.productSellerName",
                amount: {
                    $sum: {
                        $multiply: ["$products.productPrice",
                            "$products.productQuantity"]
                    }
                }
            }
        }, {
            $sort: { "amount": -1 }
        }
    ]).limit(5)
        .then(result => {
            res.end(JSON.stringify(result));
        }).catch(err => {
            res.end("could not get messages");
        })
});

router.put("/sellerStatistics", (req, res) => {
    var sellerId = req.body.id;
    Order.aggregate([
        {
            $unwind: "$products"
        }, {
            $match: {
                "products.productSellerId": ObjectId(sellerId)
            }
        }, {
            $group: {
                _id: "$products.productName",
                quantity: {
                    $sum: "$products.productQuantity"
                },
                totalAmount: {
                    $sum: { $multiply: ["$products.productPrice", "$products.productQuantity"] }
                }
            }
        }
    ]).then(result => {
        res.end(JSON.stringify(result));
    }).catch(err => {
        res.end("could not get messages");
    })
})

router.put("/monthlySellerAmount", (req,res) => {
    var sellerId = req.body.id;
    Order.aggregate([
        {
            $unwind: "$products"
        },{
            $match: {
                "products.productSellerId": ObjectId(sellerId)
            }
        },{
            $project:{
                month: { "$month": "$orderDate" },
                products: "$products"
            }
        },{
            $group:{
                _id: "$month",
                totalAmount: {
                    $sum: {
                        $multiply: ["$products.productPrice",
                            "$products.productQuantity"]
                    }
                }
            }
        }
    ]).then(result => {
        res.end(JSON.stringify(result));
    }).catch(err => {
        res.end("could not get messages");
    })
})

router.get("/top5SoldProducts", (req, res) => {
    console.log("IN top5SoldProducts ");
    Order.aggregate([

        {
            $unwind: "$products"
        }, {
            $group: {
                _id: "$products.productName",
                count: {
                    $sum: "$products.productQuantity"
                }
            }
        }, {
            $sort: { "count": -1 }
        }

    ]).limit(5)
        .then(result => {
            res.end(JSON.stringify(result));
        }).catch(err => {
            res.end("could not get messages");
        })
})


module.exports = router;