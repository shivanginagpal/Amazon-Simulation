'use strict'
const express = require('express');
const router = express.Router();
const passport = require('passport');
const kafka = require('../../kafka/client');
const helper = require('./helperFunctions');
const passportAuth = passport.authenticate('jwt', { session: false });


// Load Validation

router.get('/test', (req, res) => res.json({ msg: 'Profile Works' }));


router.get('/getCustomerProfile', passportAuth, (req, res) => {
    console.log("In getCustomerProfile API", req.user);
    kafka.make_request("customerProfile_topic", { "path": "getCustomerProfile", "user": req.user }, function (err, results) {
        console.log("In make request call back", results);
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
    }
    );
});

router.post('/addAddress', passportAuth, (req, res) => {
    console.log(req.body);
    console.log(req.user);
    //const { errors, isValid } = validateProfileInput(req.body);
    //console.log(errors);
    // Check Validation
    //   if (!isValid) {
    //     // Return any errors with 400 status
    //     return res.status(400).json(errors);
    //   }

    console.log("In update Customer Profile Add Address API", req.user);
    kafka.make_request("customerProfile_topic", { "path": "addAddress", "user": req.user, "body": req.body }, function (err, results) {
        console.log("In make request call back", results);
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
    }
    );
}
);

router.post('/addPaymentInfo', passportAuth, (req, res) => {
    console.log(req.body);
    console.log(req.user);
    //const { errors, isValid } = validateProfileInput(req.body);
    //console.log(errors);
    // Check Validation
    //   if (!isValid) {
    //     // Return any errors with 400 status
    //     return res.status(400).json(errors);
    //   }

    console.log("In update Customer Profile Add PaymentInfo API", req.user);
    kafka.make_request("customerProfile_topic", { "path": "addPaymentInfo", "user": req.user, "body": req.body }, function (err, results) {
        console.log("In make request call back", results);
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
    }
    );
}
);

router.post('/updateAddress', passportAuth, (req, res) => {
    console.log(req.body);
    console.log(req.user);

    console.log("In update Customer Profile update Address API", req.user);
    kafka.make_request("customerProfile_topic", { "path": "updateAddress", "user": req.user, "body": req.body }, function (err, results) {
        console.log("In make request call back", results);
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
    }
    );
}
);

router.post('/updatePaymentInfo', passportAuth, (req, res) => {
    console.log(req.body);
    console.log(req.user);

    console.log("In update Customer Profile update PaymentInfo API", req.user);
    kafka.make_request("customerProfile_topic", { "path": "updatePaymentInfo", "user": req.user, "body": req.body }, function (err, results) {
        console.log("In make request call back", results);
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
    }
    );
}
);

router.delete('/deleteAddress/:_id', passportAuth, (req, res) => {
    console.log("In update Customer Profile Delete Address API", req.user);
    console.log(res.params);
    kafka.make_request("customerProfile_topic", { "path": "deleteAddress", "user": req.user, "body": req.params }, function (err, results) {
        console.log("In make request call back", results);
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
    }
    );
}
);

router.delete('/deletePaymentInfo/:_id', passportAuth, (req, res) => {
    console.log("In update Customer Profile Delete PaymentInfo API");
    
    console.log("Params",req.params);
    kafka.make_request("customerProfile_topic", { "path": "deletePaymentInfo", "user": req.user, "body": req.params }, function (err, results) {
        console.log("In make request call back", results);
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
    }
    );
}
);

router.post('/updateCustomerProfilePic', helper.upload.single('file'), passportAuth, (req, res) => {
    console.log("In Update Customer profile picture");
    console.log(req.body);
    console.log(req.file.filename);
    var customerProfile = {
        "customerProfilePicture": req.file.filename,
    }
    kafka.make_request("customerProfile_topic", { "path": "updateCustomerProfilePic", "user": req.user, "customerProfile": customerProfile }, function (err, results) {
        console.log("In make request call back", results);
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
    }
    );
});

module.exports = router;