import express from "express";
import verifyAuth from "../middlewares/auth.middleware.js";
import {
    getUrlById,
    insertUrlsShorten,
} from "../controllers/urlsController.js";
const router = express.Router();

router.post("/urls/shorten", verifyAuth, insertUrlsShorten);
router.get("/urls/:id", getUrlById);

export default router;
