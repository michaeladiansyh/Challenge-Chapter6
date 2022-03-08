const express = require("express");
const path = require("path");
const router = express.Router();
const auth = require("../controller/gamesController");

/* router.get("/rps", (req, res, next) => {
  res.render("games", {
    title: "Rock Paper Scissors",
    layout: "../views/layouts/main-games.ejs",
  });
  // ...
}); */

router.get("/rps", auth.gamesIndex);

module.exports = router;
