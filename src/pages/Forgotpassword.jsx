import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const Forgotpassword = () => {
  const [formData, setFormData] = useState({ email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post('https://localhost:7237/api/Login/changePassword', {
        emailAddress: formData.email,
      });

      if (response.status === 200) {
        toastr.success('Password reset successful. Check your email.', 'Success');
        navigate('/login');
      }
    } catch (error) {
      const message = error?.response?.data || 'Something went wrong';
      toastr.error(message, 'Error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center px-4 pt-14 pb-14 font-title3">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center justify-center">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
              placeholder="Enter your email"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-green-500 text-white py-2 rounded-lg transition-colors ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'
            }`}
          >
            {isSubmitting ? 'Please wait...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Forgotpassword;
