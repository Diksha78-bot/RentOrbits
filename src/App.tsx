import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import Chatbot from './components/Chatbot';
import Properties from './pages/Properties';

const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Cars = React.lazy(() => import('./pages/Cars'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Profile = React.lazy(() => import('./pages/Profile'));

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-sage-50 text-forest-900">
          <Navbar />
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-forest-600"></div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/cars" element={<ProtectedRoute><Cars /></ProtectedRoute>} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/properties" element={<Properties />} />
            </Routes>
          </Suspense>
          <Footer />
          <Chatbot />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App; 