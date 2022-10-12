import express from "express";
import validateSignUp from "../middlewares/signUp.middleware.js";
import { signUp } from "../controllers/usersController.js";

const router = express.Router();

router.post("/signup", validateSignUp, signUp);

export default router;
