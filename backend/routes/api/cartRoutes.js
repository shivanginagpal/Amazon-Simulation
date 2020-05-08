const express = require('express');
const router = express.Router();
const passport = require('passport');
var kafka = require('../../kafka/client');
const passportAuth = passport.authenticate('jwt', { session: false });

router.post("/addToCart", passportAuth, async function (req, res) {

    console.log("in add to cart product route");
    console.log(req.body);
    kafka.make_request("cart_topic", { "path": "addToCart", "user": req.user, "body": req.body }, function (err, results) {
      console.log("in make request call back seller_topic");
      console.log(results);
      console.log(err);
      if (err) {
        console.log("Inside err");
        console.log(err);
        return res.status(err.status).send(err.message);
      } else {
        console.log("Inside else", results);
        if (results.status === 200) {
          return res.status(results.status).send(results.data);
        } else {
          return res.status(results.status).send(results.errors);
        }
      }
    });
  });

  router.get("/getCart/:email", async function (req, res) {
    console.log("in get cart product route");
    console.log(req.params.email);
    kafka.make_request("cart_topic", { "path": "getCart", "user": req.params.email}, function (err, results) {
      console.log("in make request call back cart_topic");
      console.log(results);
      console.log(err);
      if (err) {
        console.log("Inside err");
        console.log(err);
        return res.status(err.status).send(err.message);
      } else {
        console.log("Inside else", results);
        if (results.status === 200) {
          return res.status(results.status).send(results.data);
        } else {
          return res.status(results.status).send(results.errors);
        }
      }
    });
  });

  router.put("/deleteCartItem", async function (req, res) {
    console.log("in delete cart item route");
    console.log(JSON.stringify(req.body));
    kafka.make_request("cart_topic", { "path": "deleteCartItem", "item": req.body}, function (err, results) {
      console.log("in make request call back cart_topic");
      console.log(results);
      console.log(err);
      if (err) {
        console.log("Inside err");
        console.log(err);
        return res.status(err.status).send(err.message);
      } else {
        console.log("Inside else", results);
        if (results.status === 200) {
          return res.status(results.status).send(results.data);
        } else {
          return res.status(results.status).send(results.errors);
        }
      }
    });
  });

  router.put("/saveCartItem", async function (req, res) {
    console.log("in save cart item route");
    console.log(JSON.stringify(req.body));
    kafka.make_request("cart_topic", { "path": "saveCartItem", "item": req.body}, function (err, results) {
      console.log("in make request call back cart_topic");
      console.log(results);
      console.log(err);
      if (err) {
        console.log("Inside err");
        console.log(err);
        return res.status(err.status).send(err.message);
      } else {
        console.log("Inside else", results);
        if (results.status === 200) {
          return res.status(results.status).send(results.data);
        } else {
          return res.status(results.status).send(results.errors);
        }
      }
    });
  });

  router.put("/cartChangeProductQuantity", async function (req, res) {
    console.log("in change cart item quantity route");
    console.log(JSON.stringify(req.body));
    kafka.make_request("cart_topic", { "path": "cartChangeProductQuantity", "item": req.body}, function (err, results) {
      console.log("in make request call back cart_topic");
      console.log(results);
      console.log(err);
      if (err) {
        console.log("Inside err");
        console.log(err);
        return res.status(err.status).send(err.message);
      } else {
        console.log("Inside else", results);
        if (results.status === 200) {
          return res.status(results.status).send(results.data);
        } else {
          return res.status(results.status).send(results.errors);
        }
      }
    });
  });


  router.put("/cartMakeProductGift", async function (req, res) {
    console.log("in change cart make gift route");
    console.log(JSON.stringify(req.body));
    kafka.make_request("cart_topic", { "path": "cartChangeMakeProductGift", "item": req.body}, function (err, results) {
      console.log("in make request call back cart_topic");
      console.log(results);
      console.log(err);
      if (err) {
        console.log("Inside err");
        console.log(err);
        return res.status(err.status).send(err.message);
      } else {
        console.log("Inside else", results);
        if (results.status === 200) {
          return res.status(results.status).send(results.data);
        } else {
          return res.status(results.status).send(results.errors);
        }
      }
    });
  });

  router.get("/getSavedForLater/:email", async function (req, res) {
    console.log("in get saved for later product route");
    console.log(req.params.email);
    kafka.make_request("cart_topic", { "path": "getSavedForLater", "user": req.params.email}, function (err, results) {
      console.log("in make request call back cart_topic");
      console.log(results);
      console.log(err);
      if (err) {
        console.log("Inside err");
        console.log(err);
        return res.status(err.status).send(err.message);
      } else {
        console.log("Inside else", results);
        if (results.status === 200) {
          return res.status(results.status).send(results.data);
        } else {
          return res.status(results.status).send(results.errors);
        }
      }
    });
  });

  router.put("/deleteSavedItem", async function (req, res) {
    console.log("in delete saved item route");
    console.log(JSON.stringify(req.body));
    kafka.make_request("cart_topic", { "path": "deleteSavedItem", "item": req.body}, function (err, results) {
      console.log("in make request call back cart_topic");
      console.log(results);
      console.log(err);
      if (err) {
        console.log("Inside err");
        console.log(err);
        return res.status(err.status).send(err.message);
      } else {
        console.log("Inside else", results);
        if (results.status === 200) {
          return res.status(results.status).send(results.data);
        } else {
          return res.status(results.status).send(results.errors);
        }
      }
    });
  });


  router.put("/updateGiftMessage", async function (req, res) {
    console.log("in update gift message in cart route");
    console.log(JSON.stringify(req.body));
    kafka.make_request("cart_topic", { "path": "updateGiftMessage", "item": req.body}, function (err, results) {
      console.log("in make request call back cart_topic");
      console.log(results);
      console.log(err);
      if (err) {
        console.log("Inside err");
        console.log(err);
        return res.status(err.status).send(err.message);
      } else {
        console.log("Inside else", results);
        if (results.status === 200) {
          return res.status(results.status).send(results.data);
        } else {
          return res.status(results.status).send(results.errors);
        }
      }
    });
  });


  module.exports = router;