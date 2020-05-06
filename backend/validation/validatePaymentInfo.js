const Validator = require('validator');
const isEmpty = require('./isEmpty');

function is_validCVV(str) {
    regexp = new RegExp(/(^\d{3}$)/);
    if (regexp.test(str)) {
        return true;
    }
    else {
        return false;
    }
}

function is_validCardNumber(str) {
    regexp = new RegExp(/(^\d{16}$)/);
    if (regexp.test(str)) {
        return true;
    }
    else {
        return false;
    }
}

function validatePaymentInfo(data) {
    let errors = {};
  
    data.name = !isEmpty(data.name) ? data.name : '';
    data.cardNumber = !isEmpty(data.cardNumber) ? data.cardNumber : '';
    data.cvv = !isEmpty(data.cvv) ? data.cvv : '';
    data.expiryMonth = !isEmpty(data.expiryMonth) ? data.expiryMonth : '';
    data.expiryYear = !isEmpty(data.expiryYear) ? data.expiryYear : '';
  
    if(!Validator.isLength(data.name,{min:2, max:30})) {
        errors.name ='Name must be between 2 and 30 characters';
    }

    if (Validator.isEmpty(data.name)) {
      errors.name = 'Name field is required';
    }
  
    if(!is_validCardNumber(data.cardNumber)) {
        errors.cardNumber = 'Card Number is Invalid. Enter a valid 16 digit card number';
    }

    if (Validator.isEmpty(data.cardNumber)) {
      errors.cardNumber = 'Card Number field is required';
    }
  
    if(!is_validCVV(data.cvv)) {
        errors.cvv = 'CVV is Invalid';
    }

    if (Validator.isEmpty(data.cvv)) {
      errors.cvv = 'Please enter the CVV';
    }

    if (Validator.isEmpty(data.expiryMonth)) {
        errors.expiryMonth = 'Please select expiry month';
    }
  
    if (Validator.isEmpty(data.expiryYear)) {
        errors.expiryYear = 'Please select expiry year';
    }

    if (Validator.isEmpty(data.expiryMonth) && Validator.isEmpty(data.expiryYear)) {
        errors.expiryMonthYear = 'Please select expiry month and year';
    }

    return {
      errors,
      isValid: isEmpty(errors)
    };
  };

module.exports = { validatePaymentInfo
                 }