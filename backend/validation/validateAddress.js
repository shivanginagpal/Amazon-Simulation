const Validator = require('validator');
const isEmpty = require('./isEmpty');

function is_usZipCode(str) {
    regexp = new RegExp(/(^\d{5}$)|(^\d{5}-\d{4}$)/);
    if (regexp.test(str)) {
        return true;
    }
    else {
        return false;
    }
}

function is_usState(str) {
    regexp = new RegExp(/^(?:Ala(?:(?:bam|sk)a)|American Samoa|Arizona|Arkansas|(?:^(?!Baja )California)|Colorado|Connecticut|Delaware|District of Columbia|Florida|Georgia|Guam|Hawaii|Idaho|Illinois|Indiana|Iowa|Kansas|Kentucky|Louisiana|Maine|Maryland|Massachusetts|Michigan|Minnesota|Miss(?:(?:issipp|our)i)|Montana|Nebraska|Nevada|New (?:Hampshire|Jersey|Mexico|York)|North (?:(?:Carolin|Dakot)a)|Ohio|Oklahoma|Oregon|Pennsylvania|Puerto Rico|Rhode Island|South (?:(?:Carolin|Dakot)a)|Tennessee|Texas|Utah|Vermont|Virgin(?:ia| Island(s?))|Washington|West Virginia|Wisconsin|Wyoming|A[KLRSZ]|C[AOT]|D[CE]|FL|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY])$/);
    regexp.test("Test", str);
    if (regexp.test(str)) {
        return true;
    }
    else {
        return false;
    }
}

function is_validPhone(str) {
    regexp = new RegExp(/(^\d{10}$)/);
    if (regexp.test(str)) {
        return true;
    }
    else {
        return false;
    }
}

function validateAddress (data)  {
    
    let errors ={};
    data.country =!isEmpty(data.country) ? data.country : '';
    data.fullName =!isEmpty(data.fullName) ? data.fullName : '';
    data.addrLine1 =!isEmpty(data.addrLine1) ? data.addrLine1 : '';
    data.addrLine2 =!isEmpty(data.addrLine2) ? data.addrLine2 : '';
    data.state =!isEmpty(data.state) ? data.state : '';
    data.city =!isEmpty(data.city) ? data.city : '';
    data.zipCode =!isEmpty(data.zipCode) ? data.zipCode : '';
    data.phoneNumber =!isEmpty(data.phoneNumber) ? data.phoneNumber : '';

    if(Validator.isEmpty(data.country)) {
        errors.country = 'Country field is required';
    }

    if(!Validator.isLength(data.fullName,{min:2, max:30})) {
        errors.fullName ='Full Name must be between 2 and 30 characters';
    }

    if(Validator.isEmpty(data.fullName)) {
        errors.fullName = 'Full Name field is required';
    }

    if(Validator.isEmpty(data.addrLine1)) {
        errors.addrLine1 = 'AddrLine1 field is required';
    }

    if(Validator.isEmpty(data.addrLine2)) {
        errors.addrLine2 = 'AddrLine2 field is required';
    }
    
    if(!is_usState(data.state)) {
        errors.state = 'Please enter a Valid US State. Enter like: CA or Califonia';
    }

    if(Validator.isEmpty(data.state)) {
        errors.state = 'State field is required. Enter like: CA or Califonia';
    }

    if(Validator.isEmpty(data.city)) {
        errors.city = 'City field is required';
    }
    
    if(!is_usZipCode(data.zipCode)) {
        errors.zipCode = 'Zip Code is Invalid';
    }

    if(Validator.isEmpty(data.zipCode)) {
        errors.zipCode = 'Zip Code field is required';
    }

    if(!is_validPhone(data.phoneNumber)) {
        errors.phoneNumber = 'Phone Number is Invalid';
    }

    if(!Validator.isLength(data.phoneNumber,{min :10,max:10})){
        errors.phoneNumber = 'Phone Number should be 10 digits';
    }

    if(Validator.isEmpty(data.phoneNumber)) {
        errors.phoneNumber = 'Phone Number field is required';
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    };
};

module.exports = { validateAddress
                 }
