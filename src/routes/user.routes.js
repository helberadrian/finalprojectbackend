import { Router } from "express";
import { createUser, createUserAdmin } from "../controllers/user.js";
import { isAdmin, verifyToken } from "../middlewares/authJwt.js";
import { checkExistingUser } from "../middlewares/verifySignup.js";
import pkg from "../../package.json" assert {type: "json"};
import {
    signinHandler,
  } from "../controllers/auth.js";

const router = Router()

router.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

router.get("/", (req, res) => {
  res.json({
    message: "Welcome to my Products API",
    name: pkg.name,
    version: pkg.version,
    description: pkg.description,
    author: pkg.author,
  });
});

router.post("/registro", [checkExistingUser], createUser);

router.post("/registro/admin", [verifyToken, isAdmin, checkExistingUser], createUserAdmin);

//router.post("/registro/admin", [verifyToken, isAdmin, checkExistingUser], createUserAdmin);

//router.post("/signup", [checkExistingUser, checkExistingRole], signupHandler);

router.post("/login", signinHandler);

export default router;