import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import EventDetailsPage from "./pages/EventDetailsPage";
import CreateEventPage from "./pages/CreateEventPage";
import EditEventPage from "./pages/EditEventPage";
import ProtectedRoute from "./component/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

function Dashboard() {
  const { user, logout } = useAuth();
  return (
    <div className="max-w-3xl mx-auto mt-12 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      <p className="mb-4">
        Welcome, <span className="font-medium">{user?.name || user?.email || "user"}</span>!
      </p>
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
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto p-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-blue-600">EventEase</Link>
          <nav className="space-x-4">
            <Link to="/" className="text-sm text-gray-700 hover:underline">Home</Link>
            {user ? (
              <>
                <Link to="/create" className="text-sm text-gray-700 hover:underline">Create Event</Link>
                <Link to="/dashboard" className="text-sm text-gray-700 hover:underline">Dashboard</Link>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm text-gray-700 hover:underline">Login</Link>
                <Link to="/register" className="text-sm text-gray-700 hover:underline">Register</Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/event/:id" element={<EventDetailsPage />} />

          <Route
            path="/create"
            element={<ProtectedRoute><CreateEventPage /></ProtectedRoute>}
          />

          <Route
            path="/edit/:id"
            element={<ProtectedRoute><EditEventPage /></ProtectedRoute>}
          />

          <Route
            path="/dashboard"
            element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
