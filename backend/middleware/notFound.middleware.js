function notFoundHandler (req, res, next){
    let err = new Error(`Cannot find ${req.method} route on ${req.url}`);
    err.status = 404;
    next(err);
}

export default notFoundHandler;
