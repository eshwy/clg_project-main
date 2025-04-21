import React from 'react';
import { NavLink } from 'react-router-dom';

const Card = () => {
  const data = [
    { img: 'https://imgs.search.brave.com/AWcoZwlAGkfQxeJwP2mF1FZa-UDzuWdAoGl6LNZc2DU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nbWFydC5jb20v/ZmlsZXMvNS9JbmRp/YW4tRm9vZC1QTkct/SW1hZ2UucG5n', name: 'Breakfast' },
    { img: '/images/dinner.webp', name: 'Lunch' },
    { img: '/images/lunch.jpg', name: 'Dinner' },
  ];

  return (
    <>
      <div className="flex justify-center pb-3 font-title3 bg-gradient-to-br from-green-50 to-green-100 ">
        <button className="mt-8 mb-6 w-48 h-12 text-white rounded-xl bg-[#4CAF50] font-semibold text-lg hover:bg-[#45a049] transition-colors">
          Online Order
        </button>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 px-4 pb-4 font-title3 text-2xl bg-gradient-to-br from-green-50 to-green-100
      ">
        {data.map((elem, index) => (
          <div
            key={index}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 max-w-xs mb-8 md:mb-0"
          >
            <div className="h-[200px] rounded-t-md overflow-hidden shadow-lg">
              <img
                src={elem.img}
                className="h-full w-full object-cover"
                alt={elem.name}
              />
            </div>
            <button className="text-base md:text-lg flex justify-center items-center bg-[#4CAF50] h-12 text-white rounded-b-md w-full hover:bg-[#45a049] transition-colors">
              <NavLink to="/foodservicelisting" className="w-full h-full flex justify-center items-center">
                {elem.name}
              </NavLink>
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Card;