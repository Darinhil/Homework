import express from "express";
import ProductController from "../controllers/product.controller.js";

const router = express.Router();
const controller = new ProductController();

router.get("/product", controller.getAll);
router.get("/product/:id", controller.getProductById);
router.post("/product", controller.create);
router.put("/product/:id", controller.updateProduct);
router.delete("/product/:id", controller.deleteProduct);

export default router;
