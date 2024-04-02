import express from "express";
import {
  signUp,
  signIn,
} from "../controllers/controllers.js";


const router = express.Router();

router.route("/signin").post(signIn);
router.route("/signup").post(signUp);

export default router;
