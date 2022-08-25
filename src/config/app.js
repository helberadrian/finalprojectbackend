import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import logger from "../config/logger.js";

// Routes
import productRoutes from "../routes/products.routes.js";
import usersRoutes from "../routes/user.routes.js";
import cartRoutes from "../routes/cart.routes.js";
import orderRoutes from "../routes/order.routes.js";
import imgRoutes from "../routes/img.routes.js";

const app = express();

// Settings
app.set("port", process.env.PORT || 4000);
app.set("json spaces", 4);
const __dirname = dirname(fileURLToPath(import.meta.url));

// Middlewares
app.use(
  cors({
    // origin: "http://localhost:4000",
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(join(__dirname, "public")));
app.use('/api/images', express.static('uploads'));

// Routes
app.use("/", usersRoutes);
app.use("/api/products", productRoutes);
app.use("/api/shoppingcartproducts", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/images", imgRoutes);

export default app;