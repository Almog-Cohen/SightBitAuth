const users = [];

// Adding user to the room
const addUserToRoom = async (client, name, room) => {
  name = name.trim().toLowerCase();

  const user = { name, room };

  const database = client.db("rooms");
  const chats = await database.collection(room).insertOne({ name });

  return user;
};
// Check if user exists in the database
const isUserExsists = async (db, email) => {
  const database = db.db("users");

  const user = await database.collection("users").findOne({ email, email });
  console.log(user);
  return user;
};

// Add new message to db ofchat messages
const addNewChatMessage = (name, room, message, timestamp, client) => {
  doc = { message, name, timestamp };

  const database = client.db("chats");
  const chats = database.collection(room);
  const result = chats.insertOne(doc);
};

// Function for socket when some left the room  display the new data by database
const removeUserFromRoom = async (client, name, room) => {
  const database = client.db("rooms");
  const chats = await database.collection(room).deleteOne({ name });
  console.log(chats.deletedCount);
  return chats.deletedCount ? true : false;
};

// Function for socket when some one join the  display the new data by database
const getUsersInRoom = async (client, room) => {
  const database = client.db("rooms");
  const users = await database.collection(room).distinct("name");
  return users;
};

module.exports = {
  addUserToRoom,
  removeUserFromRoom,
  isUserExsists,
  getUsersInRoom,
  addNewChatMessage,
};
