import React, { useState, useEffect } from "react";
import { LogOut } from "lucide-react";
import { db } from "../firebase";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";

const UserDashboard = ({ user, onLogout }) => {
  const [foodItems, setFoodItems] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const q = query(
          collection(db, "foodItems"),
          where("expiry", ">", new Date()),
          orderBy("price", "asc")
        );
        const snapshot = await getDocs(q);
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFoodItems(items);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFood();
  }, []);

  const addToCart = (item) => {
    if (!cart.some(c => c.id === item.id)) setCart([...cart, item]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", padding: "40px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <div>
          <p style={{ color: "#10b981", fontWeight: "700", fontSize: "14px" }}>Welcome back,</p>
          <h2 style={{ fontSize: "28px", fontWeight: "900" }}>{user.name}</h2>
        </div>
        <button onClick={onLogout} style={{ background: "#d1d5db", border: "none", padding: "10px", borderRadius: "10px", cursor: "pointer" }}>
          <LogOut size={20} />
        </button>
      </div>

      <h3 style={{ fontWeight: "700", marginBottom: "20px" }}>Available Food</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
        {foodItems.map(item => {
          const expiryDate = new Date(item.expiry.seconds * 1000);
          const now = new Date();
          const timeLeft = Math.max(0, expiryDate - now);
          const hours = Math.floor(timeLeft / (1000 * 60 * 60));
          const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
          const discountedPrice = item.discountPrice || item.price;

          return (
            <div key={item.id} style={{
              background: "white",
              borderRadius: "15px",
              padding: "20px",
              boxShadow: cart.some(c => c.id === item.id) ? "0 0 15px #10b981" : "0 4px 15px rgba(0,0,0,0.05)",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              transition: "box-shadow 0.3s",
            }}>
              <img src={item.image || "https://via.placeholder.com/250x150"} alt={item.name} style={{ width: "100%", borderRadius: "10px" }} />
              <h4 style={{ fontWeight: "700", margin: 0 }}>{item.name}</h4>
              <p style={{ margin: 0, textDecoration: item.discountPrice ? "line-through" : "none" }}>₹{item.price}</p>
              {item.discountPrice && <p style={{ margin: 0, color: "#10b981", fontWeight: "700" }}>₹{item.discountPrice}</p>}
              <p style={{ margin: 0, color: "#ef4444" }}>Expires in: {hours}h {minutes}m</p>
              {cart.some(c => c.id === item.id) ? (
                <button onClick={() => removeFromCart(item.id)} style={{ padding: "10px", borderRadius: "15px", border: "none", background: "#ef4444", color: "white", fontWeight: "700", cursor: "pointer" }}>
                  Remove from Cart
                </button>
              ) : (
                <button onClick={() => addToCart(item)} style={{ padding: "10px", borderRadius: "15px", border: "none", background: "#10b981", color: "white", fontWeight: "700", cursor: "pointer" }}>
                  Add to Cart
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserDashboard;