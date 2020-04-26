const { Cart } = require('../models/Cart');
const { prepareSuccess, prepareInternalServerError } = require('./responses');
const GIFT_CHARGE = 2;
const Seller = require('../models/Seller');
const User = require('../models/User');

exports.cartService = function cartService(msg, callback) {
    console.log("In cart topic Service path:", msg.path);
    switch (msg.path) {
        case "addToCart":
            addToCart(msg, callback);
            break;
        case "getCart":
            fetchCart(msg, callback);
            break;
    }
};

async function addToCart(msg, callback) {
    let response = {};
    let err = {};
    var newProduct = []
    newProduct = {
        productId: msg.body.productId,
        productPrice: msg.body.productPrice,
        productQuantity: msg.body.productQuantity,
        cartStatus: 'IN_CART',
    }
    if (msg.body.gift === true) {
        newProduct["gift"] = true;
        newProduct["giftMessage"] = msg.body.giftMessage;
        msg.body.productTotal += GIFT_CHARGE;
    }

    await Cart.findOneAndUpdate({ "customerEmail": msg.user.email }).then(cart => {
        if (cart) {
            let existingProduct = cart.products.find(product => product.productId == msg.body.productId)

            if (existingProduct) {
                //do not handle gift for same product being added multiple times
                if (msg.body.gift === true)
                    msg.body.productTotal -= GIFT_CHARGE;

                cart.totalAmount += msg.body.productTotal;
                existingProduct.productQuantity += msg.body.productQuantity;

                cart.save().then(result => {
                    response = prepareSuccess(result);
                    return callback(null, response);
                }).catch(error => {
                    err = prepareInternalServerError(error);
                    return callback(err, null);
                })
            }
            else {
                cart.totalAmount += msg.body.productTotal;
                cart.products = newProduct;
                cart.save().then(result => {
                    response = prepareSuccess(result);
                    return callback(null, response);
                }).catch(error => {
                    err = prepareInternalServerError(error);
                    return callback(err, null);
                })
            }
        } else {
            var newCart = new Cart({
                customerEmail: msg.user.email,
                sellerName: msg.body.sellerName,
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
            let pdata = async()=> { return Promise.all(cart[0].products.map(async item =>{ 
               return User.findOne({ "_id": item.sellerId})
                .then(user => { 
                    sellerName = user.name;
                    product = {
                        sellerName: sellerName,
                        productQuantity: item.productQuantity,
                        productPrice: item.productPrice,
                        totalPrice : item.productPrice*item.productQuantity
                    };
                    products.push(product);
                });
             }))}
             pdata().then(data => {
                 console.log("DATA IS ----", data);
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