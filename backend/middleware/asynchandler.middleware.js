// // This asynchandler is creatred to handle the try catch part of the user controller.
// // Try catch method does not have any error even this asynchandler is made to make code looks well formatted as you do not have to use try catch at every new function.

const asyncHandler = (fn) =>(req, res, next) => {   // // In argument it takes fn argument. In controller we have send call back function therefore here this function takes that controller function as an argument. 
    return Promise.resolve(fn(req, res, next)).catch(next)  // OR // .catch(err => next(err))    // // In the code which handles prmise, .resolve works as .then.  (Means handles resolve state)

};


export default asyncHandler;











// // ....... For Understanding above code.........
// const asyncHandler = (fn) =>{
//     return(req, res, next) => {    // // This is return of asynHandler.
//         return Promise.resolve(fn(req, res, next)).catch((err) => next(err));   // // This is a return of just above arrow function.
//     };  // // ....When error occurs the above next(err) sends to another middleware.
// };


