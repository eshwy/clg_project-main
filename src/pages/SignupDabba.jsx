import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const SignupDabba = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    ownerName: '',
    restaurantName: '',
    restaurantLocation: '',
    email: '',
    mobileNo: '',
    panCard: '',
    workingDays: [],
    bankIFSC: '',
    bankAccount: '',
    password: '',
    address: {
      doorNumber: '',
      street: '',
      area: '',
      city: '',
      state: '',
      postalCode: '',
      addressType: 'Home',
    },
  });

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const addressTypes = ['Home', 'Office', 'Friend', 'Other'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }));
  };

  const handleDayChange = (day) => {
    if (loading) return;
    setFormData((prev) => ({
      ...prev,
      workingDays: prev.workingDays.includes(day)
        ? prev.workingDays.filter((d) => d !== day)
        : [...prev.workingDays, day],
    }));
  };

  const handleSelectAll = () => {
    if (loading) return;
    setFormData((prev) => ({
      ...prev,
      workingDays: prev.workingDays.length === daysOfWeek.length ? [] : [...daysOfWeek],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: formData.ownerName,
      emailAddress: formData.email,
      password: formData.password,
      phoneNumber: formData.mobileNo,
      pancard: formData.panCard,
      bankIFSC: formData.bankIFSC,
      bankAccount: formData.bankAccount,
      restrauntName: formData.restaurantName,
      workingDays: formData.workingDays,
      address: formData.address,
    };

    try {
      const response = await fetch('https://localhost:7237/api/Login/registerVendor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toastr.success('Registered successfully!');
        navigate('/login');
      } else {
        const errorData = await response.json();
        toastr.error(errorData.message || 'Registration failed.');
      }
    } catch (error) {
      toastr.error('Something went wrong!');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-green-100 min-h-screen flex items-center justify-center p-4 font-title3">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-green-600 mb-6">Owner's Detail</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Owner & Restaurant Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input disabled={loading} type="text" name="ownerName" placeholder="Owner's Name" value={formData.ownerName} onChange={handleChange} className="input-field" required />
            <input disabled={loading} type="text" name="restaurantName" placeholder="Restaurant Name" value={formData.restaurantName} onChange={handleChange} className="input-field" required />
          </div>

          <input disabled={loading} type="text" name="restaurantLocation" placeholder="Restaurant Location" value={formData.restaurantLocation} onChange={handleChange} className="input-field" required />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input disabled={loading} type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="input-field" required />
            <input disabled={loading} type="tel" name="mobileNo" placeholder="Mobile No" value={formData.mobileNo} onChange={handleChange} className="input-field" required />
          </div>

          <input disabled={loading} type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="input-field" required />

          {/* PAN Card */}
          <input disabled={loading} type="text" name="panCard" placeholder="PAN Card" value={formData.panCard} onChange={handleChange} className="input-field" required />

          {/* Working Days */}
          <div className="border p-4 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-700">Working Days</h3>
              <button disabled={loading} type="button" onClick={handleSelectAll} className="text-green-500 hover:underline">
                {formData.workingDays.length === daysOfWeek.length ? 'Deselect all' : 'Select all'}
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {daysOfWeek.map((day) => (
                <label key={day} className="flex items-center space-x-2">
                  <input disabled={loading} type="checkbox" checked={formData.workingDays.includes(day)} onChange={() => handleDayChange(day)} className="checkbox" />
                  <span>{day}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Bank Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input disabled={loading} type="text" name="bankIFSC" placeholder="Bank IFSC Code" value={formData.bankIFSC} onChange={handleChange} className="input-field" required />
            <input disabled={loading} type="text" name="bankAccount" placeholder="Bank Account Number" value={formData.bankAccount} onChange={handleChange} className="input-field" required />
          </div>

          {/* Address */}
          <div className="border p-4 rounded-lg space-y-3">
            <h3 className="font-semibold text-gray-700 mb-2">Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input disabled={loading} type="text" name="doorNumber" placeholder="Door Number" value={formData.address.doorNumber} onChange={handleAddressChange} className="input-field" required />
              <input disabled={loading} type="text" name="street" placeholder="Street" value={formData.address.street} onChange={handleAddressChange} className="input-field" required />
              <input disabled={loading} type="text" name="area" placeholder="Area" value={formData.address.area} onChange={handleAddressChange} className="input-field" required />
              <input disabled={loading} type="text" name="city" placeholder="City" value={formData.address.city} onChange={handleAddressChange} className="input-field" required />
              <input disabled={loading} type="text" name="state" placeholder="State" value={formData.address.state} onChange={handleAddressChange} className="input-field" required />
              <input disabled={loading} type="text" name="postalCode" placeholder="Postal Code" value={formData.address.postalCode} onChange={handleAddressChange} className="input-field" required />
            </div>

            <div className="mt-3">
              <label className="block mb-1 font-medium text-sm text-gray-700">Address Type</label>
              <select disabled={loading} name="addressType" value={formData.address.addressType} onChange={handleAddressChange} className="input-field">
                {addressTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit */}
          <button type="submit" disabled={loading} className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition flex items-center justify-center">
            {loading ? (
              <span className="animate-spin h-5 w-5 mr-2 border-2 border-white border-t-transparent rounded-full"></span>
            ) : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupDabba;
