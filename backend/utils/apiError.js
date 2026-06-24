class ApiError extends Error{
    constructor(status, message, errors =[], stack = ""){    // // errors and stack displays the error in the code after running server and fetching data. 
        super(message);
        this.status = status;
        this.errors = errors;  // // If there is error, the errors property is overwrite by the errors which is there.
        if(stack){
            this.stack = stack
        }
        else{
            Error.captureStackTrace(this, this.constructor);   // // if no stack outcome then this captureStackTrace method trace every place where there is error.
        }
    }
}


export default ApiError;


