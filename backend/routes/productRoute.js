import express from "express";

import {
	addProduct,
	productDetail,
	productList,
} from "../controllers/productController.js";

const router = express().router;

router.post("/add", addProduct);
router.get("/", productList);
router.get("/:id", productDetail);

export default router;
