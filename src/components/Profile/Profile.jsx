import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection.jsx";
import Sidebar from "../Sidebar/Sidebar.jsx";
export default function Profile({
  handleAddClick,
  handleCardClick,
  clothingItems,
  handleEditProfileClick,
  onCardLike,
  handleLogoutClick,
}) {
  return (
    <section className="profile">
      <Sidebar
        handleEditProfileClick={handleEditProfileClick}
        handleLogoutClick={handleLogoutClick}
      />
      <ClothesSection
        handleCardClick={handleCardClick}
        clothingItems={clothingItems}
        handleAddClick={handleAddClick}
        onCardLike={onCardLike}
      />
    </section>
  );
}
