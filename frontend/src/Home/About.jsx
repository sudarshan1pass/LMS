import React from 'react'

const About = () => {
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
    <div className="w-full px-4 sm:px-6 lg:px-12 py-10">

      {/* Heading */}
      <h1 className="font-inter font-semibold text-2xl sm:text-3xl md:text-5xl leading-[40px] md:leading-[65px] tracking-[-0.02em] text-center">
        Driving Innovation in Online Education for a <br />
        <span className="text-cyan-400">Brighter Future</span>
      </h1>

      {/* Paragraph */}
      <p className="text-gray-400 mt-5 max-w-4xl mx-auto text-center text-sm sm:text-base leading-7">
        Studynotion is at the forefront of driving innovation in online
        education. We're passionate about creating a brighter future by
        offering cutting-edge courses, leveraging emerging technologies,
        and nurturing a vibrant learning community.
      </p>

      {/* Images Section */}
      <div className="mt-10 flex flex-wrap justify-center gap-6">

        <div className="w-full sm:w-[300px] h-[250px] overflow-hidden rounded-2xl shadow-lg">
          <img
            src="About2.jpg"
            alt="Innovation in Online Education"
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>

        <div className="w-full sm:w-[300px] h-[250px] overflow-hidden rounded-2xl shadow-lg">
          <img
            src="About3.jpg"
            alt="Innovation in Online Education"
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>

        <div className="w-full sm:w-[300px] h-[250px] overflow-hidden rounded-2xl shadow-lg">
          <img
            src="About1.jpg"
            alt="Innovation in Online Education"
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>

      </div>

      {/* Second Heading */}
      <h1 className="font-inter font-semibold text-2xl sm:text-3xl md:text-4xl mt-14 leading-[42px] md:leading-[60px] tracking-[-0.02em] text-center max-w-6xl mx-auto">

        We are passionate about revolutionizing the way we learn.
        Our innovative platform combines technology,
        <span className="text-cyan-400"> innovation</span>,
        <span className="text-orange-500"> expertise</span>,
        and community to create an
        <span className="text-yellow-400">
          {" "}unparalleled educational experience.
        </span>

      </h1>
       <div className=" text-white py-16 px-4 sm:px-8 lg:px-20">
      {/* Top Quote */}
      

      {/* Story Section */}
      <div className="max-w-6xl mx-auto mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          {/* Icon */}
          <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-xl font-bold shadow-lg mb-6">
            Om
          </div>

          <h2 className="text-3xl font-bold text-pink-500 mb-6">
            Our Founding Story
          </h2>

          <p className="text-gray-700 leading-8 text-sm sm:text-base mb-5">
            Our e-learning platform was born out of a shared vision and passion
            for transforming education. It all began with a group of educators,
            technologists, and lifelong learners who recognized the need for
            accessible, flexible, and high-quality learning opportunities in a
            rapidly evolving digital world.
          </p>

          <p className="text-gray-700 leading-8 text-sm sm:text-base">
            As experienced educators ourselves, we witnessed firsthand the
            limitations and challenges of traditional education systems. We
            believed that education should not be confined to the walls of a
            classroom or restricted by geographical boundaries.
          </p>
        </div>

        {/* Right Image */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative overflow-hidden rounded-2xl  p-2  shadow-cyan-500/20 w-full max-w-[470px]">
            <img
              src="About4.jpg"
              alt="Founding Story"
              className="w-full h-[250px] sm:h-[300px] object-cover rounded-xl hover:scale-105 transition-all duration-500"
            />
          </div>
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="max-w-6xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Vision */}
        <div>
          <h2 className="text-3xl font-bold text-yellow-400 mb-5">
            Our Vision
          </h2>

          <p className="text-gray-700 leading-8 text-sm sm:text-base">
            With this vision in mind, we set out on a journey to create an
            e-learning platform that would revolutionize the way people learn.
            Our team of dedicated experts worked tirelessly to develop a robust
            and intuitive platform that combines cutting-edge technology with
            engaging content.
          </p>
        </div>

        {/* Mission */}
        <div>
          <h2 className="text-3xl font-bold text-cyan-400 mb-5">
            Our Mission
          </h2>

          <p className="text-gray-700 leading-8 text-sm sm:text-base">
            Our mission goes beyond just delivering courses online. We wanted
            to create a vibrant community of learners, where individuals can
            connect, collaborate, and learn from one another.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-6xl mx-auto mt-20 bg-white shadow-lg rounded-2xl py-10 px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center shadow-xl border ">
        <div>
          <h3 className="text-3xl font-bold text-red-500">5K</h3>
          <p className="text-gray-700 mt-2">Active Students</p>
        </div>

        <div>
          <h3 className="text-3xl font-bold text-cyan-400">10+</h3>
          <p className="text-gray-700 mt-2">Mentors</p>
        </div>

        <div>
          <h3 className="text-3xl font-bold text-cyan-400">200+</h3>
          <p className="text-gray-700 mt-2">Courses</p>
        </div>

        <div>
          <h3 className="text-3xl font-bold text-yellow-400">50+</h3>
          <p className="text-gray-700 mt-2">Awards</p>
        </div>
      </div>
    </div>
     <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

        {/* Left Content */}
        <div>
          {/* Badge */}
        

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
              className="bg-white border-none shadow  rounded-xl p-6 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300"
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
    </div>
  )
}

export default About