const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require('../config/keys');
const Seller = require('../models/Seller');

exports.sellerProfileService = function sellerProfileService(msg, callback) {
    console.log("In seller Profile Service path:", msg.path);
    switch (msg.path) {
        case "getSellerProfile":
            getSellerProfile(msg, callback);
            break;

        case "updateSellerProfile":
            updateSellerProfile(msg, callback);
            break;

        case "updateSellerProfilePic":
            updateSellerProfilePic(msg, callback);
            break;
    }
};

function getSellerProfile(msg, callback) {
    let err = {};
    let response = {};
    console.log("In getSellerProfile. Msg: ", msg);
    console.log(msg.user._id);
    Seller.findOne({ seller: msg.user._id })
        .populate('seller', ['name', 'email'])
        .then(profile => {

            if (!profile) {
                err.noprofile = 'There is no profile for this user';
                err.status = 404;
                return callback(null, err);
            }
            response.data = profile;
            response.status = 200;
            return callback(null, response);
        })
        .catch(err => {
            return callback(null, err);
        });
}

function updateSellerProfile(msg, callback) {
    let err = {};
    let response = {};
    console.log("In update Seller Profile Msg: ", msg);

    Seller.findOne({ seller: msg.user._id }).then(profile => {
        if (profile) {
            // Update
            Seller.findOneAndUpdate(
                { seller: msg.user._id },
                { $set: msg.profileFields },
                { new: true }
            ).then(profile => {
                response.data = profile;
                response.status = 200;
                return callback(null, response);
            }).catch(err => console.log(err));
        } else {
            // Save Profile
            new Seller(msg.profileFields).save().then(profile => {
                response.data = profile;
                response.status = 200;
                return callback(null, response);
            }).catch(err => console.log(err));
        }
    });
}

async function updateSellerProfilePic(msg, callback) {
    let err = {};
    let response = {};
    console.log("In updateSellerProfilePic. Msg: ", msg);

    Seller.findOne({ seller: msg.user._id }).then(profile => {
        console.log(profile);
        if (profile) {
            // Update
            Seller.findOneAndUpdate(
                { seller: msg.user._id },
                { $set: msg.sellerProfile },
                { new: true }
            ).then(profile => {
                response.data = profile;
                response.status = 200;
                return callback(null, response);
            }).catch(err => console.log(err));
        }
    });
}