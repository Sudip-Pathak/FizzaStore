import jwt from "jsonwebtoken";

const createToken = (res, userID) => {   // // userID as an argument.
    let token = jwt.sign({userID}, process.env.JWT_SECRET, {    // // Using .sign method to generate token. Secondly for encryption we need private. So, we make private key in .env and import here.
    "expiresIn": "3y", //  // When the token expires and it is optional.
    });
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV != "development",  // // Either in development or production. 
        sameSite: "strict", // // To avoid CSRF attack
        maxAge: 12 * 3 * 24 * 60 * 60 * 1000 // // Token expiary time in milisecond.
    });
};


export default createToken;

