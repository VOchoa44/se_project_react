import { handleServiceResponse } from "./api.js";

function registerUser(inputValues) {
  return fetch("http://localhost:3001/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inputValues),
  })
    .then(handleServiceResponse)
    .then(() => {
      return fetch("http://localhost:3001/signin", {
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
  return fetch("http://localhost:3001/signin", {
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
  return fetch("http://localhost:3001/users/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(handleServiceResponse);
}
export { registerUser, loginUser, checkToken };
