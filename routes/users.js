import express from "express";
import passport from "passport";
import WrapAsync from "../utility/WrapAsync.js";
import { saveReturnTo } from "../middlewares.js";
import {
  signupPage,
  signup,
  loginPage,
  login,
  logout,
} from "../controllers/users.js";

const usersRouter = express.Router();

usersRouter.route("/signup").get(signupPage).post(WrapAsync(signup));

usersRouter
  .route("/login")
  .get(loginPage)
  .post(
    saveReturnTo,
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    WrapAsync(login)
  );

usersRouter.get("/logout", logout);

export default usersRouter;
