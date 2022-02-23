const express = require("express");
const router = express.Router();
const passport = require("passport");
const config = require("../../../config/index");
const usersDb = require("../../../controllers/users");

router
  .get("/signup", (req, res, next) => {
    res.render("auth/signup", {
      title: "Create new account",
      buttonText: "Sign Up",
      app: config.APP,
    });
  })
  .post("/signup", (req, res, next) => {
    usersDb
      .addUser({ ...req.body, role: "admin (access all)" })
      .then((data) => {
        console.log(`New user ${data.username} is created`);
        return res.redirect("/");
      })
      .catch((err) => {
        console.log(`Error ${err}`);
        return res.redirect(
          "/signup?message=" + "Email or phone is already existed."
        );
      });
  });

router
  .get("/login", (req, res, next) => {
    res.render("auth/login", {
      title: "Welcome back",
      buttonText: "Sign In",
      app: config.APP,
    });
  })
  .post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        console.log(`Error ${err}`);
        return next(err);
      }
      if (!user) {
        console.log(`Error ${info}`);
        return res.redirect(
          "/login?message=" + "Incorrect access is found. Try again."
        );
      }
      req.logIn(user, function (err) {
        if (err) {
          console.log(`Error ${err}`);
          return next(err);
        }
        return res.redirect("/");
      });
    })(req, res, next);
  });

router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
