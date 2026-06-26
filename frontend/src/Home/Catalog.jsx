import React from "react";

const Catalog = () => {

  const mostpopular =[
    {
      image:"python.jpg",
      description:"The Complete Python Bootcamp From Zero to Hero in Python",
      rating:"4.5",
      amount:"1,200"
    }
  ]



  return (
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

    {/* Left Content */}
    <div className="lg:col-span-2">
      <div className="text-sm sm:text-base text-gray-500 mb-4">
        Home / Catalog /
        <span className="text-yellow-600"> Python</span>
      </div>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
        Python Programming
      </h1>

      <p className="text-gray-600 text-base sm:text-lg leading-7 sm:leading-8">
        Python is a general-purpose, versatile, and powerful
        programming language. It’s a great first language because
        Python code is concise and easy to read. Whatever you want
        to do, Python can do it. From web development to machine
        learning to data science, Python is the language for you.
      </p>
    </div>

    {/* Right Sidebar */}
    <div className="p-6 rounded-2xl  borderh-fit">
      <h2 className="text-red-600 text-xl sm:text-2xl font-semibold mb-5">
        Related Resources
      </h2>

      <ul className="space-y-3 text-gray-700">
        <li className="cursor-pointer rounded-lg px-3 py-2 hover:bg-cyan-50 hover:text-cyan-500 transition-all">
          📘 Python Documentation
        </li>

        <li className="cursor-pointer rounded-lg px-3 py-2 hover:bg-cyan-50 hover:text-cyan-500 transition-all">
          📄 Cheat Sheet
        </li>

        <li className="cursor-pointer rounded-lg px-3 py-2 hover:bg-cyan-50 hover:text-cyan-500 transition-all">
          📝 Articles
        </li>

        <li className="cursor-pointer rounded-lg px-3 py-2 hover:bg-cyan-50 hover:text-cyan-500 transition-all">
          👥 Community Forums
        </li>

        <li className="cursor-pointer rounded-lg px-3 py-2 hover:bg-cyan-50 hover:text-cyan-500 transition-all">
          🚀 Projects
        </li>
      </ul>
    </div>

  </div>
  <div>
    <h1  className="text-2xl sm:text-4xl md:text-4xl font-bold mb-6 text-red-700">Courses to get you started</h1>
  </div>
  <div className=" flex gap-3">
    <h1> Most popular</h1>
    <h1>New</h1>
    <h1>Trending</h1>
    {
     mostpopular.map((item,index)=>{
     return <div key={index}
      className="bg-white rounded-xl shadow-lg p-4">
       <img src="
       " alt="" />
       <h3 className="mt-4 font-semibold text-lg">
        {item.description}
      </h3>
      <div className="flex justify-between mt-3 text-sm text-gray-600">
        <span>⭐ {item.rating}</span>
        <span>₹ {item.amount}</span>
      </div>
      </div>
     })
    }
  </div>
</div>
  );
};

export default Catalog;
