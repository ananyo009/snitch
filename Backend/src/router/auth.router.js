import express from "express";
import { validationRules, ValidateLogin } from "../validator/auth.validator.js";
import { registerUser, loginUser, googleCallback, getMe } from "../controller/auth.controller.js";
import passport from "passport";
import { UserAuthenticate } from "../middleware/auth.middleware.js";


const Authrouter = express.Router();


Authrouter.post("/register", validationRules, registerUser);

Authrouter.post("/login", ValidateLogin, loginUser)

Authrouter.get("/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

Authrouter.get("/google/callback",
  passport.authenticate("google", { session: false, failureRedirect:"http://localhost:5173/login" }),
  googleCallback
);

Authrouter.get("/getMe",UserAuthenticate,getMe)


export default Authrouter;