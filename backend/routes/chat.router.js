import express from "express";
import { handleChat, handleGroqChat } from "../controller/chat.controller.js";

const router = express.Router();

router.post("/", handleChat);
router.post("/groq", handleGroqChat);

export default router;
