const express = require("express");
const path = require("path");
const router = express.Router();
const auth = require("../controller/adminController");
const { route } = require("./gamesRoute");

router.get("/user", auth.adminIndex);
router.get("/adminlogin", auth.loginadminIndex);
router.get("/history", auth.historyIndex);

router.get("/user", auth.allUser);
router.post("/user", auth.createUser);
router.post("/userbiodata", auth.createUserBiodata);
router.get("/userbiodata", auth.getUserBiodata);
router.get("/register", auth.registerIndex);
router.get("/userbiodata/:id", auth.getUsereBioById);
router.delete("/users/:id", auth.deleteUser);
router.post("/userrestore/:id", auth.restoreUser);
router.put("/updateuserbiodata/:id", auth.updateUserBiodata);

router.post("/adminlogin", auth.sign);

router.post("/history", auth.createHistory);
router.get("/history", auth.allHistory);
router.get("/create-history", auth.createHistoryIndex);

module.exports = router;
