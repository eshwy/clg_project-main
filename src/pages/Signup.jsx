import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    mobileNo: '',
    email: '',
    password: '',
    addressType: '',
    doorNumber: '',
    street: '',
    area: '',
    city: '',
    postal: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('Name', formData.name);
    form.append('PhoneNumber', formData.mobileNo);
    form.append('EmailAddress', formData.email);
    form.append('Password', formData.password);
    form.append('Address.AddressType', formData.addressType);
    form.append('Address.DoorNumber', formData.doorNumber);
    form.append('Address.Street', formData.street);
    form.append('Address.Area', formData.area);
    form.append('Address.City', formData.city);
    form.append('Address.Postal', formData.postal);

    try {
      const res = await fetch('https://localhost:7237/api/Login/register', {
        method: 'POST',
        body: form
      });

      if (res.ok) {
        toast.success('Registered successfully!', {
          position: 'top-center',
          transition: Slide
        });
        setTimeout(() => navigate('/login'), 1500);
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || 'Registration failed', {
          position: 'top-center',
          transition: Slide
        });
      }
    } catch (error) {
      toast.error('Something went wrong!', {
        position: 'top-center',
        transition: Slide
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8 font-title3">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Sign Up as User</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg" placeholder="Enter your name" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
            <input type="tel" name="mobileNo" value={formData.mobileNo} onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg" placeholder="Enter your mobile number" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg" placeholder="Enter your email" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg" placeholder="Enter your password" required />
          </div>

          {/* Address Section */}
          {/* Address Section */}
          <fieldset className="border p-4 rounded-md">
            <legend className="text-sm font-semibold text-gray-600 mb-2">Address Details</legend>

            <div className="mb-4">
              <label htmlFor="addressType" className="block text-sm font-medium text-gray-700 mb-1">Address Type</label>
              <select
                id="addressType"
                name="addressType"
                value={formData.addressType}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                required
              >
                <option value="">Select</option>
                <option value="Home">Home</option>
                <option value="Office">Office</option>
                <option value="Friend">Friend</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="doorNumber"
                placeholder="Door/Flat Number"
                value={formData.doorNumber}
                onChange={handleChange}
                className="px-4 py-2 border rounded-lg"
                required
              />
              <input
                type="text"
                name="street"
                placeholder="Street"
                value={formData.street}
                onChange={handleChange}
                className="px-4 py-2 border rounded-lg"
                required
              />
              <input
                type="text"
                name="area"
                placeholder="Area"
                value={formData.area}
                onChange={handleChange}
                className="px-4 py-2 border rounded-lg"
                required
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="px-4 py-2 border rounded-lg"
                required
              />
              <input
                type="text"
                name="postal"
                placeholder="PIN Code"
                value={formData.postal}
                onChange={handleChange}
                className="px-4 py-2 border rounded-lg"
                required
              />
            </div>
          </fieldset>

          <button type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors">
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-lg text-gray-600">
            Already have an account?{' '}
            <NavLink to="/login" className="text-green-500 hover:underline">
              Login here
            </NavLink>
            .
          </p>
        </div>
      </div>

      {/* Toast container */}
      <ToastContainer autoClose={2000} hideProgressBar newestOnTop closeOnClick />
    </div>
  );
};

export default Signup;
