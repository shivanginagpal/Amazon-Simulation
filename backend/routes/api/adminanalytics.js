const express = require('express');
const router = express.Router();
const passport = require('passport');
var kafka = require('../../kafka/client');
const passportAuth = passport.authenticate('jwt', { session: false });
const Order = require('../../models/Order');
const Seller = require('../../models/Seller');
const User = require('../../models/User');

router.get("/noOfOrdersPerDay",  (req , res) => {
    console.log("IN NOOF ORDERS PER DAY");
    Order.aggregate([
        {
            $group:{
                _id:"$orderDate",
                orders:{$sum:1}
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

router.get("/top5Customers",(req,res) => {
    

});

router.get("/top5Sellers",(req,res) => {

});
router.get("/top5SoldProducts", (req, res) => {
    console.log("IN top5SoldProducts ");
    Order.aggregate([
        {
            $unwind: "$products"
        },{
            $group:{
                _id: "$products.productName",
                count: {
                    $sum: "$products.productQuantity"
                }
            }
        },{
            $sort:{"count":-1}
        }   
        ]).limit(5)
        .then(result => {
            console.log("messages retreived", result);
            res.end(JSON.stringify(result));
        }).catch(err => {
            console.log(err);
            res.end("could not get messages");
        })
})


module.exports = router;