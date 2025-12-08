import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./component/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

function Dashboard() {
  const { user, logout } = useAuth();
  return (
    <div className="max-w-3xl mx-auto mt-12 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      <p className="mb-4">Welcome, <span className="font-medium">{user?.name || user?.email || 'user'}</span>!</p>
      <button
        onClick={logout}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Log out
      </button>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">eventease</h1>
          <nav className="space-x-4 text-sm">
            <Link className="text-gray-600 hover:text-gray-900" to="/">Home</Link>
            <Link className="text-gray-600 hover:text-gray-900" to="/login">Login</Link>
            <Link className="text-gray-600 hover:text-gray-900" to="/register">Register</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <Routes>
          <Route path="/" element={<div className="p-6 bg-white rounded shadow">Home page. <Link className="text-blue-600 underline" to="/dashboard">Go to dashboard</Link></div>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
