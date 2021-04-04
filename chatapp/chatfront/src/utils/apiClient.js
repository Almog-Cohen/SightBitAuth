import axios from "axios";

export async function authenticate({ email, password }) {
  const response = await axios.post("http://localhost:3001/signin", {
    email: email,
    password: password,
  });
  return response.data;
}

export async function register({ username, email, password }) {
  const response = await axios.post("http://localhost:3001/register", {
    username: username,
    email: email,
    password: password,
  });
  return response.data;
}

export async function createRoom(roomName, userName) {
  console.log("ROOM NAME IS ", roomName, userName);
  const response = await axios.post("http://localhost:3001/createroom", {
    room: roomName,
    name: userName,
  });
  return response.data;
}
