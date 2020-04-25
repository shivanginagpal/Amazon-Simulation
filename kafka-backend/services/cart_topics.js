const { Cart } = require('../models/Cart');

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
        msg.body.productTotal += 2;
    }

    await Cart.findOneAndUpdate({ "customerEmail": msg.user.email }).then(cart => {
        if (cart) {
            let existingProduct = cart.products.find(product => product.productId == msg.body.productId)

            if (existingProduct) {
                if (msg.body.gift === true)
                    msg.body.productTotal -= 2;

                cart.totalAmount += msg.body.productTotal;
                existingProduct.productQuantity += msg.body.productQuantity;

                cart.save().then(result => {
                    console.log("product already in cart increasing the amount and quantity" + result);
                    response.status = 200;
                    response.message = "product already in cart increasing the amount and quantity";
                    return callback(null, response);
                })
                    .catch(error => {
                        console.log(error);
                        err.status = 411;
                        err.message = "could not append product inside cart";
                        err.data = error;
                        return callback(err, null);
                    })
            }
            else {

                cart.totalAmount += msg.body.productTotal;
                cart.products = newProduct;
                cart.save().then(result => {
                    console.log("adding product to customers cart" + result);
                    response.status = 200;
                    response.message = "adding product to customers cart";
                    return callback(null, response);
                })
                    .catch(error => {
                        console.log(error);
                        err.status = 411;
                        err.message = "could not append product inside cart";
                        err.data = error;
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
                console.log("creating cart and adding product" + result);
                response.status = 200;
                response.message = "creating cart and adding product";
                return callback(null, response);
            })
                .catch(error => {
                    console.log(error);
                    err.status = 411;
                    err.message = "could not append product inside cart";
                    err.data = error;
                    return callback(err, null);
                })
        }
    })
}