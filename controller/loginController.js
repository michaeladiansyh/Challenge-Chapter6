// const express = require("express");
// const app = express();

const user = require("../db/user.json");
const User = require("../models").userGame;

const bcrypt = require("bcrypt");

module.exports = {
  sign(req, res) {
    /*

      1. Find the user by email [X]
      2. Get the user's encrypted_password property [X]
      3. Compare req.body.password with the encrypted_password 
      4. Serve the response

      // ===================
      5. Create access token 
      // ===================

    */

    User.findOne({
      where: {
        username: req.body.username,
      },
    })
      .then((users) => {
        if (!users) {
          return res.status(401).json({
            status: "fail",
            errors: ["Username doesn't exist!"],
          });
        }

        const isPasswordCorrect = bcrypt.compareSync(
          req.body.password,
          users.password
        );

        if (!isPasswordCorrect) {
          return res.status(401).json({
            status: "fail",
            errors: ["Wrong password!"],
          });
        } else {
          res.status(200).redirect("/");
        }
      })
      .catch((err) =>
        res.status(400).json({
          status: "fail",
          errors: [err.message],
        })
      );
  },

  loginIndex(req, res) {
    res.render("login", {
      layout: "../views/layouts/main.ejs",
      title: "Login Page",
      message: "",
    });
  },
  /* sign(req, res) {
    try {
      const user = User.findOne({
        where: {
          username: req.body.username,
        },
      });
      if (!user) {
        req.flash("danger", "Wrong Username");
        const messageData = {
          msg: req.flash("danger"),
          class: "alert-dark",
        };
        return res.render("login", {
          layout: "../views/layouts/main.ejs",
          title: "Login Page",
          message: messageData,
        });
      }
      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!isPasswordCorrect) {
        req.flash("danger", "Wrong Password");
        const messageData = {
          msg: req.flash("danger"),
          class: "alert-danger",
        };
        return res.render("login", {
          layout: "../views/layouts/main.ejs",
          title: "Login Page",
          message: messageData,
        });
      }
      req.flash("user", user.name);
      res.status(200).redirect("/").json({
        status: true,
        message: "Succesfully logged in",
      });
    } catch (error) {}
  },
  loginIndex(req, res) {
    res.render("login", {
      layout: "../views/layouts/main.ejs",
      title: "Login Page",
      message: "",
    });
  }, */
  /* sign(req, res) {
    const email = req.body.email;
    console.log(typeof email);
    const password = req.body.password;
    console.log(typeof user.email);

    if (user.email !== email) {
      req.flash("danger", "Wrong Email");
      const messageData = {
        msg: req.flash("danger"),
        class: "alert-dark",
      };
      return res.render("login", {
        layout: "../views/layouts/main.ejs",
        title: "Login Page",
        message: messageData,
      });
    }

    if (user.password !== password) {
      req.flash("danger", "Wrong Password");
      const messageData = {
        msg: req.flash("danger"),
        class: "alert-danger",
      };
      return res.render("login", {
        layout: "../views/layouts/main.ejs",
        title: "Login Page",
        message: messageData,
      });
    }

    req.flash("user", user.name);
    res.status(200).redirect("/").json({
      status: true,
      message: "Succesfully logged in",
    });
  },
  loginIndex(req, res) {
    res.render("login", {
      layout: "../views/layouts/main.ejs",
      title: "Login Page",
      message: "",
    });
  }, */
};
