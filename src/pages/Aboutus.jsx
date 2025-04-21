import React from 'react';
import { GiMeal, GiHealthPotion, GiHeartPlus, GiMoneyStack, GiFamilyHouse } from 'react-icons/gi';

const Aboutus = () => {
  return (
    <div className="bg-gradient-to-br from-green-50 to-green-100 min-h-screen py-10 px-4 sm:px-8 lg:px-16">
      {/* Heading */}
      <h1 className="text-center font-bold text-3xl sm:text-4xl lg:text-5xl text-green-700 mb-8 font-custom font-title2">
        About Us
      </h1>

      {/* Content */} 
      <div className="max-w-4xl mx-auto text-lg sm:text-xl text-gray-700 leading-relaxed font-sans font-title2">
        {/* Section 1: The Art of Home-Cooked Meals */}
        <div className="mb-12">
          <div className="flex items-center mb-4">
            <GiMeal className="text-4xl text-green-700 mr-4" />
            <h2 className="text-2xl sm:text-3xl font-bold text-green-800 font-custom">
              The Art of Home-Cooked Meals: Nourishing Body and Soul
            </h2>
          </div>
          <p className="mb-8">
            In a world filled with quick fixes and fast food, the importance of a home-cooked meal cannot be overstated. It’s more than just food; it’s an act of care, a celebration of health, and a connection to tradition.
          </p>
        </div>

        {/* Section 2: Why Home-Cooked Meals Matter */}
        <div className="mb-12">
          <div className="flex items-center mb-4">
            <GiHealthPotion className="text-4xl text-green-700 mr-4" />
            <h3 className="text-xl sm:text-2xl font-bold text-green-800 font-custom">
              Why Home-Cooked Meals Matter
            </h3>
          </div>
          <p className="mb-8">
            Cooking at home allows you to control ingredients and portion sizes, ensuring a balanced diet rich in nutrients. It’s an opportunity to avoid processed additives and focus on fresh, wholesome ingredients that fuel your body and mind.
          </p>
        </div>

        {/* Section 3: Emotional Well-Being */}
        <div className="mb-12">
          <div className="flex items-center mb-4">
            <GiHeartPlus className="text-4xl text-green-700 mr-4" />
            <h3 className="text-xl sm:text-2xl font-bold text-green-800 font-custom">
              Emotional Well-Being
            </h3>
          </div>
          <p className="mb-8">
            Preparing and sharing meals with loved ones fosters connection and mindfulness. The process of cooking can be therapeutic, offering a sense of accomplishment and joy in creating something from scratch.
          </p>
        </div>

        {/* Section 4: Cost-Effective and Sustainable */}
        <div className="mb-12">
          <div className="flex items-center mb-4">
            <GiMoneyStack className="text-4xl text-green-700 mr-4" />
            <h3 className="text-xl sm:text-2xl font-bold text-green-800 font-custom">
              Cost-Effective and Sustainable
            </h3>
          </div>
          <p className="mb-8">
            Beyond health benefits, home-cooked meals are lighter on the wallet and often lead to less food waste. Planning and cooking at home help make thoughtful choices that are both economical and environmentally friendly.
          </p>
        </div>

        {/* Section 5: Cultural and Personal Identity */}
        <div className="mb-12">
          <div className="flex items-center mb-4">
            <GiFamilyHouse className="text-4xl text-green-700 mr-4" />
            <h3 className="text-xl sm:text-2xl font-bold text-green-800 font-custom">
              Cultural and Personal Identity
            </h3>
          </div>
          <p className="mb-8">
            Cooking at home preserves family recipes and traditions, keeping cultural roots alive. Each dish becomes a story, carrying memories and values that are passed down through generations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;