import  { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './components/Login/Login'
import Poll from "./components/Poll/Poll";
import Results from "./components/Result/Result";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) setUser(JSON.parse(loggedInUser));
  }, []);

  const handleLogin = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  if (!user) return <Login handleLogin={handleLogin} />;

  return (
    <Router className="app-container">
      <Navbar handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Poll user={user} />} />
        <Route path="/results" element={<Results user={user} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
