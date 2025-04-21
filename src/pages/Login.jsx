import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await axios.post('https://localhost:7237/api/Login', {
        emailAddress: formData.email,
        password: formData.password,
      });

      if (response.status === 200) {
        const { token } = response.data;

        // Save token in localStorage
        localStorage.setItem('authToken', token);

        setSuccessMessage('Login successful!');
        setTimeout(() => {
          navigate('/foodservicelisting');
        }, 1500);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8 font-title3 text-xl">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Login as User</h2>

        {errorMessage && (
          <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded-md text-center">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="bg-green-100 text-green-700 px-4 py-2 mb-4 rounded-md text-center">
            {successMessage}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="text-right">
            <NavLink
              to="/forgotpassword"
              className="text-sm text-green-500 hover:underline"
            >
              Forgot password?
            </NavLink>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-lg text-gray-600">
            Don't have an account?{' '}
            <NavLink to="/signup" className="text-green-500 hover:underline">
              Sign up here
            </NavLink>
            .
          </p>
        </div>

        <div className="mt-4 text-center">
          <p className="text-lg text-gray-600">
            Login as Dabba wala?{' '}
            <NavLink to="/logindabba" className="text-green-500 hover:underline">
              Login here
            </NavLink>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
