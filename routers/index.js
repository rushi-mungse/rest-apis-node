import express from "express";
const router = express.Router();
import { registerController } from "../controllers";

router.post("/register", registerController.rgister);

export default router;
