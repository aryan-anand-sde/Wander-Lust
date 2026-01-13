import User from "../models/User.js";

const signupPage = (req, res) => {
  res.render("users/signup");
};
const signup = (req, res) => {
  const newUser = new User(req.body);
  User.register(newUser, req.body.password)
    .then((registeredUser) => {
      req.login(registeredUser, (err) => {
        if (err) return next(err);
        req.flash("success", "Welcome to WanderLust!");
        res.redirect("/listings");
      });
    })
    .catch((e) => {
      req.flash("error", e.message);
      res.redirect("/signup");
    });
};

const loginPage = (req, res) => {
  res.render("users/login");
};
const login = (req, res) => {
  req.flash("success", "Welcome back to WanderLust!");
  res.redirect(res.locals.returnTo || "/listings");
};

const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) next(err);
    else {
      req.flash("success", "You're successfully logged out!");
      res.redirect("/listings");
    }
  });
};

export { signupPage, signup, loginPage, login, logout };
