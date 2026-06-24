// // In user.controller = For giving access only to the admin user, we have to protect route method means: no public access. 
// //To which route we have to make private, teha particular get garda jun request aai rako xa to request ma chai jwt is present or not or the cookies is passed or not. 
// // After knowing this we have to go further processing.

import jwt from "jsonwebtoken";
import asyncHandler from "./asynchandler.middleware.js";
import User from "../models/user.model.js";
import ApiError from "../utils/apiError.js";


const checkAuth = asyncHandler(async (req, res, next) => {
    let token = req.cookies.jwt;    // // Cookies ma token aako xa ke nai check gara.
    if (!token){   // // Sometimes we cannot find the cookies we use this below code.
        throw new ApiError(401, "You must be logged in!")
        // let err = new Error("You must be logged in!")
        // err.status = 401;
        // throw err;  // // These process is replaced by apiError line and that api is created in utils in apiError.js file.
    }
    try{
        let { userID } = jwt.verify(token, process.env.JWT_SECRET);// // Here jwt.verify pass the token and if the user is verified then it gives payload imported on it in them form of object. Then the object is destructurd and {userID} is taken off.
        let user = await User.findById(userID);  // // Here normal user are also accesing the property of admin.
        req.user ={
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,  
        };
        next();
    }
    catch(e){     // // When jwt is verifying tooken and if it finds error then it thorw its own error. To make that error into custom error we use try catch.
        throw new ApiError (401, "Invalid Token!")
        // let err = new Error ("Invalid Token!");
        // err.status = 401;
        // throw err;
    }
});


const checkAdmin = asyncHandler(async(req, res, next) => {
    let isAdmin = req.user?.isAdmin;   // // ? - Means if the user is undefined it does not proceed towards .isAdmin.
    if(isAdmin) next();
    else {
        throw new ApiError(403, "You are not authorized to perform this operation!")
    //     let err = new Error("You are not authorized to perform this operation!");
    //     err.status = 403;
    //     throw err;   // // The code looks long. So, for this task we created utils called apiError.js.
    }
});



export {checkAuth, checkAdmin};




