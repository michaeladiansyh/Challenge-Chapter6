module.exports = {
  mainIndex(req, res, next) {
    const user = req.flash("user");
    res.render("home", {
      title: "Challenge Binar Michael",
      layout: "../views/layouts/main.ejs",
      userName: user,
    });
  },
};
