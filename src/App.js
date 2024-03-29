// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Signup from './pages/signup/Signup';
import Navbar from './components/Navbar';
import { AuthContextProvider } from './context/AuthContext';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const { authIsReady, user } = useAuthContext();

  if (!authIsReady) {
    // You may choose to show a loading indicator while authentication is in progress
    return <div>Loading...</div>;
  }

  // We don't want to show any of the component tree until auth is ready in AuthContext.js file
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <Signup />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default function AppStart() {
  return (
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  );
}