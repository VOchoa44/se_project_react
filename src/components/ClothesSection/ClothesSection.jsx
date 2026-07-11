import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
export default function ClothesSection({
  handleCardClick,
  clothingItems,
  handleAddClick,
}) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__row">
        <p className="clothes-section__heading">Your items</p>
        <button
          type="button"
          onClick={handleAddClick}
          className="clothes-section__add-clothes-btn"
        >
          + Add new
        </button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
}
