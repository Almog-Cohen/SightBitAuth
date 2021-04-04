const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const rooms = require("./controllers/rooms");
const register = require("./controllers/register");
const auth = require("./controllers/validation");
const signin = require("./controllers/signin");

router.get("/", (req, res) => {
  res.send("server is up and runing");
});

// login path + token
router.post("/signin", auth.validateUserSignIn, (req, res) => {
  signin.handleSignin(req, res, bcrypt);
});
// register path + token
router.post("/register", auth.validateUserRegister, (req, res) => {
  register.handleRegister(req, res, bcrypt);
});
//get rooms path
router.get("/chat/:room", (req, res) => {
  rooms.handleGetRoomMessages(req, res);
});

router.post("/createroom", (req, res) => {
  rooms.handleCreateRoom(req, res);
});

module.exports = router;
