import React, { useState, Suspense } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cars from './pages/Cars';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';

const App: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginSuccess = () => {
    setShowLogin(false);
  };

  return (
    <Router>
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
          <div className="text-white text-2xl">Loading...</div>
        </div>
      }>
        <div className="flex flex-col min-h-screen bg-gray-900">
          <Navbar onLoginClick={() => setShowLogin(true)} />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cars" element={
                <ProtectedRoute>
                  <Cars />
                </ProtectedRoute>
              } />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
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
      </Suspense>
    </Router>
  );
};

export default App; 