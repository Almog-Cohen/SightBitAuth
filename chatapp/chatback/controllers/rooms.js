const handleGetRoomMessages = async (req, res) => {
  const db = req.app.locals.db;

  const { room } = req.params;

  const database = db.db("chats");
  const chats = await database.collection(room).find({}).toArray();
  return res.json(chats);
};

const handleCreateRoom = async (req, res) => {
  const { room, name } = req.body;
  console.log("SERVER ROOm ", room, name);
  const db = req.app.locals.db;
  const database = db.db("rooms");
  const chats = await database.collection(room).insertOne({ name });
  console.log("NEW ROOM CREATED");
  res.json("ROOM IS CREATED");
};

const handleGetRoomsList = async (req, res) => {
  const db = req.app.locals.db;
};

module.exports = {
  handleGetRoomMessages: handleGetRoomMessages,
  handleCreateRoom: handleCreateRoom,
};
