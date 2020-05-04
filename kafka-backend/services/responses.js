const prepareSuccess = (data = {}) => {
    const responseData = {
        status: 200,
        message: "Successful",
        data: data,
    };
    console.log("preparing success response with code 200");
    return responseData;
}

const prepareInternalServerError = (data = {}) => {
    const responseData = {
        status: 500,
        message: "Internal Server Error",
        data: {
            success: false,
            ...data
        }
    };
    console.log("preparing internal server error response with code 500");
    console.log(responseData);
    return responseData;
}

const prepareNoContent = (data = {}) => {
    const responseData = {
        code: 201,
        data: {
            success: true,
            message: "No content",
            ...data
        }
    };
    console.log("preparing No content response with code 204");
    return responseData;
}

module.exports = {
    prepareSuccess, prepareNoContent,
    prepareInternalServerError
};