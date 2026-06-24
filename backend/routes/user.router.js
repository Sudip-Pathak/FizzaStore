// // To use user.controller.js we make the user.router.js.

import express from "express";
import { deleteUser, getUserProfile, getUsers, login, logout, signup, updateUser, updateUserProfile } from "../controller/user.controller.js";
// import { get } from "mongoose";
import {checkAuth, checkAdmin} from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);  // // Here we followed post method because through server we are maniplating in the clinet side. You can also use get method too.
router.get("/getusers", checkAuth, checkAdmin, getUsers)
router.get("/profile", checkAuth, getUserProfile);
router.put("/updateprofile", checkAuth, updateUserProfile);
router.put("/updateuser/:id", checkAuth, updateUser);
router.delete("/deleteuser/:id", deleteUser);
router.put("/profile", checkAuth, updateUserProfile);

export default router;




