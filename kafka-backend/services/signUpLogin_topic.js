const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require('../config/keys');
const User = require('../models/User');

exports.signUpLoginService = function signUpLoginService(msg, callback) {
    console.log("In SignUp Login Service path:", msg.path);
    switch (msg.path) {
        case "userSignUp":
            userSignUp(msg, callback);
            break;

        case "login":
            loginUser(msg, callback);
            break;

        case "updateUserInfo":
            updateUserInfo(msg, callback);
            break;
    }
};

async function userSignUp(msg, callback) {
    let err = {};
    let response = {};
    console.log("In sellerSignUp topic service. Msg: ", msg);
    
    
    await User.findOne({ name: msg.body.name }).then(async (user) => {
            if (user && user.userType == 'seller') {
                err.status = 400;
                err.errors = { name: "Seller exists with this name, please try a different name." };
                console.log(err);
                console.log("Returning error");
                return callback(null, err);
            }
        else {

    await User.findOne({ email: msg.body.email })
        .then(user => {

            if (user) {
                err.status = 400;
                err.errors = { email: "Email already exists" };
                console.log(err);
                console.log("Returning error");
                return callback(null, err);
            }
            else{
            const newSeller = new User({
                name: msg.body.name,
                email: msg.body.email,
                password: msg.body.password,
                userType: msg.body.userType
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newSeller.password, salt, (err, hash) => {
                    if (err) throw err;
                    newSeller.password = hash;
                    newSeller
                        .save()
                        .then(user => console.log(user))
                        .catch(err => console.log(err));
                });
            });

            console.log("User registered successfully");
            response.status = 200;
            response.message = "User Signup Success";
            return callback(null, response);
        }

        });}
    })
}

async function loginUser(msg, callback) {
    console.log("Inside loginUser in kafka backend signUpLogin topic");
    let response = {};
    let err = {};
    console.log("Msg Body", msg.body);
    try {
        console.log(msg.body);
        let { email, password, userType } = msg.body;
        console.log(msg.body);
        email = email.toLowerCase().trim();

        // Find user by email
        console.log("Here to find user from");

        let user = await User.findOne({
            email: msg.body.email,
            userType: msg.body.userType
        });

        if (!user) {
            err.status = 400;
            err.errors = { email: "User Not Found" }
            console.log(err);
            return callback(null, err);
        } else {
            console.log(user);

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                console.log("Invalid User");
                err.status = 400;
                err.errors = { password: "Password Incorrect" };
                console.log(err);
                return callback(null, err);
            } else {
                console.log("Valid User");
                const payload = { id: user.id, name: user.name, userType: userType, email: user.email }; // Create JWT Payload

                console.log(payload);
                var token = jwt.sign(payload, keys.secret, {
                    expiresIn: 900000 // in seconds
                });
                response.status = 200;
                response.data = {
                    success: true,
                    token: 'Bearer ' + token
                };
                return callback(null, response);
            }
        }

    } catch (error) {
        err.status = 500;
        err.message = "Internal Server Error";
        return callback(err, null);
    }
}

async function updateUserInfo(msg, callback) {
    console.log("Inside loginUser in kafka backend signUpLogin topic");
    let response = {};
    let err = {};
    console.log("Msg Body", msg.body);

    await User.findOneAndUpdate(
        { _id: msg.user._id },
        { $set: msg.body },
    ).then(user => {
        console.log("user updated");
    }).catch(err => console.log(err));

    User.findOne({ _id: msg.user._id }
    ).then(user => {
        console.log(user);
        const payload = { id: user.id, name: user.name, userType: user.userType, email: user.email }; // Create JWT Payload

        console.log(payload);
        var token = jwt.sign(payload, keys.secret, {
            expiresIn: 900000 // in seconds
        });

        response.status = 200;
        response.data = {
            success: true,
            token: 'Bearer ' + token
        };
        return callback(null, response);
    }).catch(err => console.log(err));

}