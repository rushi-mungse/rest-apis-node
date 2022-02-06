import express from "express";
import auth from "../middlewares/auth";
import admin from "../middlewares/admin";
const router = express.Router();
import {
  loginController,
  registerController,
  userController,
  refreshController,
  productController,
} from "../controllers";

router.post("/register", registerController.rgister);
router.post("/login", loginController.login);
router.get("/me", auth, userController.me);
router.post("/refresh", auth, refreshController.refresh);
router.post("/logout", auth, userController.logout);

router.post("/product", [auth, admin], productController.product);
router.put("/product/:id", [auth, admin], productController.update);
router.get("/get", productController.get);
router.delete("/delete/:id", [auth, admin], productController.delete);

export default router;
