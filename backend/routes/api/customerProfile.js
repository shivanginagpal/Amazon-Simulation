'use strict'
const express = require('express');
const router = express.Router();
const passport = require('passport');
const kafka = require('../../kafka/client');
const helper = require('./helperFunctions');
const passportAuth = passport.authenticate('jwt', { session: false });
const fs = require("fs");
const path = require("path");
const validate = require('../../validation/validateAddress');
const validatePayment = require('../../validation/validatePaymentInfo');
const uploadFileToS3 = require('../../config/awsImageUpload');
// Load Validation

router.get('/test', (req, res) => res.json({ msg: 'Profile Works' }));

//download-file
router.get("/downloadProfileImg/:user_image", (req, res) => {
  var image = path.join(__dirname + "/../../uploads/profilepics", req.params.user_image);
  console.log("image", image)
  if (fs.existsSync(image)) {
    res.sendFile(image);
  } else {
    res.end("image not found");
  }
});

router.get('/getCustomerProfile', passportAuth, (req, res) => {
    console.log("In getCustomerProfile API");
    kafka.make_request("customerProfile_topic", { "path": "getCustomerProfile", "user": req.user }, function (err, results) {
        //console.log("In make request call back", results);
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

router.post('/addAddress', passportAuth, (req, res) => {

    const { errors, isValid } = validate.validateAddress(req.body);
    console.log(errors);
    //Check Validation
      if (!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors);
      }

    console.log("In update Customer Profile Add Address API", req.user);
    kafka.make_request("customerProfile_topic", { "path": "addAddress", "user": req.user, "body": req.body }, function (err, results) {
        //console.log("In make request call back", results);
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

router.post('/addPaymentInfo', passportAuth, (req, res) => {
    console.log(req.body);
    //console.log(req.user);
    const { errors, isValid } = validatePayment.validatePaymentInfo(req.body);
    console.log(errors);
    //Check Validation
      if (!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors);
      }

    console.log("In update Customer Profile Add PaymentInfo API");
    kafka.make_request("customerProfile_topic", { "path": "addPaymentInfo", "user": req.user, "body": req.body }, function (err, results) {

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

router.get('/getAddress', passportAuth, (req, res) => {
    console.log(req.user);
    //console.log("Query: ",req.query);

    console.log("In Customer Profile Get Address API");
    kafka.make_request("customerProfile_topic", { "path": "getAddress", "user": req.user, "query": req.query }, function (err, results) {
        //console.log("In make request call back", results);
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

router.post('/updateAddress', passportAuth, (req, res) => {
    //console.log(req.body);
    //console.log(req.user);

    console.log("In update Customer Profile update Address API", req.user);
    kafka.make_request("customerProfile_topic", { "path": "updateAddress", "user": req.user, "body": req.body }, function (err, results) {
        //console.log("In make request call back", results);
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

router.post('/updatePaymentInfo', passportAuth, (req, res) => {
    //console.log(req.body);
    //console.log(req.user);

    console.log("In update Customer Profile update PaymentInfo API");
    kafka.make_request("customerProfile_topic", { "path": "updatePaymentInfo", "user": req.user, "body": req.body }, function (err, results) {
        //console.log("In make request call back", results);
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

router.delete('/deleteAddress/:_id', passportAuth, (req, res) => {
    console.log("In update Customer Profile Delete Address API");
    
    kafka.make_request("customerProfile_topic", { "path": "deleteAddress", "user": req.user, "body": req.params }, function (err, results) {
        //console.log("In make request call back", results);
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

router.delete('/deletePaymentInfo/:_id', passportAuth, (req, res) => {
    console.log("In update Customer Profile Delete PaymentInfo API");
    
    console.log("Params",req.params);
    kafka.make_request("customerProfile_topic", { "path": "deletePaymentInfo", "user": req.user, "body": req.params }, function (err, results) {
        //console.log("In make request call back", results);
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

router.post('/updateCustomerProfilePic/:type', helper.upload.single('file'), passportAuth, async(req, res) => {
    console.log("In Update Customer profile picture");
    console.log(req.body);
    console.log(req.file.filename);
    

    if (req.file) {
        uploadFileToS3(req.file.filename, 'profile', req.user._id);
    }
    
    let imageUrl = "";
    if (req.file) {
        try {
            imageUrl = await uploadFileToS3(req.file, 'profile', req.user._id);
            
        } catch (error) {
            console.log(error);
        }
    }
 
    var customerProfile = {
        "customer": req.user._id,
        "customerProfilePicture": imageUrl.Location,
    }

    kafka.make_request("customerProfile_topic", { "path": "updateCustomerProfilePic", "user": req.user, "customerProfile": customerProfile }, function (err, results) {
        //console.log("In make request call back", results);
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

router.get('/getCardInfo', passportAuth, (req, res) => {
    
    //console.log(req.user);
    //console.log("Query: ",req.query);

    console.log("In Customer Profile Get CardInfo API");
    kafka.make_request("customerProfile_topic", { "path": "getCardInfo", "user": req.user, "query": req.query }, function (err, results) {
        //console.log("In make request call back", results);
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

module.exports = router;