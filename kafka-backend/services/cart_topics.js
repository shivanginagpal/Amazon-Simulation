const { Cart } = require('../models/Cart');
const { prepareSuccess, prepareInternalServerError } = require('./responses');
const GIFT_CHARGE = 2;
const Seller = require('../models/Seller');
const User = require('../models/User');
var { ProductCategory } = require('../models/ProductCategory');
const redisClient = require("../utils/redisConfig");

exports.cartService = function cartService(msg, callback) {
    console.log("In cart topic Service path:", msg.path);
    switch (msg.path) {
        case "addToCart":
            addToCart(msg, callback);
            break;
        case "getCart":
            fetchCart(msg, callback);
            break;
        case "deleteCartItem":
            deleteCartItem(msg, callback);
            break;
        case "saveCartItem":
            saveCartItem(msg, callback);
            break;
        case "cartChangeProductQuantity":
            cartChangeProductQuantity(msg, callback);
            break;
        case "getSavedForLater":
            fetchSavedCart(msg, callback);
            break;
        case "deleteSavedItem":
            deleteSavedItem(msg, callback);
            break;
        case "cartChangeMakeProductGift":
            cartChangeMakeProductGift(msg, callback);
            break;
        case "updateGiftMessage":
            updateGiftMessage(msg, callback);
            break;
    }
};

async function addToCart(msg, callback) {
    let response = {};
    let err = {};
    var newProduct = [];
    var productTotal=0;
	productTotal=(msg.body.productQuantity) * (msg.body.productPrice) 
    newProduct = {
        sellerId: msg.body.sellerId,
        productId: msg.body.productId,
        productPrice: msg.body.productPrice,
        productQuantity: msg.body.productQuantity,
        productTotal: productTotal,
        cartStatus: 'IN_CART',
    }
    if (msg.body.gift === true) {
        newProduct["gift"] = true;
        newProduct["giftMessage"] = msg.body.giftMessage;
        productTotal += GIFT_CHARGE;
    }

    console.log(msg.user);
    await Cart.findOne({ "customerEmail": msg.user.email }).then(cart => {
        if (cart) {
            let existingProduct = cart.products.find(product => product.productId == msg.body.productId)
            if (existingProduct) {
                //do not handle gift for same product being added multiple times
                if (msg.body.gift === true)
                    productTotal -= GIFT_CHARGE;

                cart.totalAmount += productTotal;
                existingProduct.productQuantity += msg.body.productQuantity;
                existingProduct.productTotal += productTotal;

                cart.save().then(result => {
                    redisClient.setex(msg.user.email, 36000, JSON.stringify(result), function (error, reply) {
                        if (error) {
                            console.log(error);
                        }
                    });
                    response = prepareSuccess(result);
                    return callback(null, response);
                }).catch(error => {
                    err = prepareInternalServerError(error);
                    return callback(null, err);
                })
            }
            else {
                // add product to existing cart
                cart.totalAmount += productTotal;
                cart.products.push(newProduct);
                cart.save().then(result => {
                    response = prepareSuccess(result);
                    redisClient.setex(msg.user.email, 36000, JSON.stringify(result), function (error, reply) {
                        if (error) {
                            console.log(error);
                        }
                    });
                    return callback(null, response);
                }).catch(error => {
                    err = prepareInternalServerError(error);
                    return callback(null, err);
                })
            }
        } else {
          //creating new cart
            var newCart = new Cart({
                customerEmail: msg.user.email,
                customerName: msg.user.name,
                products: newProduct,
                totalAmount: productTotal,
            })
            newCart.save().then(result => {
                redisClient.setex(msg.user.email, 36000, JSON.stringify(result), function (error, reply) {
                    if (error) {
                        console.log(error);
                    }
                });
                response = prepareSuccess(result);
                return callback(null, response);
            }).catch(error => {
                err = prepareInternalServerError(error);
                return callback(err, null);
            })
        }
    })
}


