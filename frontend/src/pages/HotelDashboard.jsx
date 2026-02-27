import React, { useState, useEffect } from "react";
import { LogOut } from "lucide-react";
import { db } from "../firebase"; 
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

const HotelDashboard = ({ user, onLogout }) => {
  const [foodItems, setFoodItems] = useState([]);
  const [foodName, setFoodName] = useState("");
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [expiry, setExpiry] = useState("");
  const [image, setImage] = useState("");

  const fetchFoodItems = async () => {
    const q = collection(db, "foodItems");
    const snapshot = await getDocs(q);
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setFoodItems(items.filter(item => item.hotelId === user.name));
  };

  useEffect(() => {
    fetchFoodItems();
  }, []);

  const addFoodItem = async () => {
    if (!foodName || !price || !expiry) return alert("Fill all fields");

    await addDoc(collection(db, "foodItems"), {
      hotelId: user.name,
      name: foodName,
      price: Number(price),
      discountPrice: discountPrice ? Number(discountPrice) : null,
      expiry: new Date(expiry),
      image: image || "https://via.placeholder.com/250x150",
    });

    setFoodName(""); setPrice(""); setDiscountPrice(""); setExpiry(""); setImage("");
    fetchFoodItems();
  };

  const removeFoodItem = async (id) => {
    await deleteDoc(doc(db, "foodItems", id));
    fetchFoodItems();
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", padding: "40px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: "900" }}>{user.name}</h2>
        <button onClick={onLogout} style={{ background: "#d1d5db", border: "none", padding: "10px", borderRadius: "10px", cursor: "pointer" }}>
          <LogOut size={20} />
        </button>
      </div>

      {/* Add new food */}
      <div style={{ background: "white", padding: "20px", borderRadius: "15px", marginBottom: "30px" }}>
        <h3 style={{ fontWeight: "700", marginBottom: "15px" }}>Add New Food</h3>
        <input type="text" placeholder="Food Name" value={foodName} onChange={e => setFoodName(e.target.value)} style={{ width: "100%", marginBottom: "10px", padding: "10px", borderRadius: "10px" }} />
        <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} style={{ width: "100%", marginBottom: "10px", padding: "10px", borderRadius: "10px" }} />
        <input type="number" placeholder="Discount Price (optional)" value={discountPrice} onChange={e => setDiscountPrice(e.target.value)} style={{ width: "100%", marginBottom: "10px", padding: "10px", borderRadius: "10px" }} />
        <input type="datetime-local" value={expiry} onChange={e => setExpiry(e.target.value)} style={{ width: "100%", marginBottom: "10px", padding: "10px", borderRadius: "10px" }} />
        <input type="text" placeholder="Image URL (optional)" value={image} onChange={e => setImage(e.target.value)} style={{ width: "100%", marginBottom: "10px", padding: "10px", borderRadius: "10px" }} />
        <button onClick={addFoodItem} style={{ padding: "12px", borderRadius: "15px", border: "none", background: "#10b981", color: "white", fontWeight: "700", cursor: "pointer" }}>Add Food</button>
      </div>

      {/* Manage food */}
      <h3 style={{ fontWeight: "700", marginBottom: "15px" }}>Manage Food Items</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
        {foodItems.map(item => (
          <div key={item.id} style={{ background: "white", borderRadius: "15px", padding: "15px", boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }}>
            <img src={item.image} alt={item.name} style={{ width: "100%", borderRadius: "10px" }} />
            <h4 style={{ fontWeight: "700", margin: "10px 0 5px 0" }}>{item.name}</h4>
            <p style={{ margin: 0, textDecoration: item.discountPrice ? "line-through" : "none" }}>₹{item.price}</p>
            {item.discountPrice && <p style={{ margin: 0, color: "#10b981", fontWeight: "700" }}>₹{item.discountPrice}</p>}
            <p style={{ margin: 0, color: "#ef4444" }}>Expires: {new Date(item.expiry.seconds * 1000).toLocaleString()}</p>
            <button onClick={() => removeFoodItem(item.id)} style={{ marginTop: "10px", background: "#ef4444", color: "white", padding: "8px", border: "none", borderRadius: "10px", cursor: "pointer" }}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelDashboard;