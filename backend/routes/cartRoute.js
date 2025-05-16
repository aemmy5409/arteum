// routes/cartRoutes.js
import express from "express";
import {
	updateCart,
	clearCart,
	removeFromCart,
} from "../controllers/cartController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.route("/").post(verifyToken, updateCart).delete(verifyToken, clearCart);
router.delete("/:productId", verifyToken, removeFromCart);

export default router;
