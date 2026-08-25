import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import { useEffect, useState } from "react";
import { coordinates, apiKey } from "../../utils/constants.js";
import ItemModal from "../ItemModal/ItemModal.jsx";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import { registerUser, loginUser, checkToken } from "../../utils/auth.js";
import Footer from "../Footer/Footer.jsx";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import Profile from "../Profile/Profile.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import {
  addClothingItems,
  getClothingItems,
  removeClothingItems,
  updateUser,
  addCardLike,
  removeCardLike,
} from "../../utils/api.js";
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({});
  };

  const handleDeleteClick = () => {
    setActiveModal("confirm-delete");
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    !isLiked
      ? addCardLike(id, token)
          .then((data) => {
            const updatedCard = data.item;

            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item)),
            );
          })
          .catch((err) => console.log(err))
      : removeCardLike(id, token)
          .then((data) => {
            const updatedCard = data.item;

            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item)),
            );
          })
          .catch((err) => console.log(err));
  };
  const onAddItem = (inputValues) => {
    const token = localStorage.getItem("jwt");
    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weatherType,
    };
    addClothingItems(newCardData, token)
      .then((data) => {
        const newItem = data.data;

        setClothingItems([newItem, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };
  const closeActiveModal = () => {
    setActiveModal("");
  };

  const deleteItemHandler = (itemId) => {
    const token = localStorage.getItem("jwt");
    removeClothingItems(itemId, token)
      .then(() => {
        const updatedItems = clothingItems.filter(
          (clothingItem) => clothingItem._id !== itemId,
        );
        setClothingItems(updatedItems);
      })
      .then(closeActiveModal)
      .catch(console.error);
  };

  const onRegister = (inputValues) => {
    registerUser(inputValues)
      .then((data) =>
        onLogin({
          email: data.email,
          password: data.password,
        }),
      )
      .catch(console.error);
  };

  const onLogin = (inputValues) => {
    loginUser(inputValues)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        return checkToken(data.token);
      })
      .then((userData) => {
        setIsLoggedIn(true);
        setCurrentUser(userData);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const onUpdateUser = (values) => {
    const token = localStorage.getItem("jwt");

    updateUser(values, token)
      .then((data) => {
        setCurrentUser(data);
        closeActiveModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    const fetchWeatherForCoords = (coords) => {
      getWeather(coords, apiKey)
        .then((data) => {
          const filteredData = filterWeatherData(data);
          setWeatherData(filteredData);
        })
        .catch(console.error);
    };

    if (
      typeof navigator !== "undefined" &&
      navigator.geolocation &&
      navigator.geolocation.getCurrentPosition
    ) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          fetchWeatherForCoords(coords);
        },
        (error) => {
          console.warn(
            "Geolocation failed or was denied, falling back to default coordinates",
            error,
          );
          fetchWeatherForCoords(coordinates);
        },
        { timeout: 10000 },
      );
    } else {
      fetchWeatherForCoords(coordinates);
    }

    getClothingItems()
      .then((data) => {
        data.reverse();
        setClothingItems(data);
      })
      .catch(console.error);

    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((data) => {
          setIsLoggedIn(true);
          setCurrentUser(data);
        })
        .catch((err) => {
          console.error(err);
          localStorage.removeItem("jwt");
          setIsLoggedIn(false);
          setCurrentUser({});
        });
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              handleRegisterClick={handleRegisterClick}
              handleLoginClick={handleLoginClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      clothingItems={clothingItems}
                      handleCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      handleEditProfileClick={handleEditProfileClick}
                      onCardLike={handleCardLike}
                      handleLogoutClick={handleLogoutClick}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer></Footer>
          </div>
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
            onAddItem={onAddItem}
          />
          <ItemModal
            isOpen={activeModal === "preview"}
            card={selectedCard || {}}
            onClose={closeActiveModal}
            activeModal={activeModal}
            handleDeleteClick={handleDeleteClick}
          />
          <DeleteConfirmModal
            isOpen={activeModal === "confirm-delete"}
            onClose={closeActiveModal}
            onConfirm={() => deleteItemHandler(selectedCard._id)}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            onRegister={onRegister}
            onLoginClick={handleLoginClick}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            onLogin={onLogin}
          />
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={closeActiveModal}
            onUpdateUser={onUpdateUser}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
