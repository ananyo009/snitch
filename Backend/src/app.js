import express from "express";
import morgan from "morgan";
import Authrouter from "./router/auth.router.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import config from "./config/config.js";
import ProductRouter from "./router/product.route.js";


const app = express();

app.use(passport.initialize())
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   }),
// );
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());

passport.use(
  new GoogleStrategy(
    {
      clientID: config.client_id,
      clientSecret: config.client_secret,
      callbackURL: "/api/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // Here, you would typically find or create a user in your database
      // For this example, we'll just return the profile
      return done(null, profile);
    },
  ),
);


app.use("/api/auth", Authrouter);
app.use("/api/product",ProductRouter)
app


export default app;
