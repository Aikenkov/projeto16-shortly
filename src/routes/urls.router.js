import express from "express";
import verifyAuth from "../middlewares/auth.middleware.js";
import {
    deleteUrlById,
    getUrlById,
    insertUrlsShorten,
    openShortUrl,
} from "../controllers/urlsController.js";

const router = express.Router();

router.post("/urls/shorten", verifyAuth, insertUrlsShorten);
router.delete("/urls/:id", verifyAuth, deleteUrlById);
router.get("/urls/:id", getUrlById);
router.get("/urls/open/:shortUrl", openShortUrl);

export default router;
