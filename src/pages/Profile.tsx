import React from 'react';
import { useAuth } from '../context/AuthContext';

const Profile: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Profile</h1>
        
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">User Information</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-400">Name</p>
              <p className="text-white">{user?.displayName || 'Not set'}</p>
            </div>
            <div>
              <p className="text-gray-400">Email</p>
              <p className="text-white">{user?.email}</p>
            </div>
            <div>
              <p className="text-gray-400">Member Since</p>
              <p className="text-white">
                {user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Rental History</h2>
          <div className="space-y-4">
            {/* This will be populated with actual rental data in the future */}
            <p className="text-gray-400">No rentals found.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 