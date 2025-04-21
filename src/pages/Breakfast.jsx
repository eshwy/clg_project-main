import React, { useState } from 'react';
import { Search } from 'lucide-react';

const TiffinServicePage = () => {
  const [selectedMeal, setSelectedMeal] = useState('Breakfast');
  const [searchQuery, setSearchQuery] = useState('');

  const meals = ['Breakfast', 'Lunch', 'Dinner'];
  const tiffinServices = [
    { name: 'Tiffin Daddy', location: 'Phase 3, Industrial Area, Mohali, 41304', review: '"Wow! Great quality of food, especially popular among techies."' },
    { name: 'Tiffin Service by Home Chefs', location: 'Bangalore, 411012', review: '"Offers a variety of home-cooked meals delivered to your doorstep."' },
    { name: 'Dabba Express', location: 'Mumbai, 411002', review: '"Mumbai\'s best dabba in quick delivery of nutritious meals"' },
    { name: 'Tiffin Box', location: 'Delhi, 411005', review: '"Provides healthy and nutritious meals for working professionals."' },
    { name: 'Ghar Ka Khana', location: 'Pune, 411015', review: '"Focuses on homemade-style meals, catering to various dietary preferences."' },
    { name: 'Tiffinwala', location: 'Hyderabad, 411045', review: '"Offers a subscription-based service for daily meal deliveries."' },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="flex space-x-2 mb-4">
        {meals.map((meal) => (
          <button
            key={meal}
            className={`px-4 py-2 rounded ${
              selectedMeal === meal ? 'bg-orange-400 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setSelectedMeal(meal)}
          >
            {meal}
          </button>
        ))}
      </div>

      <div className="relative mb-6">
        <input
          type="text"
          placeholder="search by pincode"
          className="w-full p-2 pl-10 border rounded-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tiffinServices.map((service, index) => (
          <div key={index} className="bg-orange-100 p-4 rounded-md">
            <h3 className="font-bold text-lg">{service.name}</h3>
            <p className="text-sm text-gray-600">Location: {service.location}</p>
            <p className="mt-2 italic text-sm">{service.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TiffinServicePage;