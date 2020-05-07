const Validator = require('validator');
const isEmpty = require('./isEmpty');

function is_validPrice(str) {
    // pattern='[0-9]+(\\.[0-9][0-9]?)?'

    regexp = new RegExp(/([0-9]+(\\.[0-9][0-9]?)?)/);
    if (regexp.test(str)) {
        return true;
    }
    else {
        return false;
    }
}


function validateAddProduct(data) {

    let errors = {};

    data.productPrice = !isEmpty(data.productPrice) ? data.productPrice : '';
    data.productDescription = !isEmpty(data.productDescription) ? data.productDescription : '';
    data.productName = !isEmpty(data.productName) ? data.productName : '';
    data.productCategory = !isEmpty(data.productCategory) ? data.productCategory : '';

    if (!is_validPrice(data.productPrice)) {
        errors.productPrice = 'Price is Invalid';
    }

    if (Validator.isEmpty(data.productDescription)) {
        errors.productDescription = 'Description field is required';
    }

    if (Validator.isEmpty(data.productName)) {
        errors.productName = 'Name is required';
    }

    if (Validator.isEmpty(data.productCategory)) {
        errors.productCategory = ' Product Category field is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};


function validateProduct(data) {
    let errors = {};

    data.productPrice = !isEmpty(data.productPrice) ? data.productPrice : '';
    data.productDescription = !isEmpty(data.productDescription) ? data.productDescription : '';

    if (!is_validPrice(data.productPrice)) {
        errors.productPrice = 'Price is Invalid';
    }

    if (Validator.isEmpty(data.productDescription)) {
        errors.productDescription = 'Description field is required';
    }

    if (Validator.isEmpty(data.productPrice)) {
        errors.productPrice = 'Price field is required';
    }


    return {
        errors,
        isValid: isEmpty(errors)
    };
};

module.exports = {
    validateProduct, validateAddProduct
}