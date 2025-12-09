import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser, loginWithGoogleToken } from "../api/authService";
import { auth, googleProvider, firebaseAvailable } from "../firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (firebaseAvailable) {
        // Sign in with Firebase and exchange for backend JWT
        const creds = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await creds.user.getIdToken();
        const res = await loginWithGoogleToken(idToken);
        const user = res.user || { email };
        const token = res.token || idToken;
        login(user, token);
        navigate("/");
      } else {
        const res = await loginUser({ email, password });
        // expect res to contain { user, token } or similar
        const user = res.user || { email };
        const token = res.token || res?.accessToken || res?.jwt || null;
        login(user, token);
        navigate("/");
      }
    } catch (err) {
      setError(err?.message || err?.error || "Login failed");
    }
  };

  const handleGoogle = async () => {
    if (!firebaseAvailable) {
      setError("Google sign-in is not configured on this site.");
      return;
    }
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();
      const res = await loginWithGoogleToken(idToken);
      const user = res.user || { email: result.user.email, name: result.user.displayName };
      const token = res.token || idToken;
      login(user, token);
      navigate("/");
    } catch (err) {
      setError(err?.message || "Google sign-in failed");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      {error && <p className="text-sm text-red-600 mb-3">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
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
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" type="submit">Login</button>
          {firebaseAvailable ? (
            <button type="button" onClick={handleGoogle} className="px-3 py-2 border rounded hover:bg-gray-100">Sign in with Google</button>
          ) : (
            <span className="text-sm text-gray-500">Google sign-in not configured</span>
          )}
        </div>
      </form>
      <p className="mt-4 text-sm text-gray-600">
        Don't have an account? <Link className="text-blue-600 underline" to="/register">Register</Link>
      </p>
    </div>
  );
};

export default LoginForm;
