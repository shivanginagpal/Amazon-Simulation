const express = require('express');
const router = express.Router();
const passport = require('passport');
var kafka = require('../../kafka/client');
const passportAuth = passport.authenticate('jwt', { session: false });

router.post("/placeOrder", passportAuth, async function (req, res) {

    console.log("in place order route");
    console.log(req.body);
    kafka.make_request("order_topic", { "path": "placeOrder", "user": req.user, "body": req.body }, function (err, results) {
      //console.log("in make request call back seller_topic");
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