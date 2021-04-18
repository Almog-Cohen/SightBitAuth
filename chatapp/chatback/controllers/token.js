require("dotenv").config();
const redisClient = require("./signin").redisClient;
const { generateAccessToken, generateRefreshToken } = require("./signin");

// Delete the refresh token in redis when logout
const handleDeleteToken = (req, res) => {
  deleteRefreshToken(req.body.refreshToken);
  return res.status(204);
};

// Genearte
const handleGenerateNewTokens = async (req, res) => {
  const { refreshToken } = req.body;
  if (refreshToken == null) return res.sendStatus(401);
  const refreshTokenExists = await checkRefreshTokenExists(refreshToken);
  if (!refreshTokenExists) return res.sendStatus(403);

  deleteRefreshToken(refreshToken);

  const newAccessToken = generateAccessToken(refreshTokenExists);
  const newRefreshToken = generateRefreshToken(refreshTokenExists);

  return res.json({
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  });
};

// Check if the refresh token exists in redis db .
// If token exists return the email
// If not return null
const checkRefreshTokenExists = (refreshToken) => {
  return new Promise((resolve, reject) => {
    redisClient.get(refreshToken, (error, email) => {
      if (e) {
        reject(error);
      }
      resolve(email);
    });
  });
};
// Delete the refresh token from redis db
const deleteRefreshToken = (refreshToken) => {
  redisClient.del(refreshToken, (err, response) => {
    if (response == 1) {
      console.log("Deleted Successfully!");
    } else {
      console.log("Cannot delete");
    }
  });
};

module.exports = {
  handleDeleteToken: handleDeleteToken,
  handleGenerateNewTokens: handleGenerateNewTokens,
};