async function fetchCart(msg, callback) {
    let response = {};
    let result = {};
    let err = {};
    await Cart.aggregate([
        {
            $match : {"customerEmail": msg.user}
        },
        {
            $project: {  
                "customerEmail" : 1,
                "totalAmount" : 1,
                "customerName" : 1,
                products: {
                   $filter: {
                      input: "$products",
                      as: "product",
                      cond: { 
                        "$eq": [ "$$product.cartStatus", "IN_CART" ]
                      }
                   }
                }
             }
    
        }
    ])
    .then(async cart => {
        console.log(JSON.stringify(cart));
        if (cart.length > 0) {
            var productSellerName = [];
            var products =[];
            var product = {};
            let pdata = async() => { return Promise.all(cart[0].products.map(async item =>{ 
               return User.findOne({ "_id": item.sellerId})
                .then(user => { 
                    console.log("SELLER NAME IS : " +user.name);
                    productSellerName.push(user.name);
                    console.log("SELLER NAME BEING SET : "+productSellerName);
                })
                .then(fp => {
                    return ProductCategory.find({ "products._id" : item.productId },{"products.$" : 1})
                    .then( p => {
                        console.log("WHEN ARE COMING HERE?");
                        product = {
                            itemId : item._id,
                            productId: item.productId,
                            sellerId : item.sellerId,
                            sellerName: productSellerName.shift(),
                            productQuantity: item.productQuantity,
                            productPrice: item.productPrice,
                            totalPrice : item.productTotal,
                            productName: p[0].products[0].productName,
                            gift: item.gift,
                            giftMessage : item.giftMessage
                        };
                        products.push(product);
                    });
                });
             }))}
             pdata().then(data => {
                result = {
                    customerEmail : cart[0].customerEmail,
                    totalAmount : cart[0].totalAmount,
                    customerName : cart[0].customerName,
                    products : products
                 };
                //end
                console.log(result);
                response = prepareSuccess(result);
                return callback(null, response);
             });
             
        } 
        else
        {
            response = prepareSuccess(result);
            return callback(null, response);
        }
    }).catch(error => {
        console.log(error);
        err = prepareInternalServerError(error);
        return callback(err, null);
    })
}

async function deleteCartItem(msg, callback) {
    let response = {};
    let result = {};
    let err = {};
    console.log("KAFKA BACKEND DELETE =========="+JSON.stringify(msg))
    await Cart.update(
        {"customerEmail" : msg.item.email},
        {$pull : {"products" : {"_id" : msg.item.itemId}}}
    )
    .then(async cart => {
        console.log("AFTER DELETING CART ITEM RESULT IS ---"+JSON.stringify(cart))
        await Cart.update(
            { "customerEmail" : msg.item.email },
            {$set : {"totalAmount" : msg.item.totalAmount}}
        )
        .then( updatedCart => {
            console.log("UPDATED CART =====" +JSON.stringify(updatedCart));
            response = prepareSuccess(updatedCart);
            return callback(null, response);
        })
        .catch(error => {
            console.log(error);
            err = prepareInternalServerError(error);
            return callback(err, null);
        });
    }).catch(error => {
        console.log(error);
        err = prepareInternalServerError(error);
        return callback(err, null);
    });
}


async function saveCartItem(msg, callback) {
    let response = {};
    let result = {};
    let err = {};
    console.log("KAFKA BACKEND SAVE =========="+JSON.stringify(msg))
    await Cart.update(
        { "customerEmail" : msg.item.email, "products._id" : msg.item.itemId },
        {$set : {"totalAmount" : msg.item.totalAmount, "products.$.cartStatus" : msg.item.cartStatus}}
    )
    .then(async updatedCart => {
        console.log("SAVED UPDATED CART =====" +updatedCart);
        response = prepareSuccess(updatedCart);
        return callback(null, response);
    }).catch(error => {
        console.log(error);
        err = prepareInternalServerError(error);
        return callback(err, null);
    });
}

async function cartChangeProductQuantity(msg, callback) {
    let response = {};
    let result = {};
    let err = {};
    console.log("KAFKA BACKEND SAVE =========="+JSON.stringify(msg))
    await Cart.update(
        { "customerEmail" : msg.item.email, "products._id" : msg.item.itemId },
        {$set : {"totalAmount" : msg.item.totalAmount, "products.$.productTotal" : msg.item.totalPrice, "products.$.productQuantity" : msg.item.productQuantity}}
    )
    .then(async updatedCart => {
        console.log("CHANGED UPDATED CART =====" +updatedCart);
        response = prepareSuccess(updatedCart);
        return callback(null, response);
    }).catch(error => {
        console.log(error);
        err = prepareInternalServerError(error);
        return callback(err, null);
    });
}


