// // Now after making models, we have to write the logic for signup and login which is done in User.controller.js.

import User from "../models/user.model.js";
// import bcrypt from "bcryptjs";  // // for another method.
import createToken from "../utils/token.util.js";
import asyncHandler from "../middleware/asynchandler.middleware.js";
import ApiError from "../utils/apiError.js";
import { isEmail, isStrongPassword } from "../utils/validator.js";

// @Description register new user
// @route /api/v1/user/signup
// @access public
const signup = asyncHandler(async (req, res, next) => {
  // // Wrapping the code with asynHander made in middleware.
  //  // try{   // // Removing try catch.
  let { email, password, confirmpassword } = req.body;
  if (!isEmail(email)) {
    // // Adding email validator.
    throw new ApiError(400, "Invalid Email!");
  }
  if (!isStrongPassword(password)) {
    // // Adding password validator made on utils (validator.js)
    throw new ApiError(
      400,
      "Password must have atlest 1 uppercase, 1 lowercase, 1 digit and 1 special character."
    );
  }
  let userexists = await User.findOne({ email }); // // Here one email is from userSchema(User) and the other email is from let(just above) but we are writing only one email because having same key and value can be passed only once.
  if (userexists) {
    let err = new Error(`the email is already used`);
    err.status = 400;
    throw err;
  }
  // let salt = await bcrypt.genSalt(10);
  // let hashedPassword = await bcrypt.hash(password, salt);
  // let user = await User.create({...req.body, password:hashedPassword})  // // Another method of hashing ans salting (these 3 line and above import bycript).
  // if(password != confirmpassword) throw new ApiError // // To match the password we did this but it is good to do in the froentend form part.
  let user = await User.create(req.body);
  // Removed createToken to prevent auto-login after registration
  res.send({
    message: "User Registered!",
    user: {
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
  });
  // //  }
  // // catch(err){    Removing try catch
  // //  next(err);
  // // }
});

// @Description login user
// @route /api/v1/user/login
// @access public
const login = asyncHandler(async (req, res, next) => {
  let { email, password } = req.body;

  let user = await User.findOne({ email });
  if (!user) {
    let err = new Error(`${email} not registered!`);
    err.status = 400;
    throw err;
  }
  if (await user.matchPassword(password)) {
    // // The matchPassword from user.model is attached to user which is called static method.
    createToken(res, user._id); // // Passing the jwt to cokies.
    res.send({
      message: "Login Success!",
      user: {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } else {
    let err = new Error("Invalid Password!");
    err.status = 400;
    throw err;
  }
  // // To check password we can create method here but we are creating in user model.
});

// @Description logot user
// @route /api/v1/user/logout
// @access private
const logout = asyncHandler((req, res) => {
  res.clearCookie("jwt");
  res.send({ message: "Logout Success!" });
});

// @desc get all users
// @route /api/v1/user/getusers
// @access private + admin user  // // Only admin user can use this and see all the normal as well as other admiin details. Therefore we created auth middleware.
const getUsers = asyncHandler(async (req, res) => {
  let users = await User.find({}).select("-password"); // // Here .select removes the password section while getting user details.
  res.send(users);
});

//@desc get user profile
// @route /api/v1/user/profile
// @access private
const getUserProfile = asyncHandler(async (req, res) => {
  // // User profile comes after logged in. For that we created checkAuth function where we have passed all the user information on user on auth.middleware.js.
  res.send(req.user); // // Here only the details of each specific users are given to the account owner only. Even admin cannot see the other user data from this portal.
});

// @DecFor normal user whose accounts belongs to them.
// @route/api/v1/user/updateprofile
// @access private
const updateUserProfile = asyncHandler(async (req, res) => {
  let id = req.user._id; // // Gives the id of logged in user.
  let user = await User.findById(id); // // this is done because normal user cannot change or access the admin previllage.
  if (user) {
    user.name = req.body.name || user.name; // // User can and cannot send the name.
    user.email = req.body.email || user.email;
    if (req.body.password)
      // // If we have password field then only I go to just down step.
      user.password = req.body.password; // // We do not follow the process as in eamil because here the password is already hashed and if we do show again it will be hashed.
    let UpdatedUser = await user.save();
    res.send({
      message: "User profile updated",
      user: {
        name: UpdatedUser.name,
        email: UpdatedUser.email,
        isAdmin: updateUser.isAdmin,
      },
    });
  } else {
    throw new ApiError(404, "User not found!");
  }
});

// @Desc: Only admin can update the data of particular user from the list of users.
// @route /api/v1/user/updateuser
// @access private
const updateUser = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let user = await User.findById(id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin); // // Changing normal user into admin user this line is used.
    let updatedUser = await user.save();
    res.send({ message: "User Update!", user: updatedUser });
  } else {
    throw new ApiError(404, "User Not Found!");
  }
});

// @Desc Deleteing normal users by the admin and admin cannot delete admin.
const deleteUser = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let user = await User.findById(id);
  if (user.isAdmin) {
    // // Checking is user admin or not.
    throw new ApiError(400, "Cannot delete the Admin User!");
  }
  await User.findByIdAndDelete(id);
  res.send({ message: "User deleted successfully!" });
});

export {
  signup,
  login,
  logout,
  getUsers,
  getUserProfile,
  updateUserProfile,
  updateUser,
  deleteUser,
};
