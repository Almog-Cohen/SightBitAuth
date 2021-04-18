const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const rooms = require("./controllers/rooms");
const register = require("./controllers/register");
const valiadte = require("./controllers/validation");
const signin = require("./controllers/signin");
const token = require("./controllers/token");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const posts = [
  { email: "almogco94@gmail.com", title: "Post1" },
  { email: "almogc@gmail.com", title: "Post123" },
];

// Cheking for token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  // Get token or undfiend if its not exists
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, email) => {
    if (err) return res.sendStatus(403);
    req.email = email;
    next();
  });
};

router.get("/", (req, res) => {
  res.send("server is up and runing");
});

router.delete("/logout", (req, res) => {
  token.handleDeleteToken(req, res);
});

router.post("/auth/refresh", (req, res) => {
  token.handleGenerateNewTokens(req, res);
});

// login path + token
// router.post("/signin", valiadte.validateUserSignIn, (req, res) => {
//   signin.handleSignin(req, res, bcrypt);
// });
router.post("/signin", (req, res) => {
  signin.handleSignin(req, res, bcrypt);
});

router.get("/posts", authenticateToken, (req, res) => {
  res.json(posts.filter((post) => post.email === req.email.email));
});

// register path + token
router.post("/register", valiadte.validateUserRegister, (req, res) => {
  register.handleRegister(req, res, bcrypt);
});
//get rooms path
router.get("/chat/:room", (req, res) => {
  rooms.handleGetRoomMessages(req, res);
});

router.get("/isroomexist/:room", (req, res) => {
  rooms.handleIsRoomExist(req, res);
});

module.exports = router;
