import User from "../models/user.js";
import logger from "../config/logger.js";

export const createUser = async (req, res) => {
  try {
    const { email, password, name, lastname, phone, image } = req.body;

    // Automatic Role
    const role = "user";

    // creating a new User
    const user = new User({
      email,
      password,
      name,
      lastname,
      phone,
      image,
      role,
    });

    // encrypting password
    user.password = await User.encryptPassword(user.password);

    // saving the new user
    const savedUser = await user.save();

    return res.status(200).json({
      _id: savedUser._id,
      email: savedUser.email,
      password: savedUser.password,
      name: savedUser.name,
      lastname: savedUser.lastname,
      phone: savedUser.phone,
      image: savedUser.image,
      role: savedUser.role,
    });
  } catch (error) {
    logger.error(error);
  }
};

export const createUserAdmin = async (req, res) => {
  try {
    const { email, password, name, lastname, phone, image } = req.body;

    // Automatic Role
    const role = "admin";

    // creating a new User
    const user = new User({
      email,
      password,
      name,
      lastname,
      phone,
      image,
      role,
    });

    // encrypting password
    user.password = await User.encryptPassword(user.password);

    // saving the new user
    const savedUser = await user.save();

    return res.status(200).json({
      _id: savedUser._id,
      email: savedUser.email,
      password: savedUser.password,
      name: savedUser.name,
      lastname: savedUser.lastname,
      phone: savedUser.phone,
      image: savedUser.image,
      role: savedUser.role,
    });
  } catch (error) {
    logger.error(error);
  }
};

export const getUsers = async (req, res) => {
  const users = await User.find();
  return res.json(users);
};

export const getUser = async (req, res) => {
  const user = await User.findById(req.params.userId);
  return res.json(user);
};
