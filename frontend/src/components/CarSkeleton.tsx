import React from 'react';

const CarSkeleton: React.FC = () => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-700"></div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <div className="h-5 bg-gray-700 rounded mb-2 w-3/4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2"></div>
          </div>
          <div className="text-right">
            <div className="h-6 bg-gray-700 rounded mb-1 w-16"></div>
            <div className="h-3 bg-gray-700 rounded w-12"></div>
          </div>
        </div>
        <div className="flex items-center space-x-1 mb-2">
          <div className="h-4 bg-gray-700 rounded w-24"></div>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="h-4 bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-700 rounded"></div>
        </div>
        <div className="h-10 bg-gray-700 rounded"></div>
      </div>
    </div>
  );
};

export default CarSkeleton;