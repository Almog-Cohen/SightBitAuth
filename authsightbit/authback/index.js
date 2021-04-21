const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const auth = require("./controllers/auth");
const valiadte = require("./controllers/validation");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.get("/", (req, res) => res.send("Server is running"));
app.post("/googlelogin", (req, res) => auth.handleGoogleSignIn(req, res));
app.post("/register", valiadte.validateUserRegister, (req, res) => {
  auth.handleRegister(req, res, bcrypt);
});
app.post("/signin", valiadte.validateUserSignIn, (req, res) => {
  auth.handleSignin(req, res, bcrypt);
});

app.listen(PORT, () => {
  console.log(`app is runing on port ${PORT}`);
});
