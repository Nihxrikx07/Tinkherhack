import React from "react";
import "../styles/Cards.css";

export default function FoodCard({ food }) {
  return (
    <div className="food-card glassmorphic">
      <img src={food.image} alt={food.name} />
      <h3>{food.name}</h3>
      <p>Price: ₹{food.price}</p>
      <p>Expiry: {food.expiry} hrs</p>
      <button>Add to Cart</button>
    </div>
  );
}