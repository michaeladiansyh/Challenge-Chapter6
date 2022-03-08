const express = require("express");
const router = express.Router();

const auth = require("../controller/loginController");

router.post("/login", auth.sign);
router.get("/login", auth.loginIndex);

module.exports = router;
