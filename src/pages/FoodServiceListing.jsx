import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Star, Ban } from 'lucide-react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const FoodServiceListing = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('');
  const [searchPincode, setSearchPincode] = useState('');
  const [services, setServices] = useState([]);
  const [isVendor, setIsVendor] = useState(false);

  const categories = [
    { name: 'Breakfast', id: 1 },
    { name: 'Lunch', id: 2 },
    { name: 'Dinner', id: 3 },
  ];

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const decoded = jwtDecode(token);
      if (decoded?.Role === 'Vendor') {
        setIsVendor(true);
      }
    } catch (err) {
      console.error('Invalid token', err);
    }
  }, [navigate]);

  const fetchServices = async () => {
    const categoryId = activeCategory
      ? categories.find((cat) => cat.name === activeCategory)?.id
      : '';

    try {
      setServices([]);

      const response = await axios.get(
        `https://localhost:7237/api/Menu/GetAllMenu?pincode=${searchPincode}&foodType=${categoryId || ''}`
      );

      const data = response.data;
      const extractedValues = data?.$values || [];

      setServices(extractedValues);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  useEffect(() => {
    if (!isVendor) {
      fetchServices();
    }
  }, [activeCategory, searchPincode, isVendor]);

  const renderStars = (rating = 0) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex items-center space-x-1">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} size={18} fill="orange" stroke="none" />
        ))}
        {halfStar && <Star size={18} fill="orange" stroke="none" className="opacity-50" />}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} size={18} stroke="gray" />
        ))}
      </div>
    );
  };

  const handleServiceClick = async (id) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      const userId = tokenPayload.UserId || tokenPayload.userId || tokenPayload.sub;

      const response = await axios.get(
        `https://localhost:7237/api/Order/OrderPlacingAndAddressDetails`,
        {
          params: {
            foodId: id,
            userLogedIn: userId
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const orderData = response.data;

      navigate('/mealsummary', {
        state: {
          userLoggedIn: true,
          serviceId: id,
          orderSummary: orderData
        }
      });
    } catch (error) {
      console.error('Error fetching meal summary:', error);
    }
  };

  if (isVendor) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <Ban className="w-24 h-24 text-red-400 mb-6" />
        <h1 className="text-3xl font-bold text-gray-800">Access Denied</h1>
        <p className="text-lg text-gray-600 mt-2 mb-4">Vendors do not have access to this screen.</p>
        <p className="text-sm text-gray-500">If you think this is a mistake, please contact support.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen bg-white">
      {/* Category Filters */}
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() =>
              setActiveCategory(category.name === activeCategory ? '' : category.name)
            }
            className={`px-5 py-2.5 rounded-full transition-colors duration-300 text-lg font-semibold shadow-sm ${
              category.name === activeCategory ? 'bg-orange-300 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            {category.name}
          </button>
        ))}
        <button
          onClick={() => setActiveCategory('')}
          className={`px-5 py-2.5 rounded-full text-lg font-semibold shadow-sm ${
            !activeCategory ? 'bg-orange-300 text-white' : 'bg-gray-200 text-gray-800'
          }`}
        >
          All
        </button>
      </div>

      {/* Pincode Search */}
      <div className="relative mb-10 max-w-md mx-auto">
        <input
          type="text"
          value={searchPincode}
          onChange={(e) => setSearchPincode(e.target.value)}
          placeholder="Enter your pincode..."
          className="w-full p-3.5 pl-12 rounded-md text-lg bg-gray-100 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={22} />
      </div>

      {/* Food Services */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.length > 0 ? (
          services.map((service) => (
            <div
              key={service.id}
              onClick={() => handleServiceClick(service.id)}
              className="bg-orange-100 hover:bg-orange-200 transition-all duration-300 p-8 rounded-2xl cursor-pointer shadow-lg"
            >
              <h3 className="text-2xl font-bold text-gray-900">{service.foodName}</h3>
              <p className="text-base text-gray-700 mt-3">Restaurant: {service.restrauntName}</p>
              <p className="text-base text-gray-700">Location: {service.location}</p>
              <p className="text-base text-gray-700">Area: {service.area}</p>
              <p className="text-base text-gray-700">Pincode: {service.pincode}</p>
              <p className="text-base text-green-700 mt-3 italic">{service.foodDesc}</p>
              <p className="text-lg font-bold text-gray-800 mt-3">Price: ₹{service.price}</p>
              <div className="mt-3">{renderStars(service.rating)}</div>
            </div>
          ))
        ) : (
          <p className="text-center text-lg text-gray-500 col-span-full">No services found</p>
        )}
      </div>
    </div>
  );
};

export default FoodServiceListing;
