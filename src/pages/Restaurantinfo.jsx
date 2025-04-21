import React from 'react';
import { MapPin, Share2, MessageSquare, Phone, ChevronRight, Star, Clock, Info } from 'lucide-react';
import { useParams } from 'react-router-dom';

const restaurantsData = {
  1: {
    name: 'Z&S',
    cuisines: ['North Indian', 'South Indian', 'Chinese'],
    location: 'Pune, 411016',
    phone: '+919604184922',
    description: 'Provides 2 meals per day quality food. Bulk orders are also available.',
    rating: 4.5,
    deliveryOnly: true,
    openingHours: '10:00 AM - 10:00 PM',
    deliveryTime: '30-40 mins',
    priceRange: '₹₹ (Medium)',
    highlights: ['Home-style cooking', 'Fresh ingredients', 'Customizable meals'],
    category: 'Breakfast',
    pincode: '411016',
    menu: [
      {
        name: 'Veg Thali',
        price: '₹120',
        description: '2 chapatis, 1 cup rice, dal, mixed vegetables, salad, and pickle.',
      },
      {
        name: 'Non-Veg Thali',
        price: '₹150',
        description: '2 chapatis, 1 cup rice, chicken curry, dal, salad, and pickle.',
      },
      {
        name: 'Jain',
        price: '₹180',
        description: '2 chapatis, 1 cup rice, dal, Jain vegetables, salad, and pickle.',
      },
    ],
  },
  2: {
    name: 'Dharminos',
    cuisines: ['Gujarati', 'Rajasthani', 'North Indian'],
    location: 'Pune, 411016',
    phone: '+919876543210',
    description: 'Offers a variety of home-cooked meals delivered to your doorstep.',
    rating: 4.2,
    deliveryOnly: true,
    openingHours: '9:00 AM - 9:00 PM',
    deliveryTime: '40-50 mins',
    priceRange: '₹₹₹ (High)',
    highlights: ['Organic ingredients', 'Daily specials', 'Family packs'],
    category: 'Lunch',
    pincode: '411016',
    menu: [
      {
        name: 'Gujarati Thali',
        price: '₹130',
        description: '2 rotlis, 1 cup rice, dal, kadhi, shaak, salad, and buttermilk.',
      },
      {
        name: 'Rajasthani Thali',
        price: '₹160',
        description: '2 bajra rotis, 1 cup rice, dal, gatte ki sabzi, salad, and churma.',
      },
      {
        name: 'North Indian Combo',
        price: '₹200',
        description: '2 naans, 1 cup rice, paneer butter masala, dal makhani, salad, and raita.',
      },
    ],
  },
  3: {
    name: 'Z&S',
    cuisines: ['Maharashtrian', 'Punjabi', 'South Indian'],
    location: 'Lonavala, 410401',
    phone: '+919700123456',
    description: 'Specializes in quick delivery of traditional Indian meals.',
    rating: 3.8,
    deliveryOnly: true,
    openingHours: '8:00 AM - 8:00 PM',
    deliveryTime: '35-45 mins',
    priceRange: '₹₹ (Medium)',
    highlights: ['Fast delivery', 'Traditional recipes', 'Daily menu'],
    category: 'Lunch',
    pincode: '410401',
    menu: [
      {
        name: 'Maharashtrian Thali',
        price: '₹140',
        description: '2 bhakris, 1 cup rice, varan bhat, aloo curry, salad, and pickle.',
      },
      {
        name: 'Punjabi Combo',
        price: '₹170',
        description: '2 parathas, 1 cup rice, rajma, salad, and lassi.',
      },
      {
        name: 'South Indian Platter',
        price: '₹150',
        description: '2 dosas, sambar, coconut chutney, and tomato chutney.',
      },
    ],
  },
  4: {
    name: 'Z&S',
    cuisines: ['Continental', 'Indian', 'Healthy'],
    location: 'Pune, 411016',
    phone: '+919812345678',
    description: 'Provides healthy and nutritious meals for working professionals.',
    rating: 4.0,
    deliveryOnly: false,
    openingHours: '7:00 AM - 11:00 PM',
    deliveryTime: '40-55 mins',
    priceRange: '₹₹₹ (High)',
    highlights: ['Nutritious meals', 'Balanced diet', 'Gluten-free options'],
    category: 'Dinner',
    pincode: '410401',
    menu: [
      {
        name: 'Quinoa Salad',
        price: '₹180',
        description: 'Quinoa, mixed greens, cherry tomatoes, cucumber, and lemon dressing.',
      },
      {
        name: 'Grilled Chicken',
        price: '₹250',
        description: 'Grilled chicken breast, steamed vegetables, and mashed potatoes.',
      },
      {
        name: 'Healthy Smoothie',
        price: '₹120',
        description: 'Blend of spinach, banana, almond milk, and chia seeds.',
      },
    ],
  },
  5: {
    name: 'Dharminos',
    cuisines: ['Home-cooked', 'Vegetarian', 'Jain'],
    location: 'Lonavala, 410401',
    phone: '+919654321098',
    description: 'Focuses on homemade-style meals, catering to various dietary preferences.',
    rating: 4.7,
    deliveryOnly: true,
    openingHours: '9:00 AM - 10:00 PM',
    deliveryTime: '25-35 mins',
    priceRange: '₹ (Low)',
    highlights: ['Homemade taste', 'Jain options', 'Affordable pricing'],
    category: 'Breakfast',
    pincode: '410401',
    menu: [
      {
        name: 'Jain Thali',
        price: '₹110',
        description: '2 chapatis, 1 cup rice, dal, Jain vegetables, salad, and pickle.',
      },
      {
        name: 'Homemade Paratha',
        price: '₹90',
        description: '2 parathas with aloo stuffing, curd, and pickle.',
      },
      {
        name: 'Dal Khichdi',
        price: '₹100',
        description: 'Khichdi made with moong dal, rice, and ghee.',
      },
    ],
  },
  6: {
    name: 'Dharminos',
    cuisines: ['Bengali', 'South Indian', 'Fusion'],
    location: 'Lonavala, 410401',
    phone: '+919876543221',
    description: 'Offers a subscription-based service for daily meal deliveries.',
    rating: 3.5,
    deliveryOnly: true,
    openingHours: '10:00 AM - 9:00 PM',
    deliveryTime: '45-60 mins',
    priceRange: '₹₹ (Medium)',
    highlights: ['Subscription plans', 'Wide variety', 'Comfort food'],
    category: 'Dinner',
    pincode: '411016',
    menu: [
      {
        name: 'Bengali Fish Curry',
        price: '₹220',
        description: 'Fish curry, steamed rice, and a side of salad.',
      },
      {
        name: 'Idli Sambar Combo',
        price: '₹100',
        description: '4 idlis, sambar, and coconut chutney.',
      },
      {
        name: 'Fusion Wrap',
        price: '₹150',
        description: 'Whole wheat wrap with paneer tikka, veggies, and mint chutney.',
      },
    ],
  },
};

