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
    <>
    <h1 className="text-blue-500">eventease</h1>
    </>
  )
}

export default App;
