import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { SECRET } from "../config/config.js";
import logger from "../config/logger.js";

export const signinHandler = async (req, res) => {
  try {
    const userFound = await User.findOne({ email: req.body.email })
    if (!userFound) return res.status(400).json({ message: "User Not Found" });

    const originalPass = await User.decryptPassword(userFound.password);
    const passRecived = req.body.password;

    if (originalPass != passRecived){
      return res.status(401).json({
        token: null,
        message: "Invalid Password",
      });
    } else{
      const token = jwt.sign({ id: userFound._id }, SECRET, {
        expiresIn: 86400, // 24 hours
      });

      res.json({ token });
    }
  } catch (error) {
    logger.error(error);
  }
};

//{ id: userFound._id }