
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12 min-h-[500px] bg-gray-50">
      <div className="w-16 h-16 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-xl font-semibold text-gray-600 animate-pulse">Building your story...</p>
    </div>
  );
};

export default LoadingSpinner;
