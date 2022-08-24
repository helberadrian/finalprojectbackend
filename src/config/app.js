import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import logger from "../config/logger.js";

// Routes
import productRoutes from "../routes/products.routes.js";
import usersRoutes from "../routes/user.routes.js";
import cartRoutes from "../routes/cart.routes.js";
import orderRoutes from "../routes/order.routes.js";

const app = express();

// Settings
app.set("port", process.env.PORT || 4000);
app.set("json spaces", 4);

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
//app.use(express.static(__dirname + '/static'));
app.use('/api/images', express.static('uploads'));

// Routes
app.use("/", usersRoutes);
app.use("/api/products", productRoutes);
app.use("/api/shoppingcartproducts", cartRoutes);
app.use("/api/orders", orderRoutes);

export default app;