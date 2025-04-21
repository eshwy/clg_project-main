import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Plus, Minus } from 'lucide-react';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const MealSummaryForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [subscription, setSubscription] = useState('');
  const [total, setTotal] = useState(0);
  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (location.state?.orderSummary) {
      const data = location.state.orderSummary;
      setFormData(data);
      const firstAddress = data.addresses?.$values?.[0]?.id || '';
      setSelectedAddressId(firstAddress);
    }
  }, [location]);

  useEffect(() => {
    calculateTotal();
  }, [quantity, subscription, formData]);

  const calculateTotal = () => {
    if (!formData) return;

    const basePrice = formData.price * quantity;
    let discount = 0;

    if (subscription === 'week') {
      discount = 0.05 * basePrice;
    } else if (subscription === 'month') {
      discount = 0.08 * basePrice;
    }

    setTotal(basePrice - discount);
  };

  const handleQuantityChange = (inc) => {
    setQuantity((prev) => Math.max(1, prev + inc));
  };

  const handleSubscriptionChange = (e) => {
    setSubscription(e.target.value);
  };

  const handleAddressChange = (e) => {
    setSelectedAddressId(e.target.value);
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to clear the cart?')) {
      navigate('/foodservices');
    }
  };

  const handleOrderNow = async (e) => {
    e.preventDefault();

    if (!subscription) {
      toastr.warning('Please select a subscription model');
      return;
    }

    if (!window.confirm('Are you sure you want to place the order?')) return;

    try {
      setIsLoading(true);

      const token = localStorage.getItem('authToken');
      const decoded = jwtDecode(token);
      const userId = decoded.UserId;

      const url = `https://localhost:7237/api/Order/placeOrder?userId=${userId}&adressId=${selectedAddressId}&Quantity=${quantity}&foodId=${formData.foodId}&amount=${total.toFixed(2)}`;

      await axios.post(url);

      toastr.success('Order placed successfully!');
      navigate('/foodservicelisting');
    } catch (error) {
      toastr.error('Failed to place order. Please try again.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!formData) return <div className="text-center mt-10">Loading summary...</div>;

  const addresses = formData.addresses?.$values || [];

  return (
    <div className="max-w-lg mx-auto bg-orange-100 p-6 rounded-lg shadow-md mb-4 mt-4 w-full sm:w-3/4 lg:w-2/3 font-title3 relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-60 flex items-center justify-center rounded-lg z-50">
          <div className="text-lg font-bold animate-pulse">Placing Order...</div>
        </div>
      )}

      <h1 className="text-xl font-bold mb-4 text-center">Meal Summary</h1>
      <form className="space-y-4" onSubmit={handleOrderNow}>
        <input type="text" value={formData.name} disabled className="w-full p-2 rounded-md bg-gray-200" />
        <input type="tel" value={formData.phone} disabled className="w-full p-2 rounded-md bg-gray-200" />

        {/* Address Dropdown */}
        <div className="relative">
          <select
            className="w-full p-2 rounded-md bg-gray-200 appearance-none"
            value={selectedAddressId}
            onChange={handleAddressChange}
          >
            {addresses.map((addr) => (
              <option key={addr.id} value={addr.id}>
                {`${addr.doorNumber}, ${addr.street}, ${addr.area}, ${addr.city}, ${addr.state}, ${addr.postalCode}`}
              </option>
            ))}
          </select>
          <ChevronDown
            size={20}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
          />
        </div>

        {/* Subscription Dropdown */}
        <div className="relative">
          <select
            className="w-full p-2 rounded-md bg-gray-200 appearance-none"
            value={subscription}
            onChange={handleSubscriptionChange}
          >
            <option value="" disabled hidden>Select Subscription Model</option>
            <option value="day">Daily</option>
            <option value="week">Weekly (5% off)</option>
            <option value="month">Monthly (8% off)</option>
          </select>
          <ChevronDown
            size={20}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
          />
        </div>

        {/* Quantity Control */}
        <div className="flex items-center justify-between">
          <span className="font-semibold">Quantity</span>
          <div className="flex items-center">
            <button type="button" onClick={() => handleQuantityChange(-1)} className="bg-gray-200 p-2 rounded-md">
              <Minus size={16} />
            </button>
            <span className="mx-4">{quantity}</span>
            <button type="button" onClick={() => handleQuantityChange(1)} className="bg-gray-200 p-2 rounded-md">
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center">
          <span className="font-semibold">Total</span>
          <span className="bg-gray-200 px-4 py-2 rounded-md">₹ {total.toFixed(2)}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-2 mt-6">
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 w-full sm:w-auto"
            disabled={isLoading}
          >
            Order Now
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 w-full sm:w-auto"
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default MealSummaryForm;
