import { handleServiceResponse } from "./api.js";
const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.cloud86.csproject.org"
    : "http://localhost:3001";

function registerUser(inputValues) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inputValues),
  })
    .then(handleServiceResponse)
    .then(() => {
      return fetch(`${baseUrl}/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: inputValues.email,
          password: inputValues.password,
        }),
      });
    })
    .then(handleServiceResponse);
}

function loginUser(inputValues) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: inputValues.email,
      password: inputValues.password,
    }),
  }).then(handleServiceResponse);
}

function checkToken(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(handleServiceResponse);
}
export { registerUser, loginUser, checkToken };
