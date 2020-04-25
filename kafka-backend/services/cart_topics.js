var { Cart } = require('../models/Cart');

exports.cartService = function cartService(msg, callback) {
    console.log("In customer topic Service path:", msg.path);
    switch (msg.path) {
        case "addToCart":
            addToCart(msg, callback);
            break;


    }
};

function addToCart(msg, callback) {
    let response = {};
    let err = {};

    Cart.find({
        "customerEmail": msg.user.email
    }).select().then(async result => {
        console.log(" add to cart product received");
        console.log(result);

        // create new cart and add product 
        if (result.length === 0) {
            var newCart = new Cart({
                customerEmail: msg.user.email,
                sellerName: msg.body.sellerName,
            })

            newCart.save(async (error, result1) => {
                if (error) {
                    console.log(error);
                    err.status = 410;
                    err.message = "could not create Cart ";
                    err.data = error;
                    return callback(err, null);
                } else {
                    console.log("Cart created " + result1);
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
                    Cart.update(
                        { _id: result1._id },
                        {
                            totalAmount: msg.body.productTotal,
                            $push: { products: newProduct }
                        },
                        { new: true }
                    )
                        .then(result2 => {
                            console.log("product added to cart" + result2);
                            response.status = 200;
                            response.message = "product added to cart";
                            return callback(null, response);
                        })
                        .catch(error => {
                            console.log(error);
                            err.status = 410;
                            err.message = "could not append product inside cart";
                            err.data = error;
                            return callback(err, null);
                        })
                }
            })
        }
        else {
            // append to existing cart of customer
            console.log("append to products array in cart");

            //find if product is already added
            Cart.find({ "products.productId": msg.body.productId }).select()
                .then(async result4 => {

                    console.log(" add to cart product received");
                    console.log(result4);

                    //product not fount in cart, add product to cart
                    if (result4.length === 0) {

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
                        Cart.update(
                            { _id: result[0]._id },
                            {
                                $inc: { totalAmount: msg.body.productTotal },

                                //  { $push: { products: newProduct } },
                                $addToSet: { products: newProduct }
                            },
                            { new: true }
                        )
                            .then(result3 => {
                                console.log("product added to cart" + result3);
                                response.status = 200;
                                response.message = "product added to cart";
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
                    //product found in cart increase the quantity and amount
                    else {
                        Cart.update(
                            {
                                _id: result4[0]._id,
                                'products.productId': msg.body.productId
                            },
                            { $inc: { totalAmount: msg.body.productTotal, 'products.$.productQuantity': msg.body.productQuantity } }
                        ).then(result5 => {
                            console.log("product already in cart increasing the amount and quantity" + result5);
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
                }).catch(error => {
                    console.log(error);
                    err.status = 411;
                    err.message = "could not append product inside cart";
                    err.data = error;
                    return callback(err, null);
                })

        }

    }).catch(error => {
        console.log(error);
        err.status = 412;
        err.message = "could not get cart";
        err.data = error;
        return callback(err, null);
    })


}