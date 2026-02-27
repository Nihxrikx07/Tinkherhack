 App.jsx
import React, { useState } from "react";
import { Mail, Lock, Leaf, ArrowRight, Building, LogOut, Eye, EyeOff, ShoppingCart } from "lucide-react";

// --- SHARED COMPONENTS ---
const AuthLayout = ({ title, subtitle, children, onBack }) => (
  <div
    style={{
      minHeight: "90vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "50px",
      background: "#f3f4f6",
    }}
  >
    <div
      style={{
        maxWidth: "400px",
        width: "100%",
        background: "white",
        borderRadius: "30px",
        padding: "40px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        border: "1px solid #e5e7eb",
      }}
    >
      {onBack && (
        <button
          onClick={onBack}
          style={{
            marginBottom: "20px",
            color: "#4ade80",
            fontWeight: "600",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            cursor: "pointer",
            background: "none",
            border: "none",
          }}
        >
          <ArrowRight size={16} /> Back
        </button>
      )}
      <h2
        style={{
          fontSize: "28px",
          fontWeight: "900",
          marginBottom: "10px",
          textAlign: "center",
        }}
      >
        {title}
      </h2>
      <p
        style={{
          color: "#6b7280",
          fontWeight: "500",
          marginBottom: "25px",
          textAlign: "center",
        }}
      >
        {subtitle}
      </p>
      {children}
    </div>
  </div>
);

// --- DASHBOARDS ---
const sampleFood = [
  {
    id: 1,
    name: "Veg Sandwich",
    price: 50,
    expiry: "2 hours",
    image: "https://images.unsplash.com/photo-1604908177522-f18449ae72fc?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    name: "Paneer Wrap",
    price: 80,
    expiry: "3 hours",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    name: "Burger",
    price: 120,
    expiry: "1 hour",
    image: "https://images.unsplash.com/photo-1617196030973-3274d38c113d?auto=format&fit=crop&w=400&q=80",
  },
];

const UserDashboard = ({ user, onLogout }) => {
  const [cart, setCart] = useState([]);
  const addToCart = (item) => setCart([...cart, item]);

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", padding: "40px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <div>
          <p style={{ color: "#4ade80", fontWeight: "700", fontSize: "14px" }}>Welcome back,</p>
          <h2 style={{ fontSize: "28px", fontWeight: "900" }}>{user.name}</h2>
        </div>
        <button onClick={onLogout} style={{ background: "#d1d5db", border: "none", padding: "10px", borderRadius: "10px", cursor: "pointer" }}>
          <LogOut size={20} />
        </button>
      </div>

      <h3 style={{ fontWeight: "700", marginBottom: "15px" }}>Available Food</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
        {sampleFood.map((item) => (
          <div
            key={item.id}
            style={{ background: "white", padding: "15px", borderRadius: "15px", boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }}
          >
            <img src={item.image} alt={item.name} style={{ width: "100%", borderRadius: "10px", marginBottom: "10px" }} />
            <h4 style={{ fontWeight: "700" }}>{item.name}</h4>
            <p>Price: ₹{item.price}</p>
            <p>Expiry: {item.expiry}</p>
            <button
              onClick={() => addToCart(item)}
              style={{ padding: "8px 15px", borderRadius: "20px", background: "#10b981", color: "white", border: "none", cursor: "pointer", marginTop: "10px" }}
            >
              <ShoppingCart size={16} /> Add to Cart
            </button>
          </div>
        ))}
      </div>
      {cart.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h4 style={{ fontWeight: "700" }}>Cart ({cart.length} items)</h4>
          <ul>
            {cart.map((item, idx) => (
              <li key={idx}>
                {item.name} - ₹{item.price}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const HotelDashboard = ({ user, onLogout }) => {
  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", padding: "40px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: "900" }}>{user.name}</h2>
        <button onClick={onLogout} style={{ background: "#d1d5db", border: "none", padding: "10px", borderRadius: "10px", cursor: "pointer" }}>
          <LogOut size={20} />
        </button>
      </div>

      <h3 style={{ fontWeight: "700", marginBottom: "15px" }}>Your Food Items</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
        {sampleFood.map((item) => (
          <div key={item.id} style={{ background: "white", padding: "15px", borderRadius: "15px", boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }}>
            <img src={item.image} alt={item.name} style={{ width: "100%", borderRadius: "10px", marginBottom: "10px" }} />
            <h4 style={{ fontWeight: "700" }}>{item.name}</h4>
            <p>Price: ₹{item.price}</p>
            <p>Expiry: {item.expiry}</p>
            <button
              style={{ padding: "8px 15px", borderRadius: "20px", background: "#10b981", color: "white", border: "none", cursor: "pointer", marginTop: "10px" }}
            >
              Manage Item
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- REGISTRATION & LOGIN VIEWS ---
const RegistrationView = ({ type, onRegisterSuccess, onBack }) => {
  const isHotel = type === "hotel";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthLayout title={isHotel ? "Hotel Partner" : "Food Saver"} subtitle={isHotel ? "Start recovering revenue from surplus" : "Get quality meals at lower prices"} onBack={onBack}>
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <input
          type="text"
          placeholder={isHotel ? "Restaurant Name" : "Full Name"}
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", padding: "12px", borderRadius: "20px", border: "1px solid #e5e7eb" }}
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "12px", borderRadius: "20px", border: "1px solid #e5e7eb" }}
        />
        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "12px", borderRadius: "20px", border: "1px solid #e5e7eb" }}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{ position: "absolute", right: "15px", top: "50%", transform: "translateY(-50%)", cursor: "pointer" }}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>
        <button
          onClick={() => onRegisterSuccess(type, name)}
          style={{ width: "100%", padding: "12px", borderRadius: "25px", border: "none", background: "#10b981", color: "white", fontWeight: "700", cursor: "pointer" }}
        >
          Register & Continue
        </button>
      </div>
    </AuthLayout>
  );
};

const LoginView = ({ onLogin, onBack }) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("user");

  return (
    <AuthLayout title="Login" subtitle="Select your role to continue" onBack={onBack}>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: "100%", padding: "12px", marginBottom: "10px", borderRadius: "20px", border: "1px solid #e5e7eb" }}
      />
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button
          onClick={() => setRole("user")}
          style={{
            flex: 1,
            background: role === "user" ? "#10b981" : "#d1d5db",
            color: role === "user" ? "white" : "#111827",
            padding: "10px",
            borderRadius: "15px",
            border: "none",
            fontWeight: role === "user" ? "700" : "500",
            cursor: "pointer",
            transition: "0.3s",
          }}
        >
          Consumer
        </button>
        <button
          onClick={() => setRole("hotel")}
          style={{
            flex: 1,
            background: role === "hotel" ? "#10b981" : "#d1d5db",
            color: role === "hotel" ? "white" : "#111827",
            padding: "10px",
            borderRadius: "15px",
            border: "none",
            fontWeight: role === "hotel" ? "700" : "500",
            cursor: "pointer",
            transition: "0.3s",
          }}
        >
          Hotel
        </button>
      </div>
      <button
        onClick={() => onLogin(role, name)}
        style={{ width: "100%", padding: "12px", borderRadius: "25px", border: "none", background: "#10b981", color: "white", fontWeight: "700", cursor: "pointer" }}
      >
        Sign In
      </button>
    </AuthLayout>
  );
};

