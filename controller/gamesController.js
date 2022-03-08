module.exports = {
  gamesIndex(req, res, next) {
    res.render("games", {
      title: "Rock Paper Scissors",
      layout: "../views/layouts/main-games.ejs",
    });
  },
};
