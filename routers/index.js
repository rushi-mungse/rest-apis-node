import express from "express";
import auth from "../middlewares/auth";

const router = express.Router();
import {
  loginController,
  registerController,
  userController,
} from "../controllers";

router.post("/register", registerController.rgister);
router.post("/login", loginController.login);
router.get("/me", auth, userController.me);

export default router;
