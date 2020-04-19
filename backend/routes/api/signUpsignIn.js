'use strict'
const express = require('express');
const router = express.Router();
const passport = require('passport');
var kafka = require('../../kafka/client');

//Load SignUpSignIn Model
router.get('/signUp', (req, res) => res.json({ msg: "Sign Up Sign In working fine" }));

router.post("/signUpUser", async function (req, res) {
  console.log(req.body);
  console.log("In signup user route");
  console.log(req.body);
  kafka.make_request("signupLogin_topic", { "path": "userSignUp", "body": req.body }, function (err, results) {
    console.log("In make request call back");
    console.log(results);
    console.log(err);
    if (err) {
      console.log("Inside err");
      console.log(err);
      return res.status(err.status).send(err.message);
    } else {
      console.log("Inside else", results);
      if (results.status === 200) {
        return res.status(results.status).send(results.message);
      } else {
        return res.status(results.status).send(results.errors);
      }
    }
  })
});


router.post("/signIn", async function (req, res) {
  console.log("in signIn route");
  console.log(req.body);
  kafka.make_request("signupLogin_topic", { "path": "login", "body": req.body }, function (err, results) {
    console.log("in make request call back signUpLogin_topic");
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

router.get('/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    });
  }
);

module.exports = router;