'use strict'
const express = require('express');
const router = express.Router();
const passport = require('passport');
const kafka = require('../../kafka/client');
const helper = require('./helperFunctions');
const passportAuth = passport.authenticate('jwt', { session: false });
const uploadFileToS3 = require('../../config/awsImageUpload');

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Profile Works' }));

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get(
  '/getSellerProfile',
  passportAuth,
  (req, res) => {
    console.log("In getSellerProfile API", req.query);
    kafka.make_request("sellerProfile_topic", { "path": "getSellerProfile", "user": req.user, "body": req.query }, function (err, results) {
      
      if (err) {
        console.log("Inside err");
        console.log(err);
        return res.status(err.status).send(err.message);
      } else {
        if (results.status === 200) {
          return res.status(results.status).send(results.data);
        } else {
          return res.status(results.status).send(results.errors);
        }
      }
    }
    );
  });

// @route   POST api/updateProfile
// @desc    Create or edit user profile
// @access  Private
router.post(
  '/updateSellerProfile',
  passportAuth,
  (req, res) => {
    console.log(req.body);
    console.log(req.user);
    //const { errors, isValid } = validateProfileInput(req.body);
    //console.log(errors);
    // Check Validation
    //   if (!isValid) {
    //     // Return any errors with 400 status
    //     return res.status(400).json(errors);
    //   }

    var profileFields = {}
    if (req.body.address) {
      profileFields.sellerAddress = req.body.address;
    }
    profileFields.seller = req.user._id;


    console.log("In updateSellerProfile API", req.user);
    kafka.make_request("sellerProfile_topic", { "path": "updateSellerProfile", "user": req.user, "profileFields": profileFields }, function (err, results) {
      console.log("In make request call back", results);
      if (err) {
        console.log("Inside err");
        console.log(err);
        return res.status(err.status).send(err.message);
      } else {
        //console.log("Inside else", results);
        if (results.status === 200) {
          return res.status(results.status).send(results.data);
        } else {
          return res.status(results.status).send(results.errors);
        }
      }
    }
    );
  }
);

router.post('/updateSellerProfilePic/:type',
  helper.upload.single('file'),
  passportAuth,
  async (req, res) => {

    console.log("In Update Seller profile picture");
    console.log(req.body);
    console.log(req.file.filename);
    let imageUrl = "";
    if (req.file) {
        try {
            imageUrl = await uploadFileToS3(req.file, 'profile', req.user._id);
            
        } catch (error) {
            console.log(error);
        }
    }

    var sellerProfile = {
      "sellerProfilePicture": imageUrl.Location,
      "seller": req.user._id
    }
    kafka.make_request("sellerProfile_topic", { "path": "updateSellerProfile", "user": req.user, "profileFields": sellerProfile }, function (err, results) {
      console.log("In make request call back", results);
      if (err) {
        console.log("Inside err");
        console.log(err);
        return res.status(err.status).send(err.message);
      } else {
        //console.log("Inside else", results);
        if (results.status === 200) {
          return res.status(results.status).send(results.data);
        } else {
          return res.status(results.status).send(results.errors);
        }
      }
    }
  );
});

module.exports = router;