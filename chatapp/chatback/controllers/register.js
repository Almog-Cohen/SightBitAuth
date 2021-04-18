const { isUserExsists } = require("../users");

const handleRegister = async (req, res, bcrypt) => {
  const db = req.app.locals.db;
  const database = db.db("users");

  let user = req.body;

  const userExist = await isUserExsists(db, user.email);

  console.log(userExists);

  if (userExist) return res.json("User exists");

  const saltRounds = 10;
  user.password = bcrypt.hashSync(user.password, saltRounds);
  const chats = await database.collection("users").insertOne(user);
  return res.json("success");
};

module.exports = {
  handleRegister: handleRegister,
};
