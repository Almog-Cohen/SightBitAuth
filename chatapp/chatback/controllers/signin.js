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

const isUserExsists = async (db, email) => {
  const database = db.db("users");

  const user = await database.collection("users").findOne({ email, email });
  console.log(user);
  return user;
};

module.exports = {
  handleSignin: handleSignin,
};