export default function RestaurantInfo() {
  const { id } = useParams();
  const restaurant = restaurantsData[id];

  if (!restaurant) {
    return (
      <div className="flex items-center justify-center min-h-screen text-center">
        <h1 className="text-3xl font-bold text-red-500">Restaurant not found</h1>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 font-title3 text-xl">
      {/* Restaurant Header */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{restaurant.name}</h1>
          <p className="text-gray-600 text-lg mb-4">{restaurant.cuisines.join(', ')}</p>
          <p className="text-gray-600 mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2" /> {restaurant.location}
          </p>
          <a
            href={`tel:${restaurant.phone}`}
            className="flex items-center text-green-600 hover:text-green-700 mb-6 text-lg"
          >
            <Phone className="w-5 h-5 mr-2" /> {restaurant.phone}
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-green-100 px-4 py-2 rounded-full">
            <Star className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-green-600 font-semibold">{restaurant.rating}</span>
          </div>
          {restaurant.deliveryOnly && (
            <div className="inline-block bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
              Delivery Only
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-6">
        <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600">
          <MapPin className="w-5 h-5" /> Direction
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
          <Share2 className="w-5 h-5" /> Share
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600">
          <MessageSquare className="w-5 h-5" /> Reviews
        </button>
      </div>

      {/* Restaurant Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="p-4 bg-gray-50 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-2 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-green-600" /> Opening Hours
          </h3>
          <p className="text-gray-600">{restaurant.openingHours}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-2 flex items-center">
            <Info className="w-5 h-5 mr-2 text-green-600" /> Delivery Info
          </h3>
          <p className="text-gray-600">Delivery Time: {restaurant.deliveryTime}</p>
          <p className="text-gray-600">Price Range: {restaurant.priceRange}</p>
        </div>
      </div>

      {/* Highlights */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Highlights</h3>
        <div className="flex flex-wrap gap-2">
          {restaurant.highlights.map((highlight, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-green-100 text-green-800 border border-green-300 rounded-full"
            >
              {highlight}
            </span>
          ))}
        </div>
      </div>

      {/* Menu Section */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Menu</h2>
          <button className="text-green-600 hover:text-green-700 flex items-center">
            See all menus
            <ChevronRight className="w-5 h-5 ml-1" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {restaurant.menu.map((item, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg shadow-md">
              <h3 className="text-lg font-medium">{item.name}</h3>
              <p className="text-gray-600">{item.price}</p>
              <p className="text-sm text-gray-500 mt-2">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-md">
        <h3 className="text-lg font-medium mb-2">About</h3>
        <p className="text-gray-600">{restaurant.description}</p>
      </div>
    </div>
  );
}