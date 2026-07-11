const baseUrl = "http://localhost:3001";
const headers = { "Content-Type": "application/json" };

const handServiceResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error ${res.status}`);
};

export const getClothingItems = () => {
  return fetch(`${baseUrl}/items`, {
    headers,
  }).then(handServiceResponse);
};

export const addClothingItems = ({ name, imageUrl, weather }) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers,
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(handServiceResponse);
};

export const removeClothingItems = (itemID) => {
  return fetch(`${baseUrl}/items/${itemID}`, {
    method: "DELETE",
    headers,
  }).then(handServiceResponse);
};
