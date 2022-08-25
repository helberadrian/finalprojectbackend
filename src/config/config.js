import { config } from "dotenv";
config();

export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb+srv://admin:admin@cluster0.yujmk1t.mongodb.net/?retryWrites=true&w=majority";
export const PORT = process.env.PORT || 4000;
export const SECRET = "yoursecretkey";
export const USER_EMAIL = "nora.hartmann@ethereal.email";
export const PASSWORD_EMAIL = "K2YWJ14acqB7gSTpEj";
export const ADMIN_EMAIL = "admin@admin.com"
