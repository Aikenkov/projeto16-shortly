import express from "express";
import validateSignUp from "../middlewares/signUp.middleware.js";
import verifySignIn from "../middlewares/signIn.middleware.js";
import { signIn, signUp } from "../controllers/usersController.js";

const router = express.Router();

router.post("/signup", validateSignUp, signUp);
router.post("/signin", verifySignIn, signIn);

export default router;
