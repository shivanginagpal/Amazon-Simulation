const { Cart } = require('../models/Cart');
const { prepareSuccess, prepareInternalServerError } = require('./responses');
const GIFT_CHARGE = 2;
const Seller = require('../models/Seller');
const User = require('../models/User');
var { ProductCategory } = require('../models/ProductCategory');

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
    }
};

async function addToCart(msg, callback) {
    let response = {};
    let err = {};
    var newProduct = []
    newProduct = {
        sellerId: msg.body.sellerId,
        productId: msg.body.productId,
        productPrice: msg.body.productPrice,
        productQuantity: msg.body.productQuantity,
        productTotal: msg.body.productTotal,
        cartStatus: 'IN_CART',
    }
    if (msg.body.gift === true) {
        newProduct["gift"] = true;
        newProduct["giftMessage"] = msg.body.giftMessage;
        msg.body.productTotal += GIFT_CHARGE;
    }

    console.log(msg.user);
    await Cart.findOne({ "customerEmail": msg.user.email }).then(cart => {
        if (cart) {
            let existingProduct = cart.products.find(product => product.productId == msg.body.productId)
            if (existingProduct) {
                //do not handle gift for same product being added multiple times
                if (msg.body.gift === true)
                    msg.body.productTotal -= GIFT_CHARGE;

                cart.totalAmount += msg.body.productTotal;
                existingProduct.productQuantity += msg.body.productQuantity;
                existingProduct.productTotal += msg.body.productTotal,

                cart.save().then(result => {
                    response = prepareSuccess(result);
                    return callback(null, response);
                }).catch(error => {
                    err = prepareInternalServerError(error);
                    return callback(err, null);
                })
            }
            else {
                // add product to existing cart
                cart.totalAmount += msg.body.productTotal;
                cart.products.push(newProduct);
                cart.save().then(result => {
                    response = prepareSuccess(result);
                    return callback(null, response);
                }).catch(error => {
                    err = prepareInternalServerError(error);
                    return callback(err, null);
                })
            }
        } else {
          //creating new cart
            var newCart = new Cart({
                customerEmail: msg.user.email,
                products: newProduct,
                totalAmount: msg.body.productTotal,
            })
            newCart.save().then(result => {
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
            var sellerName = "";
            var products =[];
            var product = {};
            let pdata = async() => { return Promise.all(cart[0].products.map(async item =>{ 
                //console.log("ITEM HAS === ",JSON.stringify(item))
               return User.findOne({ "_id": item.sellerId})
                .then(user => { 
                    //console.log("USER ---", JSON.stringify(user));
                    sellerName = user.name;
                    //console.log("ITEM IN PRODUCT-ID ---", JSON.stringify(item));
                   // console.log("PRODUCT-ID ---", JSON.stringify(item.productId));
                    return ProductCategory.find({ "products._id" : item.productId },{"products.$" : 1})
                    .then( p => {
                        //console.log("PRODUCT INFORMATION ------ ", JSON.stringify(p));
                        product = {
                            itemId : item._id,
                            sellerId : item.sellerId,
                            sellerName: sellerName,
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

async function deleteCartItem(msg, callback) {
    let response = {};
    let result = {};
    let err = {};
    console.log("KAFKA BACKEND DELETE =========="+JSON.stringify(msg))
    await Cart.update(
        {},
        {$pull : {products : {_id:msg.item.itemId}}}
    )
    .then(async cart => {
        await Cart.update(
            { "customerEmail" : msg.item.email },
            {$set : {"totalAmount" : msg.item.totalAmount}}
        )
        .then( updatedCart => {
            console.log("UPDATED CART =====" +updatedCart);
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