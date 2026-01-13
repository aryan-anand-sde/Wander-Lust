import express from "express";
import ejsMate from "ejs-mate";
import mongoose from "mongoose";
import flash from "connect-flash";
import session from "express-session";
import MongoStore from "connect-mongo";
import methodOverride from "method-override";

import passport from "passport";
import User from "./models/User.js";
import LocalStrategy from "passport-local";

import usersRouter from "./routes/users.js";
import reviewsRouter from "./routes/reviews.js";
import listingsRouter from "./routes/listings.js";

import dotenv from "dotenv";
dotenv.config();

const MongoDb_URL = process.env.MONGODB_URL;
await mongoose
  .connect(MongoDb_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

const port = 3000;
const app = express();
app.engine("ejs", ejsMate);
app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

const store = MongoStore.create({
  mongoUrl: MongoDb_URL,
  touchAfter: 24 * 60 * 60,
  crypto: { secret: process.env.SECRET },
});
store.on("error", (e) => {
  console.log("SESSION STORE ERROR", e);
});
const sessionConfig = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
};

// Home route
app.get("/", (req, res) => res.redirect("/listings"));

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

app.use("/", usersRouter);
app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);

app.use((error, req, res, next) => {
  let { status = 500, message = "Something went wrong" } = error;
  res.render("listings/error.ejs", { status, message });
});

app.listen(port, () => {
  console.log(`Wander Lust app listening on port ${port}`);
});
