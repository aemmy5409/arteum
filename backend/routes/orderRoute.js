// routes/orderRoutes.js
import express from "express";
import {
	createOrder,
	getMyOrders,
	getOrderById,
	markAsPaid,
	markAsDelivered,
} from "../controllers/orderController.js";
import { verifyToken, admin } from "../middleware/verifyToken.js";

const router = express.Router();

router.route("/").post(verifyToken, createOrder);
router.route("/my").get(verifyToken, getMyOrders);
router.route("/:id").get(verifyToken, getOrderById);
router.route("/:id/pay").put(verifyToken, markAsPaid);
router.route("/:id/deliver").put(verifyToken, admin, markAsDelivered);

export default router;
