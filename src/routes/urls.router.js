import express from "express";
import verifyAuth from "../middlewares/auth.middleware.js";
import { insertUrlsShorten } from "../controllers/urlsController.js";

const router = express.Router();

router.post("/urls/shorten", verifyAuth, insertUrlsShorten);

export default router;
