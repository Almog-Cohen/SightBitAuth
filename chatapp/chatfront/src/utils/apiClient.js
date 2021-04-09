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
export async function isRoomExists(roomName) {
  const response = await axios.get(
    `http://localhost:3001/isroomexist/${roomName}`
  );
  return response.data;
}
