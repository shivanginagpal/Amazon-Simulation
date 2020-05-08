const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require('../config/keys');
const Customer = require('../models/Customer');
var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

exports.customerProfileService = function customerProfileService(msg, callback) {
    //console.log("In customer Profile Service path:", msg.path);
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

        case "updateAddress":
            updateAddress(msg, callback);
            break;

        case "updatePaymentInfo":
            updatePaymentInfo(msg, callback);
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

        case "getAddress":
            getAddress(msg, callback);
            break;

        case "getCardInfo":
            getCardInfo(msg, callback);
            break;
    }
};

async function getCustomerProfile(msg, callback) {
    let err = {};
    let response = {};
    //console.log("In get Customer Profile Msg: ", msg.user);
    await Customer.findOne({ customer: msg.user._id })
        .populate('customer', ['name', 'email'])
        .then(customer => {
            //console.log(customer);
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
    //console.log("In update Customer Add Address Profile Msg: ", msg);

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
        else {
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
                        phoneNumber: msg.body.phoneNumber
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
    //console.log("In update Customer Add PaymentInfo Profile Msg: ", msg);

    await Customer.findOne({ customer: msg.user._id }).then(profile => {
        if (profile) {
            const newPayment = {
                cardNumber: msg.body.cardNumber,
                expiryYear: msg.body.expiryYear,
                expiryMonth: msg.body.expiryMonth,
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
        else {
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
                    const newPayment = {
                        cardNumber: msg.body.cardNumber,
                        expiryYear: msg.body.expiryYear,
                        expiryMonth: msg.body.expiryMonth,
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

async function updateAddress(msg, callback) {
    let err = {};
    let response = {};
    let item = {};
    //console.log("In update Customer update Address Msg: ", msg);
    item.fullName = msg.body.fullName;
    item.addrLine1 = msg.body.addrLine1;
    item.addrLine2 = msg.body.addrLine2;
    item.city = msg.body.city;
    item.state = msg.body.state;
    item.country = msg.body.country;
    item.zipCode = msg.body.zipCode;
    item.phoneNumber = msg.body.phoneNumber;

    await Customer.findOneAndUpdate(
        {
            "customer": msg.user._id,
            "savedAddresses._id": msg.body.addr_id
        },
        {
            "$set": {
                "savedAddresses.$": item
            }
        }
    ).then(res => {
        response.data = res;
        response.message = "Succesfully updated the address";
        response.status = 200;
        return callback(null, response);
    }).catch(err => {
        err.status = 400;
        err.message = "Error in updating address";
        return callback(err, null);
    });
}

async function updatePaymentInfo(msg, callback) {
    let err = {};
    let response = {};
    //console.log("In update Customer payment info Msg: ", msg);
    let card = {};
    card.cardNumber = msg.body.cardNumber;
    card.expiryMonth = msg.body.expiryMonth;
    card.expiryYear = msg.body.expiryYear,
    card.name = msg.body.name;
    card.cvv = msg.body.cvv;

    await Customer.findOneAndUpdate({
        "customer": msg.user._id,
        "paymentOptions._id": msg.body.card_id
    }, {
        "$set": {
            "paymentOptions.$": card
        }
    })
        .then(res => {
            response.message = "Succesfully updated the payment info";
            response.status = 200;
            return callback(null, response);
        }).catch(err => {
            err.status = 400;
            err.message = "Error in updating payment info";
            return callback(err, null);
        });
}

async function deleteAddress(msg, callback) {
    let err = {};
    let response = {};
    //console.log("In update Customer delete Address Profile Msg: ", msg);

    await Customer.findOne({ customer: msg.user._id }).then(profile => {
        if (profile) {
            const removeIndex = profile.savedAddresses
                .map(item => item._id)
                .indexOf(msg.body._id);
            profile.savedAddresses.splice(removeIndex, 1);
            profile.save().then(profile => {
                response.data = profile;
                response.message = "Succesfully deleted the address";
                response.status = 200;
                return callback(null, response);
            }).catch(err => {
                err.status = 400;
                err.message = "Error in deleting address";
                return callback(err, null);
            });
        }
        else {
            err.status = 400;
            err.message = "Error in deleting address as the user has no profile";
            return callback(err, null);
        }
    })
}

async function deletePaymentInfo(msg, callback) {
    let err = {};
    let response = {};
    //console.log("In update Customer delete PaymentInfo Profile Msg: ", msg);

    await Customer.findOne({ customer: msg.user._id }).then(profile => {
        if (profile) {
            const removeIndex = profile.paymentOptions
                .map(item => item._id)
                .indexOf(msg.body._id);
            profile.paymentOptions.splice(removeIndex, 1);
            profile.save().then(profile => {
                response.data = profile;
                response.message = "Succesfully deleted the payment info";
                response.status = 200;
                return callback(null, response);
            }).catch(err => {
                err.status = 400;
                err.message = "Error in deleting payment info";
                return callback(err, null);
            });
        }
        else {
            err.status = 400;
            err.message = "Error in deleting payment info as the user has no profile";
            return callback(err, null);
        }
    })
}

async function updateCustomerProfilePic(msg, callback) {
    let err = {};
    let response = {};
    //console.log("In updateCustomerProfilePic. Msg: ", msg);

    await Customer.findOne({ customer: msg.user._id }).then(profile => {
        //console.log(profile);
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
        else {
            // Save Profile
            new Customer(msg.customerProfile).save().then(profile => {
                response.data = profile;
                response.status = 200;
                return callback(null, response);
            }).catch(err => console.log(err));
        }
    });
}

async function getAddress(msg, callback) {
    let err = {};
    let response = {};
    //console.log("In getAddress Msg: ", msg);

    await Customer.findOne({ "customer": msg.user._id })
        .then(async customer => {
            const address = await customer.savedAddresses.find(addr => addr._id == msg.query.addr_id)
            if (address) {
                //console.log(address);
                response.data = address;
                response.message = "Address Found";
                response.status = 200;
                return callback(null, response);
            } else {
                err.status = 400;
                err.message = "Address Not Found";
                return callback(err, null);
            }
        }).catch(err => {
            err.status = 400;
            err.message = "Address Not Found";
            return callback(err, null);
        });
}

async function getCardInfo(msg, callback) {
    let err = {};
    let response = {};
   // console.log("In getCardInfo Msg: ", msg);

    await Customer.findOne({ customer: msg.user._id })
        .then(customer => {
            console.log(customer.paymentOptions);
            const card = customer.paymentOptions.find(card => card._id == msg.query.card_id)
            if (card) {
                console.log(card);
                response.data = card;
                response.message = "Card Found";
                response.status = 200;
                return callback(null, response);
            } else {
                err.status = 400;
                err.message = "Card Not Found";
                return callback(err, null);
            }
        }).catch(err => {
            err.status = 400;
            err.message = "Card Not Found";
            return callback(err, null);
        });
}