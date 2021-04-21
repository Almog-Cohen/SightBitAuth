require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.O_AUTH_CLIET);
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const GOOGLE_AUDIENCE =
  "639302706119-3b0vhobj330ui8jsqsbm4bn3hmvg90v5.apps.googleusercontent.com";

// Route for email && password signin
// If user not exists return that the user isn't exists.
// If password matches generate refresh and access JWT  and return it to the user if not return worng password
const handleSignin = async (req, res, bcrypt) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).exec();

    if (!user) return res.json("User not exists");

    if (typeof user.password == "undefined")
      return res.json("Please signin with your google account");

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.json("Incorrect password");

    // generate tokens
    const accessToken = generateAccessToken(email);
    const refreshToken = generateRefreshToken(email);
    return res.status(201).json({
      name: user.name,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Somthing went wrong");
  }
};

// Route for gooogle sign in
// Generate refresh and access JWT  and return it to the user
const handleGoogleSignIn = async (req, res) => {
  const { tokenId } = req.body;

  const response = await client.verifyIdToken({
    idToken: tokenId,
    audience: GOOGLE_AUDIENCE,
  });
  const { email_verified, name, email } = response.payload;
  if (!email_verified) res.json(403);

  // Check if the user alredy exists in the db
  User.findOne({ email }).exec((err, user) => {
    if (err) return res.status(500).send({ error: "Something went wrong..." });
    const accessToken = generateAccessToken(email);
    const refreshToken = generateRefreshToken(email);
    if (user)
      return res.status(201).json({
        name: user.name,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    const newUser = { email, name };

    // Add user to the db if not exists alredy
    User.create(newUser, (error, userdata) => {
      if (error)
        return res.status(500).send({ error: "Something went wrong..." });

      return res.status(201).json({
        name: userdata.name,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    });
  });
};

// Check if the user is alredy exists in db.
// IF exists throw the user an error.
// IF not exists add the user to the db with hashed passowrd and genarate access and refresh tokens and return it to the user.
const handleRegister = (req, res, bcrypt) => {
  let { email, password, name } = req.body;
  User.findOne({ email }).exec((err, user) => {
    if (err) return res.status(500).send({ error: "Something went wrong..." });
    console.log("this is user", user);
    if (user) return res.json("User exists");

    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    const newUser = { email, password: hashedPassword, name };
    const accessToken = generateAccessToken(email);
    const refreshToken = generateRefreshToken(email);

    // Add user to the db if not exists alredy
    User.create(newUser, (error, userdata) => {
      if (error)
        return res.status(500).send({ error: "Something went wrong..." });

      return res.status(201).json({
        name: userdata.name,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    });
  });
};

// Generate jwt refresh token
const generateRefreshToken = (email) => {
  const jwtPayload = { email };
  return jwt.sign(jwtPayload, process.env.ACCESS_TOKEN_SECRET);
};

// Generate jwt access token
const generateAccessToken = (email) => {
  const jwtPayload = { email };
  return jwt.sign(jwtPayload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "40s",
  });
};

module.exports = {
  handleGoogleSignIn: handleGoogleSignIn,
  handleSignin: handleSignin,
  handleRegister: handleRegister,
};
