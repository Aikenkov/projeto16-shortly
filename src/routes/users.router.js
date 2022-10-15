import express from "express";
import validateSignUp from "../middlewares/signUp.middleware.js";
import verifySignIn from "../middlewares/signIn.middleware.js";
import verifyAuth from "../middlewares/auth.middleware.js";
import { getMyUser, signIn, signUp } from "../controllers/usersController.js";

const router = express.Router();

router.post("/signup", validateSignUp, signUp);
router.post("/signin", verifySignIn, signIn);
router.get("/users/me", verifyAuth, getMyUser);

export default router;