async function cartChangeMakeProductGift(msg, callback) {
    let response = {};
    let result = {};
    let err = {};
    console.log("KAFKA BACKEND SAVE =========="+JSON.stringify(msg))
    await Cart.update(
        { "customerEmail" : msg.item.email, "products._id" : msg.item.itemId },
        {$set : {"totalAmount" : msg.item.totalAmount, "products.$.productTotal" : msg.item.totalPrice, "products.$.gift" : msg.item.gift }}
    )
    .then(async updatedCart => {
        console.log("CHANGED GIFT IN CART =====" +updatedCart);
        response = prepareSuccess(updatedCart);
        return callback(null, response);
    }).catch(error => {
        console.log(error);
        err = prepareInternalServerError(error);
        return callback(err, null);
    });
}

async function fetchSavedCart(msg, callback) {
    let response = {};
    let result = {};
    let err = {};
    await Cart.aggregate([
        {
            $match : {"customerEmail": msg.user}
        },
        {
            $project: {  
                "customerEmail" : 1,
                "totalAmount" : 1,
                products: {
                   $filter: {
                      input: "$products",
                      as: "product",
                      cond: { 
                        "$eq": [ "$$product.cartStatus", "SAVED_FOR_LATER" ]
                      }
                   }
                }
             }
    
        }
    ])
    .then(async cart => {
        console.log(JSON.stringify(cart));
        if (cart.length > 0) {
            var productSellerName = "";
            var products =[];
            var product = {};
            let pdata = async() => { return Promise.all(cart[0].products.map(async item =>{ 
                //console.log("ITEM HAS === ",JSON.stringify(item))
               return User.findOne({ "_id": item.sellerId})
                .then(user => { 
                    //console.log("USER ---", JSON.stringify(user));
                    productSellerName = user.name;
                    //console.log("ITEM IN PRODUCT-ID ---", JSON.stringify(item));
                   // console.log("PRODUCT-ID ---", JSON.stringify(item.productId));
                    return ProductCategory.find({ "products._id" : item.productId },{"products.$" : 1})
                    .then( p => {
                        //console.log("PRODUCT INFORMATION ------ ", JSON.stringify(p));
                        product = {
                            itemId : item._id,
                            productId: item.productId,
                            sellerId : item.sellerId,
                            sellerName: productSellerName,
                            productQuantity: item.productQuantity,
                            productPrice: item.productPrice,
                            totalPrice : item.productPrice*item.productQuantity,
                            productName: p[0].products[0].productName
                        };
                        //console.log("before push----",JSON.stringify(product));
                        products.push(product);
                    });
                });
             }))}
             pdata().then(data => {
                // console.log("DATA IS ----", data);
                result = {
                    customerEmail : cart[0].customerEmail,
                    totalAmount : cart[0].totalAmount,
                    products : products
                 };
                //end
                console.log(result);
                response = prepareSuccess(result);
                return callback(null, response);
             });
             
        } 
        else
        {
            response = prepareSuccess(result);
            return callback(null, response);
        }
    }).catch(error => {
        console.log(error);
        err = prepareInternalServerError(error);
        return callback(err, null);
    })
}

async function deleteSavedItem(msg, callback) {
    let response = {};
    let result = {};
    let err = {};
    console.log("KAFKA BACKEND DELETE =========="+JSON.stringify(msg))
    await Cart.update(
        {"customerEmail" : msg.item.email},
        {$pull : {"products" : {"_id" : msg.item.itemId}}}
    )
    .then(async cart => {
        console.log("UPDATED CART =====" +JSON.stringify(cart));
        response = prepareSuccess(cart);
        return callback(null, response);
    }).catch(error => {
        console.log(error);
        err = prepareInternalServerError(error);
        return callback(err, null);
    });
}


async function updateGiftMessage(msg, callback) {
    let response = {};
    let result = {};
    let err = {};
    console.log("KAFKA BACKEND SAVE =========="+JSON.stringify(msg))
    await Cart.update(
        { "customerEmail" : msg.item.email, "products._id" : msg.item.itemId },
        {$set : {"products.$.giftMessage" : msg.item.giftMessage }}
    )
    .then(async updatedCart => {
        console.log("CHANGED GIFT MESSAGE IN CART =====" +updatedCart);
        response = prepareSuccess(updatedCart);
        return callback(null, response);
    }).catch(error => {
        console.log(error);
        err = prepareInternalServerError(error);
        return callback(err, null);
    });
}