function errorHandler ( error, req, res, next){
    let statusCode = error.status || 500;  // // || - Here it is called follow back becasue ii tries to take
    // // previous value but if cannot then take the last one vaule.
    let errMsg = error.message || "Internal Server Error"
    res.status(statusCode).send({error: errMsg, stack: error.stack});
    // res.status(statusCode).send({error: error.message});  // // If u have message property then use as here else no message propery then follow above method.
}

export default errorHandler;

