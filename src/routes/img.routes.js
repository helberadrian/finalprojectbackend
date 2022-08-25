import { Router } from "express";
import uploadImg from "../controllers/image.js";
import upload from "../middlewares/img.js";

const router = Router();

router.post("/", upload.single('myFile'), uploadImg);

export default router;