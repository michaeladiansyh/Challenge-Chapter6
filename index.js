var express = require("express");
var methodOverride = require("method-override");
var app = express();

const mainRoute = require("./routes/mainRoute.js");
const gamesRoute = require("./routes/gamesRoute.js");
const loginRoute = require("./routes/loginRoute.js");
const adminRoute = require("./routes/adminRoute.js");
const expressLayout = require("express-ejs-layouts");
const flash = require("connect-flash");
const session = require("express-session");
const cookiParser = require("cookie-parser");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.set("view engine", "ejs");
app.use(expressLayout);

app.use("/", function (req, res, next) {
  console.log("Time: ", Date());
  console.log("Request URL: ", req.originalUrl);
  console.log("Request Type: ", req.method);
  next();
});

app.use(cookiParser("SecretApp"));
app.use(
  session({
    secret: "SecretApp",
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true,
  })
);

app.use(flash());

app.use("/", mainRoute);
app.use("/auth", loginRoute);
app.use("/games", gamesRoute);
app.use("/api/", adminRoute);
app.use(methodOverride("_method"));

app.use((req, res, next) => {
  res.locals.email = req.email;
  next();
});

app.use("/public", express.static("./public"));
app.use("/assets", express.static("./assets"));

/* app.use((req, res, next) => {
  // res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
  res.render("404", {
    title: "Not Found",
    message: "Halaman Not Found",
    layout: "../views/layouts/main.ejs",
  });
}); */

app.use(function (err, req, res, next) {
  res.status(500).send(err.message);
});

app.listen(3001, () => {
  console.log("Listening on port 3001!");
});
