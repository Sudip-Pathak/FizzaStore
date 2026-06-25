import express from "express";
import { getDemands } from "../controller/demand.controller.js";
import { checkAuth, checkAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", checkAuth, checkAdmin, getDemands);

export default router;
