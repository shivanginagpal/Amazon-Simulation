const { Cart } = require('../models/Cart');
const {prepareSuccess,prepareInternalServerError} = require('./responses');
const GIFT_CHARGE = 2;

exports.cartService = function cartService(msg, callback) {
    console.log("In cart topic Service path:", msg.path);
    switch (msg.path) {
        case "addToCart":
            addToCart(msg, callback);
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
                })
                    .catch(error => {
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
                })
                    .catch(error => {
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
            })
                .catch(error => {
                    err = prepareInternalServerError(error);
                    return callback(err, null);
                })
        }
    })
}