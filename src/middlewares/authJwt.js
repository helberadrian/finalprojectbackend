import jwt from "jsonwebtoken";
import { SECRET } from "../config/config.js";
import User from "../models/user.js";

export const verifyToken = async (req, res, next) => {
  let authHeader = req.headers["authorization"] || req.headers["Authorization"];
  if (!authHeader) return res.status(403).json({ message: "No token provided" });
  
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, SECRET);
    req.userId = decoded.id;

    const user = await User.findById(req.userId, { password: 0 });
    if (!user) return res.status(404).json({ message: "No user found" });

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
};

export const isAdmin = async (req, res, next) => {
    try {
      const user = req.userId;
      const userAdmin = await User.findById(user);
        if (userAdmin.role === "admin") {
          next();
          return;
        } else {
          return res.status(403).json({ message: "Require Admin Role!" });
        }
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  };