// --- LANDING PAGE ---
const LandingPage = ({ onNavigate }) => (
  <div style={{ textAlign: "center", padding: "80px 20px", background: "#f9fafb" }}>
    <Leaf size={50} color="#10b981" style={{ marginBottom: "20px" }} />
    <h1 style={{ fontSize: "48px", fontWeight: "900", marginBottom: "20px" }}>
      Eat Good. <span style={{ color: "#10b981" }}>Save Better.</span>
    </h1>
    <button
      onClick={() => onNavigate("register-user")}
      style={{ padding: "15px 40px", background: "#10b981", color: "white", fontWeight: "700", borderRadius: "25px", border: "none", cursor: "pointer" }}
    >
      Join as Consumer
    </button>
    <button
      onClick={() => onNavigate("register-hotel")}
      style={{ padding: "15px 40px", marginLeft: "10px", borderRadius: "25px", border: "2px solid #10b981", background: "#10b981", color: "white", cursor: "pointer" }}
    >
      Join as Hotel
    </button>
  </div>
);

// --- MAIN APP ---
export default function App() {
  const [view, setView] = useState("landing");
  const [currentUser, setCurrentUser] = useState(null);

  const handleRegisterSuccess = (role, name) => {
    setCurrentUser({ role, name });
    setView(role === "hotel" ? "dashboard-hotel" : "dashboard-user");
  };

  const handleLogin = (role, name) => {
    setCurrentUser({ role, name });
    setView(role === "hotel" ? "dashboard-hotel" : "dashboard-user");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView("landing");
  };

  return (
    <div style={{ fontFamily: "sans-serif", color: "#111827" }}>
      {!currentUser && (
        <nav style={{ display: "flex", justifyContent: "space-between", padding: "20px 40px", background: "white", borderBottom: "1px solid #e5e7eb" }}>
          <div onClick={() => setView("landing")} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
            <Leaf size={28} color="#10b981" />
            <span style={{ fontWeight: "900", fontSize: "24px" }}>SaveTheServe</span>
          </div>
          <div>
            <button onClick={() => setView("login")} style={{ background: "none", border: "none", color: "#111827", fontWeight: "700", cursor: "pointer" }}>
              Login
            </button>
          </div>
        </nav>
      )}

      {view === "landing" && <LandingPage onNavigate={setView} />}
      {view === "register-user" && <RegistrationView type="user" onRegisterSuccess={handleRegisterSuccess} onBack={() => setView("landing")} />}
      {view === "register-hotel" && <RegistrationView type="hotel" onRegisterSuccess={handleRegisterSuccess} onBack={() => setView("landing")} />}
      {view === "login" && <LoginView onLogin={handleLogin} onBack={() => setView("landing")} />}
      {view === "dashboard-user" && currentUser && <UserDashboard user={currentUser} onLogout={handleLogout} />}
      {view === "dashboard-hotel" && currentUser && <HotelDashboard user={currentUser} onLogout={handleLogout} />}
    </div>
  );
}
