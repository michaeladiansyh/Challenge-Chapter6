const express = require("express");
const path = require("path");
const router = express.Router();

const auth = require("../controller/mainController");

/* router.get("/", (req, res, next) => {
  const user = req.flash("user");
  res.render("home", {
    title: "Challenge Binar Michael",
    layout: "../views/layouts/main.ejs",
    userName: user,
  });
  // ...
}); */

router.get("/", auth.mainIndex);

module.exports = router;
