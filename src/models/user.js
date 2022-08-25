import mongoose from "mongoose";
import crypto from "crypto-js";
import { SECRET } from "../config/config.js";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    lastname: {
      type: String,
    },
    phone: {
      type: Number,
      unique: true,
    },
    image: {
      type: String,
      default: "/img/userDefault.jpg"
    },
    role: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.statics.encryptPassword = async (password) => {
  const pass = crypto.AES.encrypt(password, SECRET).toString();
  return await pass;
};

userSchema.statics.decryptPassword = async (password) => {
  const data = crypto.AES.decrypt(password, SECRET);
  const pass = data.toString(crypto.enc.Utf8);
  return await pass;
};

export default mongoose.model("User", userSchema);