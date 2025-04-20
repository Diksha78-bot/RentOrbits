import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
        <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-50 dark:bg-neutral-900 p-4">
          <h2 className="text-2xl font-bold mb-4">Please Login to Continue</h2>
          <button
            onClick={() => setShowLoginModal(true)}
            className="bg-primary-600 hover:bg-primary-700 text-white py-2 px-6 rounded-lg transition-colors"
          >
            Login / Sign Up
          </button>
        </div>
      </>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute; 