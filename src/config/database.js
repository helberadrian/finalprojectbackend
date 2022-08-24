import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";
import logger from "../config/logger.js";

try {
  const db = await mongoose.connect(MONGODB_URI);
  logger.info("Database is connected to", db.connection.name);
} catch (error) {
  logger.error(error.message);
}