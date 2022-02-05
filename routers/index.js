import express from "express";
import auth from "../middlewares/auth";
const router = express.Router();
import {
  loginController,
  registerController,
  userController,
  refreshController,
} from "../controllers";

router.post("/register", registerController.rgister);
router.post("/login", loginController.login);
router.get("/me", auth, userController.me);
router.post("/refresh", auth, refreshController.refresh);
router.post("/logout", auth, userController.logout);

export default router;
