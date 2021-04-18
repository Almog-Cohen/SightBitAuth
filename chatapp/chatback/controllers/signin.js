require("dotenv").config();
const jwt = require("jsonwebtoken");
const redis = require("redis");

const redisClient = redis.createClient();

redisClient.on("error", function (error) {
  console.error(error);
});

redisClient.on("connect", function (error) {
  console.log("REDIS IS CONNECTED");
});

handleSignin = async (req, res, bcrypt) => {
  const { email, password } = req.body;
  const db = req.app.locals.db;

  const userExist = await isUserExsists(db, email);

  if (userExist) {
    const match = await bcrypt.compare(password, userExist.password);
    if (match) {
      const accessToken = generateAccessToken(email);
      const refreshToken = generateRefreshToken(email);
      setToken(refreshToken, email);

      res.json({
        username: userExist.username,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } else {
      res.json("Incorrect password");
    }
  } else {
    return res.json("User not exists");
  }
};
// Check if the user exists in mongodb
// If yes return the email of the user if not return null
const isUserExsists = async (db, email) => {
  const database = db.db("users");
  const user = await database.collection("users").findOne({ email, email });
  return user;
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

// Set refresh token into redis db
const setToken = (key, value) => redisClient.set(key, value);

module.exports = {
  handleSignin: handleSignin,
  redisClient: redisClient,

  generateRefreshToken,
  generateAccessToken,
};
