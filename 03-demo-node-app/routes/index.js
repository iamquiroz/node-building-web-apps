const express = require("express");
const mongoose = require("mongoose");
const auth = require("http-auth");
const { body, validationResult } = require("express-validator");
const { path } = require("path");

/*
const basic = auth.basic({
  file: path.join(__dirname, "../user.htpasswd"),
});*/

const router = express.Router();
const Registration = mongoose.model("Registration");
router.post(
  "/",
  [
    body("name").isLength({ min: 1 }).withMessage("Please enter a name"),
    body("email").isLength({ min: 1 }).withMessage("Please enter an email"),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      const registration = new Registration(req.body);
      registration
        .save()
        .then(() => {
          res.send("Thank your for your registration");
        })
        .catch(() => {
          res.send("Sorry! Something went wrong");
        });
    } else {
      res.render("form", {
        title: "Registration form",
        error: errors.array(),
        data: req.body,
      });
    }
  }
);
router.get("/",  (req, res) => {
  res.render("form", { title: "Registration form" });
});
router.get("/registrations", (req, res) => {
  Registration.find()
    .then((registration) => {
      res.render("index", { title: "Listing registrations" });
    })
    .catch(() => {
      res.send("Sorry! Something went wrong.");
    });
});
module.exports = router;
