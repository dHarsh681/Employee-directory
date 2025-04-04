'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-100 py-8 flex items-center justify-center">
      <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong!</h2>
        <p className="text-gray-600 mb-6">
          We couldn't load the employee directory. Please try again later.
        </p>
        <button
          onClick={reset}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
          Try again
        </button>
      </div>
    </div>
  );
} 