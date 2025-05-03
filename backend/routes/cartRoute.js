// routes/cartRoutes.js
import express from "express";
import {
	getCart,
	updateCart,
	clearCart,
} from "../controllers/cartController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router
	.route("/")
	.get(verifyToken, getCart)
	.post(verifyToken, updateCart)
	.delete(verifyToken, clearCart);

export default router;
