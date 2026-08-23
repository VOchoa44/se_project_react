import "./Sidebar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

export default function Sidebar({ handleEditProfileClick, handleLogoutClick }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <aside className="sidebar">
      <div className="sidebar__user-container">
        <div className="sidebar__header">
          <p className="sidebar__username">{currentUser.name}</p>

          {currentUser.avatar ? (
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="sidebar__avatar"
            />
          ) : (
            <div className="sidebar__avatar-placeholder">
              {currentUser.name?.charAt(0)}
            </div>
          )}
        </div>

        <button
          className="sidebar__edit-profile-button"
          type="button"
          onClick={handleEditProfileClick}
        >
          Change profile data
        </button>

        <button
          className="sidebar__logout-button"
          type="button"
          onClick={handleLogoutClick}
        >
          Log out
        </button>
      </div>
    </aside>
  );
}
