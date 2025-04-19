import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cars from './pages/Cars';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './components/Login';

const App: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-900">
        <Navbar isLoggedIn={isLoggedIn} onLoginClick={() => setShowLogin(true)} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        {showLogin && (
          <Login
            onLoginSuccess={handleLoginSuccess}
            onClose={() => setShowLogin(false)}
          />
        )}
      </div>
    </Router>
  );
};

export default App; 