import { useState } from "react";
import { registerUser } from "../api/authService";
import { auth, firebaseAvailable } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { loginWithGoogleToken } from "../api/authService";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (firebaseAvailable) {
        // Create the user in Firebase, then exchange token with backend to create DB user
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        const idToken = await userCred.user.getIdToken();
        await loginWithGoogleToken(idToken); // re-uses exchange flow to create backend user
        // After creating the account and exchanging token, send user to login flow
        navigate("/login");
      } else {
        await registerUser({ name, email, password });
        navigate("/login");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message || "Registration failed. Please check if the backend server is running.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Register</h2>
      {error && <p className="text-sm text-red-600 mb-3">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div>
          <button className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700" type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
