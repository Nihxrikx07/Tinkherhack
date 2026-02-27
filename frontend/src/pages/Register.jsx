import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

const handleRegister = async (type, name, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user info in Firestore
    await setDoc(doc(db, "users", user.uid), {
      name,
      email,
      role: type
    });

    alert("Registration successful!");
    if (type === "hotel") setView("dashboard-hotel");
    else setView("dashboard-user");
  } catch (error) {
    alert(error.message);
  }
};