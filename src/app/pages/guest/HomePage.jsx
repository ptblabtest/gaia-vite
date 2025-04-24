import ApplicationLogo from '@/components/ApplicationLogo';
import Button from '@/components/Button';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const HomePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="p-8 rounded-xl shadow-lg text-center">
        <ApplicationLogo className="mx-auto w-32 h-auto mb-6" />
        <h1 className="text-4xl font-bold mb-6 text-gray-800">
          Welcome to <span className="text-green-600">Gaia</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8">Trial App GAIA SI</p>
        <Button
          onClick={handleLogin}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transform hover:scale-105 transition-transform duration-200"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Loading...
            </>
          ) : (
            'Get Started'
          )}
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
