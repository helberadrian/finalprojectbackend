import { Router } from "express";
import { verifyToken } from "../middlewares/authJwt.js";
import { addProductCart, getCart, deleteProductCart, deleteCart } from "../controllers/cart.js";

const router = Router();

router.get("/", [verifyToken], getCart);

router.post("/", [verifyToken], addProductCart);

router.post("/:productId", [verifyToken], deleteProductCart);

router.delete("/", [verifyToken], deleteCart);

export default router;
