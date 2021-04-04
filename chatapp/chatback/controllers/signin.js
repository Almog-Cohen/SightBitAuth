const { isUserExsists } = require("../users");

handleSignin = async (req, res, bcrypt) => {
  let { email, password } = req.body;
  const db = req.app.locals.db;

  const userExist = await isUserExsists(db, email);

  if (userExist) {
    const match = await bcrypt.compare(password, userExist.password);
    match ? res.json(userExist.username) : res.json("Incorrect password");
  } else {
    return res.json("User not exists");
  }
};

module.exports = {
  handleSignin: handleSignin,
};
