import express from "express";

import {
	addProduct,
	productDetail,
	productList,
	upload,
} from "../controllers/productController.js";

const router = express().router;

router.post("/add", upload.single("image"), addProduct);
router.get("/", productList);
router.get("/:id", productDetail);

export default router;
