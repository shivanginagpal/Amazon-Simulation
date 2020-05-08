'use strict'
const express = require('express');
const router = express.Router();
const kafka = require('../../kafka/client');
const passport = require('passport');
const passportAuth = passport.authenticate('jwt', { session: false });

router.post('/addProductCategory', (req, res) => {
    console.log(req.body);
    kafka.make_request("admin_topic", { "path": "addProductCategory", "body": req.body }, function (err, results) {
        console.log("In make request call back", results);
        if (err) {
            console.log("Inside err");
            console.log(err);
            return res.status(err.status).send(err.message);
        } else {
            console.log("Inside else", results);
            if (results.status === 200) {
                return res.status(results.status).send(results.data);
            } else if (results.status === 401) {
                return res.status(results.status).send(results.data);
            }
            else {
                return res.status(results.status).send(results.errors);
            }
        }
    })
})

router.post('/orderStatusChangeAdmin',(req, res) => {
    console.log(req.body);
    kafka.make_request("admin_topic", { "path":"orderStatusChangeAdmin","body":req.body}, function(err, results){
        console.log("In make request call back", results);
        if (err) {
            console.log("Inside err");
            console.log(err);
            return res.status(err.status).send(err.message);
        } else {
            console.log("Inside else", results);
            if (results.status === 200) {
                return res.status(results.status).send(results);
            } 
            else {
                return res.status(results.status).send(results.errors);
            }
        }
    }) 
})

router.post('/removeProductCategory', (req,res)=> {
    console.log(req.body);
    kafka.make_request("admin_topic", { "path": "removeProductCategory", "body": req.body }, function (err, results) {
        console.log("In make request call back", results);
        if (err) {
            console.log("Inside err");
            console.log(err);
            return res.status(err.status).send(err.message);
        } else {
            console.log("Inside else", results);
            if (results.status === 200) {
                return res.status(results.status).send(results);
            } else if (results.status === 201) {
                return res.status(results.status).send(results);
            }
            else {
                return res.status(results.status).send(results.errors);
            }
        }
    })
})

router.get('/getProductCategories', (req, res) => {
    console.log(req.body);
    kafka.make_request("admin_topic", { "path": "getProductCategories" }, function (err, results) {
        console.log("In make request call back", results);
        if (err) {
            console.log("Inside err");
            console.log(err);
            return res.status(err.status).send(err.message);
        } else {
            console.log("Inside else", results);
            if (results.status === 200) {
                return res.status(results.status).send(results.data);
            } else if (results.status === 401) {
                return res.status(results.status).send(results.message);
            }
            else {
                return res.status(results.status).send(results.errors);
            }
        }
    })
})

router.put('/getProductsUnderProductCategory',(req,res) => {
console.log("IN GET PRODUCT UNDER CATEGORY ", req.body);
kafka.make_request("admin_topic", {"path": "viewProducts", "body":req.body}, function (err, results){
    console.log("In make request ", results);
    if (err) {
        console.log("Inside err");
        console.log(err);
        return res.status(err.status).send(err.message);
    } else {
        console.log("Inside else", results);
        if (results.status === 200) {
            return res.status(results.status).send(results.data);
        }
        else {
            return res.status(results.status).send(results.errors);
        }
    }
})

})

router.get('/viewSellersList', (req,res) => {
    console.log(req.body);
    kafka.make_request("admin_topic", { "path": "viewSellersList" }, function (err, results) {
        console.log("In make request viewseller call back", results);
        if (err) {
            console.log("Inside err");
            console.log(err);
            return res.status(err.status).send(err.message);
        } else {
            console.log("Inside else", results);
            if (results.status === 200) {
                return res.status(results.status).send(results.data);
            } 
            else {
                return res.status(results.status).send(results.errors);
            }
        }
    })
}) 

router.put("/viewProductsUnderSeller", (req,res) => {
    console.log(req.body);
    kafka.make_request("admin_topic", { "path": "viewProductsUnderSeller", "body": req.body}, function (err, results){
        console.log("In make request viewProductsUnderseller call back", results);
        if (err) {
            console.log("Inside err");
            console.log(err);
            return res.status(err.status).send(err.message);
        } else {
            console.log("Inside else", results);
            if (results.status === 200) {
                return res.status(results.status).send(results.data);
            }
            else {
                return res.status(results.status).send(results.errors);
            }
        }
    })
})

router.get("/getAdminViewOrders", (req, res) => {
    console.log(req.body);
    kafka.make_request("admin_topic", { "path": "getAdminViewOrders"}, function (err, results){
        console.log("In make request viewProductsUnderseller call back", results);
        if (err) {
            console.log("Inside err");
            console.log(err);
            return res.status(err.status).send(err.message);
        } else {
            console.log("Inside else", results);
            if (results.status === 200) {
                return res.status(results.status).send(results.data);
            }
            else {
                return res.status(results.status).send(results.errors);
            }
        }
    })
})


module.exports = router;