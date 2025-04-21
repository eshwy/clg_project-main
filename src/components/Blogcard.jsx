import React, { useState } from "react";

const Blogcard = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const data = [
    {
      date: "Date: 1-01-2024",
      img: "https://imgs.search.brave.com/AWcoZwlAGkfQxeJwP2mF1FZa-UDzuWdAoGl6LNZc2DU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nbWFydC5jb20v/ZmlsZXMvNS9JbmRp/YW4tRm9vZC1QTkct/SW1hZ2UucG5n",
      desc: "Farm-to-Table: Celebrating Local Ingredients and Sustainable Cooking",
      content:
        "Farm-to-table is more than just a trend; it's a movement towards sustainable living. By sourcing ingredients locally, we reduce our carbon footprint and support local farmers. This blog explores how you can incorporate farm-to-table practices into your cooking, with tips on finding local produce, seasonal recipes, and the benefits of eating fresh, organic food. Join us as we celebrate the flavors of local ingredients and sustainable cooking!",
    },
    {
      date: "Date: 1-01-2024",
      img: "https://imgs.search.brave.com/_EPIASgWfsW3OXHbPZI55ZVUPD3wgK0-0ZxKxMWKcko/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nbWFydC5jb20v/ZmlsZXMvNS9JbmRp/YW4tRm9vZC1QTkct/UGhvdG9zLnBuZw",
      desc: "Culinary Adventure: Exploring the Flavours of Global Street Food",
      content:
        "Street food is the heart and soul of a culture's culinary identity. From the spicy chaat of India to the savory tacos of Mexico, street food offers a glimpse into the traditions and flavors of a region. In this blog, we take you on a culinary adventure around the world, exploring the best street food dishes, their origins, and how you can recreate these flavors at home. Get ready to tantalize your taste buds!",
    },
    {
      date: "Date: 1-01-2024",
      img: "https://imgs.search.brave.com/HwSzVgPXMpsDN_v9e4vj_zN8KSZxhjzQVKFJTd9m7KA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nbWFydC5jb20v/ZmlsZXMvNS9JbmRp/YW4tRm9vZC1QTkct/UGljLnBuZw",
      desc: "Gourmet on a Budget: Delicious Recipes That Won't Break the Bank",
      content:
        "Eating gourmet doesn't have to mean spending a fortune. With a little creativity and smart shopping, you can create restaurant-quality meals at home without breaking the bank. This blog shares budget-friendly recipes, tips for saving money on groceries, and how to make the most of pantry staples. From creamy risottos to decadent desserts, we prove that gourmet cooking is accessible to everyone.",
    },
    {
      date: "Date: 1-01-2024",
      img: "/images/dinner.webp",
      desc: "Food Fusion: Creative Recipes That Blend Culinary Traditions",
      content:
        "Food fusion is the art of combining elements from different culinary traditions to create something entirely new and exciting. In this blog, we explore the world of fusion cuisine, from sushi burritos to kimchi tacos. Discover how to blend flavors, techniques, and ingredients from different cultures to create unique and delicious dishes. Whether you're a seasoned chef or a home cook, these recipes will inspire you to think outside the box.",
    },
  ];

  const handleReadMoreClick = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-green-100 py-14 font-title3">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-green-800 text-center mb-10 font-title2">
          Latest Blog Posts
        </h1>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {data.map((elem, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col overflow-hidden"
            >
              <img
                src={elem.img}
                alt="Blog"
                className="h-48 w-full object-cover rounded-t-2xl"
              />
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-sm text-gray-500 mb-2">{elem.date}</p>
                <h2 className="text-xl font-semibold text-green-800 mb-3 line-clamp-2">
                  {elem.desc}
                </h2>
                {expandedIndex === index && (
                  <p className="text-gray-700 mb-4 text-sm transition-all duration-300">
                    {elem.content}
                  </p>
                )}
                <button
                  onClick={() => handleReadMoreClick(index)}
                  className="mt-auto self-start text-sm bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
                >
                  {expandedIndex === index ? "Read Less" : "Read More"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogcard;
