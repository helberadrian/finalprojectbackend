import { Router } from "express";
import { verifyToken } from "../middlewares/authJwt.js";
import { createOrder, getOrders } from "../controllers/order.js";

const router = Router();

router.get("/", [verifyToken], getOrders);

router.post("/", [verifyToken], createOrder);

export default router;