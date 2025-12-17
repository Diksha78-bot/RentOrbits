import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faRedo } from '@fortawesome/free-solid-svg-icons';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ 
  message = "Unable to load car listings. Please try again.", 
  onRetry 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <FontAwesomeIcon 
        icon={faExclamationTriangle} 
        className="text-6xl text-red-500 mb-4" 
      />
      <h3 className="text-xl font-semibold text-white mb-2">Oops! Something went wrong</h3>
      <p className="text-gray-400 mb-6 max-w-md">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
        >
          <FontAwesomeIcon icon={faRedo} />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
};

export default ErrorState;