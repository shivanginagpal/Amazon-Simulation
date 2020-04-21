const Validator = require('validator');
const isEmpty = require('./isEmpty');

function validateSignUp (data)  {

    let errors ={};

    data.name =!isEmpty(data.name) ? data.name : '';
    data.email =!isEmpty(data.email) ? data.email : '';
    data.password =!isEmpty(data.password) ? data.password : '';
    
    if(!Validator.isLength(data.name,{min:2, max:30})) {
        errors.name ='Name must be between 2 and 30 characters';
    }

    if(Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }

    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    if(!Validator.isEmail(data.email)) {
        errors.email = 'Email is Invalid';
    }
    if(!Validator.isLength(data.password,{min :5,max:30})){
        errors.password = 'Password must be atleast 5 characters';
    }

    if (Validator.isEmpty(data.userType)) {
      errors.userType = 'Please enter the user type';
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    };
};

function validateLogin(data) {
    let errors = {};
  
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
  
    if (!Validator.isEmail(data.email)) {
      errors.email = 'Email is invalid';
    }
  
    if (Validator.isEmpty(data.email)) {
      errors.email = 'Email field is required';
    }
  
    if (Validator.isEmpty(data.password)) {
      errors.password = 'Password field is required';
    }
  
    if (Validator.isEmpty(data.userType)) {
      errors.userType = 'Please enter the user type';
    }
  
    return {
      errors,
      isValid: isEmpty(errors)
    };
  };

module.exports = { validateSignUp,
                    validateLogin
                 }