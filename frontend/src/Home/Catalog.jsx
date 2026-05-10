import React from "react";

const Catalog = () => {
  const features = [
    {
      title: "Curriculum Based on Industry Needs",
      desc: "Save time and money! The curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
      title: "Our Learning Methods",
      desc: "The learning process uses the namely online and offline.",
    },
    {
      title: "Certification",
      desc: "You will get a certificate that can be used as a certification during job hunting.",
    },
    {
      title: 'Rating "Auto-grading"',
      desc: "You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor.",
    },
    {
      title: "Ready to Work",
      desc: "Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#000814] text-white px-4 sm:px-8 lg:px-20 py-16">

      {/* Top Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

        {/* Left Content */}
        <div>
          {/* Badge */}
          <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-xl font-bold shadow-lg mb-6">
            Om
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            World-Class Learning for
            <span className="text-cyan-400"> Anyone, Anywhere</span>
          </h1>

          <p className="text-gray-400 mt-6 leading-8 text-sm sm:text-base max-w-lg">
            StudyNotion partners with more than 275+ leading universities and
            companies to bring flexible, affordable, job-relevant online
            learning to individuals and organizations worldwide.
          </p>

          <button className="mt-8 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105">
            Learn More
          </button>
        </div>

        {/* Right Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          {features.map((item, index) => (
            <div
              key={index}
              className="bg-[#161D29] border border-gray-800 rounded-xl p-6 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300"
            >
              <h2 className="text-lg font-semibold mb-4">
                {item.title}
              </h2>

              <p className="text-gray-400 text-sm leading-7">
                {item.desc}
              </p>
            </div>
          ))}

        </div>
      </div>

      {/* Contact Form Section */}
      <div className="max-w-3xl mx-auto mt-28">

        {/* Badge */}
        <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-xl font-bold shadow-lg mb-6">
          Om
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold">
          Get in Touch
        </h1>

        <p className="text-gray-400 mt-3">
          We’d love to hear from you. Please fill out this form.
        </p>

        {/* Form */}
        <form className="mt-10 space-y-6">

          {/* Name Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            <div>
              <label className="text-sm text-gray-300 block mb-2">
                First Name
              </label>

              <input
                type="text"
                placeholder="Enter first name"
                className="w-full bg-[#161D29] border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300 block mb-2">
                Last Name
              </label>

              <input
                type="text"
                placeholder="Enter last name"
                className="w-full bg-[#161D29] border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-cyan-400"
              />
            </div>

          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-300 block mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter email address"
              className="w-full bg-[#161D29] border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-cyan-400"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm text-gray-300 block mb-2">
              Phone Number
            </label>

            <div className="flex gap-4">

              <select className="bg-[#161D29] border border-gray-700 rounded-lg px-3 py-3 outline-none focus:border-cyan-400">
                <option>+91</option>
                <option>+1</option>
                <option>+44</option>
              </select>

              <input
                type="text"
                placeholder="12345 67890"
                className="w-full bg-[#161D29] border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="text-sm text-gray-300 block mb-2">
              Message
            </label>

            <textarea
              rows="5"
              placeholder="Enter your message"
              className="w-full bg-[#161D29] border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-cyan-400 resize-none"
            ></textarea>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-4 rounded-lg transition-all duration-300 hover:scale-[1.01]"
          >
            Send Message
          </button>

        </form>
      </div>

    </div>
  );
};

export default Catalog;