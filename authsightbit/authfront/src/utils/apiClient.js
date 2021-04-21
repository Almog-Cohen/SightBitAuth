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
    name: username,
    email: email,
    password: password,
  });
  return response.data;
}

export async function authenticateGoogle(response) {
  const googleData = await axios.post("http://localhost:3001/googlelogin", {
    tokenId: response.tokenId,
  });

  return googleData.data;
}
