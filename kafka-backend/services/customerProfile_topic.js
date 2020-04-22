const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require('../config/keys');
const Customer = require('../models/Customer');

exports.customerProfileService = function customerProfileService(msg, callback) {
    console.log("In customer Profile Service path:", msg.path);
    switch (msg.path) {
        case "getCustomerProfile":
            getCustomerProfile(msg, callback);
            break;

        case "addAddress":
            addAddress(msg, callback);
            break;

        case "addPaymentInfo":
            addPaymentInfo(msg, callback);
            break;

        case "deletePaymentInfo":
            deletePaymentInfo(msg, callback);
            break;

        case "deleteAddress":
            deleteAddress(msg, callback);
            break;

        case "updateCustomerProfilePic":
            updateCustomerProfilePic(msg, callback);
            break;   
    }
};

async function getCustomerProfile(msg, callback){
    let err = {};
    let response = {};
    console.log("In get Customer Profile Msg: ", msg);
    Customer.findOne({ customer: msg.user._id })
    .populate('user', ['name', 'img', 'email'])
    .then(customer => {
      console.log(customer);
      if (!customer) {
        err.message = 'There is no profile for this user';
        err.status = 404;
        return callback(null, err);
      }
      response.data = customer;
      response.status = 200;
      return callback(null, response);
    })
    .catch(err => {
      return callback(null, err);
    });
}

async function addAddress(msg, callback) {
    let err = {};
    let response = {};
    console.log("In update Customer Add Address Profile Msg: ", msg);

    await Customer.findOne({ customer: msg.user._id }).then(profile => {
        if (profile) {
            const newAddress = {
                fullName: msg.body.fullName,
                addrLine1: msg.body.addrLine1,
                addrLine2: msg.body.addrLine2,
                city: msg.body.city,
                state: msg.body.state,
                country: msg.body.country,
                zipCode: msg.body.zipCode,
                phoneNumber: msg.body.phoneNumber,
              };
              profile.savedAddresses.unshift(newAddress);

              profile.save().then(profile => {
                response.data = profile;
                response.status = 200;
                return callback(null, response);
              }).catch(err => console.log(err));
            }
            else{
                var newCustomer = new Customer({
                    customer: msg.user._id,
                })
    
                newCustomer.save(async (error, result1) => {
                    if (error) {
                        console.log(error);
                        err.status = 410;
                        err.message = "could not create new customer";
                        err.data = error;
                        return callback(err, null);
                    } else {
                        console.log("customer created " + result1);
                        const newAddress = {
                            fullName: msg.body.fullName,
                            addrLine1: msg.body.addrLine1,
                            addrLine2: msg.body.addrLine2,
                            city: msg.body.city,
                            state: msg.body.state,
                            country: msg.body.country,
                            zipCode: msg.body.zipCode,
                            phoneNumber: msg.body.phoneNumber,
                          };
                          result1.savedAddresses.unshift(newAddress);
                          result1.save().then(result2 => {
                                console.log("Address added" + result2);
                                response.status = 200;
                                response.message = "New address added";
                                return callback(null, response);
                            })
                            .catch(error => {
                                console.log(error);
                                err.status = 410;
                                err.message = "could not add new address";
                                err.data = error;
                                return callback(err, null);
                            })
                    }
                })

            }
       });
};

async function addPaymentInfo(msg, callback) {
    let err = {};
    let response = {};
    console.log("In update Customer Add PaymentInfo Profile Msg: ", msg);

    await Customer.findOne({ customer: msg.user._id }).then(profile => {
        if (profile) {
            const newPayment= {
                cardNumber: msg.body.cardNumber,
                expiryDate: msg.body.expiryDate,
                name: msg.body.name,
                cvv: msg.body.cvv,
              };
              profile.paymentOptions.unshift(newPayment);

              profile.save().then(profile => {
                response.data = profile;
                response.status = 200;
                return callback(null, response);
              }).catch(err => console.log(err));
            }
            else{
                var newCustomer = new Customer({
                    customer: msg.user._id,
                })
    
                newCustomer.save(async (error, result1) => {
                    if (error) {
                        console.log(error);
                        err.status = 410;
                        err.message = "could not create new customer";
                        err.data = error;
                        return callback(err, null);
                    } else {
                        console.log("customer created " + result1);
                        const newPayment= {
                            cardNumber: msg.body.cardNumber,
                            expiryDate: msg.body.expiryDate,
                            name: msg.body.name,
                            cvv: msg.body.cvv,
                          };
                          result1.paymentOptions.unshift(newPayment);
                          result1.save().then(result2 => {
                                console.log("Payment added" + result2);
                                response.status = 200;
                                response.message = "New payment card added";
                                return callback(null, response);
                            })
                            .catch(error => {
                                console.log(error);
                                err.status = 410;
                                err.message = "could not add new payment info";
                                err.data = error;
                                return callback(err, null);
                            })
                    }
                })

            }
       });
};

async function deleteAddress(msg, callback) {
    let err = {};
    let response = {};
    console.log("In update Customer delete Address Profile Msg: ", msg);

    await Customer.findOne({ user: msg.user._id }).then(profile => {
        if (profile) {
        const removeIndex = profile.savedAddresses
          .map(item => item.id)
          .indexOf(req.body.address_id);
        profile.savedAddresses.splice(removeIndex, 1);
        profile.save().then(profile => res.json(profile));
      }
    })
      .catch(err => res.status(404).json(err));
  }

  async function deletePaymentInfo(msg, callback) {
    let err = {};
    let response = {};
    console.log("In update Customer delete PaymentInfo Profile Msg: ", msg);

    await Customer.findOne({ user: msg.user._id }).then(profile => {
        if (profile) {
        const removeIndex = profile.paymentOptions
          .map(item => item.id)
          .indexOf(req.body.payment_id);
        profile.paymentOptions.splice(removeIndex, 1);
        profile.save().then(profile => res.json(profile));
      }
    })
      .catch(err => res.status(404).json(err));
  }

async function updateCustomerProfilePic(msg, callback) {
    let err = {};
    let response = {};
    console.log("In updateCustomerProfilePic. Msg: ", msg);

   await Customer.findOne({ customer: msg.user._id }).then(profile => {
        console.log(profile);
        if (profile) {
            // Update
            Customer.findOneAndUpdate(
                { customer: msg.user._id },
                { $set: msg.customerProfile },
                { new: true }
            ).then(profile => {
                response.data = profile;
                response.status = 200;
                return callback(null, response);
            }).catch(err => console.log(err));
        }
    });
}