import React from 'react';
import { BsPeopleFill } from 'react-icons/bs';
import { GiHotMeal, GiCardboardBox } from 'react-icons/gi';
import { AiFillAlert } from 'react-icons/ai';
import { ImSpoonKnife } from 'react-icons/im';

const Whychoose = () => {
  return (
    <div className="bg-[#FFDFC6] py-10 lg:py-20 font-title3 text-xl">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-8 lg:gap-16">
          {/* Left Section */}
          <div className="text-center lg:text-left max-w-xl">
            <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl mb-6 lg:mb-10">
              Why Choose Us?
            </h1>
            <ul className="space-y-4 text-lg sm:text-xl lg:text-2xl">
              <li className="flex items-center justify-center lg:justify-start">
                <div className="mr-3">
                  <AiFillAlert className="text-2xl sm:text-3xl" />
                </div>
                Affordable Home made meal
              </li>
              <li className="flex items-center justify-center lg:justify-start">
                <div className="mr-3">
                  <GiHotMeal className="text-2xl sm:text-3xl" />
                </div>
                Customized food
              </li>
              <li className="flex items-center justify-center lg:justify-start">
                <div className="mr-3">
                  <GiCardboardBox className="text-2xl sm:text-3xl" />
                </div>
                Easy Order
              </li>
              <li className="flex items-center justify-center lg:justify-start">
                <div className="mr-3">
                  <BsPeopleFill className="text-2xl sm:text-3xl" />
                </div>
                Choose from multiple vendors
              </li>
              <li className="flex items-center justify-center lg:justify-start">
                <div className="mr-3">
                  <ImSpoonKnife className="text-2xl sm:text-3xl" />
                </div>
                Different meal plans
              </li>
            </ul>
          </div>

          {/* Right Section */}
          <div className="flex justify-center lg:justify-end">
            <img
              src="/images/whyy.png"
              alt="Why Choose Us"
              className="w-[200px] sm:w-[250px] md:w-[300px] lg:w-[400px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Whychoose;