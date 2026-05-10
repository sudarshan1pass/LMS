import React from "react";

const Home1 = () => {
  const courses = [
    {
      title: "Learn HTML",
      description:
        "This course covers the basic concepts of HTML including creating and structuring web pages, adding text, links, images, and more.",
      level: "Beginner",
      lessons: "6 Lessons",
    },
    {
      title: "Learn CSS",
      description:
        "Learn how to style websites using CSS, including layouts, colors, fonts, and responsive design techniques.",
      level: "Beginner",
      lessons: "8 Lessons",
    },
    {
      title: "Learn JS",
      description:
        "Learn JavaScript for dynamic websites, DOM manipulation, events, and logic building.",
      level: "Intermediate",
      lessons: "10 Lessons",
    },
  ];

  return (
    <div
    // id="home" className="min-h-screen bg-gradient-to-br from-[#020617] via-[#020617] to-[#020617] text-white px-6 md:px-16 py-10"
    >
      <div className="flex justify-center mb-6">
        <button className="px-4 py-2 text-sm cursor-pointer rounded-full bg-white/10 border border-white/10 hover:bg-white/20 transition">
          Become an Instructor →
        </button>
      </div>

      <div className="text-center max-w-4xl mx-auto">
        <h1 className="font-inter font-semibold text-3xl md:text-5xl leading-[44px] md:leading-[60px] tracking-[-0.02em] text-center">
          Empower Your Future with{" "}
          <span className="text-cyan-400">Coding Skills</span>
        </h1>

        <p className="text-gray-400 mt-4 text-sm md:text-base">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <button className="bg-yellow-400 cursor-pointer  text-black px-6 py-2 rounded-md font-semibold hover:bg-yellow-300 transition">
            Learn More
          </button>
          <button className="bg-white/10 cursor-pointer px-6 py-2 rounded-md border border-white/10 hover:bg-white/20 transition">
            Book a Demo
          </button>
        </div>
      </div>

      <div className="mt-10 flex justify-center">
  <video
    width="700"
    height="360"
    autoPlay
    muted
    loop
    controls
    playsInline
  >
    <source src="video.mp4" type="video/mp4" />
  </video>
</div>

      <div className="mt-16 grid md:grid-cols-2 gap-10 items-center">
        <div className="md:ml-12 sm:ml-10 px-4 text-center md:text-left">

          <h2 className="font-inter font-semibold text-[28px] sm:text-[36px] md:text-[48px] leading-[38px] sm:leading-[44px] md:leading-[56px] tracking-[-0.02em] text-black">

            Unlock your{" "}

            <span className="text-cyan-400 m-2">
              coding potential
            </span>

            <br className="hidden sm:block" />

            <span className="text-black">
              with our online courses.
            </span>

          </h2>

          <p className="text-gray-400 mt-4 text-sm sm:text-base leading-relaxed max-w-xl mx-auto md:mx-0">
            Our courses are designed and taught by industry experts who
            <br className="hidden md:block" />
            are passionate about coding and sharing their knowledge with you.
          </p>

          <div className="flex flex-row gap-4 mt-6 justify-center md:justify-start w-full">

            <button className="flex-1 bg-yellow-400 text-black py-3 rounded-md font-semibold cursor-pointer hover:scale-105 transition">
              Try it Yourself →
            </button>

            <button className="flex-1 bg-white/10 border border-white/10 py-3 rounded-md cursor-pointer hover:bg-black/20 transition text-black">
              Learn More
            </button>

          </div>


        </div>
        <div className=" rounded-xl p-6  ">
          <img
            src="https://cdn.pixabay.com/photo/2024/06/14/12/15/developer-8829711_1280.jpg"
            alt="Developer working"
            className="w-full rounded-lg object-cover"
          />
        </div>
      </div>

      <div className="mt-16 grid md:grid-cols-2 gap-10 items-center">
        <div className=" p-6  border-none rounded-xl">
          <img
            src="https://wallpapercave.com/wp/wp7420888.jpg"
            alt="Coding setup"
            className="w-full rounded-lg object-cover"
          />
        </div>

        <div className="md:ml-12 sm:ml-10 px-4 text-center md:text-left">

          <h2 className="font-inter font-semibold text-[28px] sm:text-[36px] md:text-[48px] leading-[38px] sm:leading-[44px] md:leading-[56px] tracking-[-0.02em] text-black">

            Start coding
            {" "}

            <span className="text-cyan-400 m-2">
              coding
            </span>

            <br className="hidden sm:block" />

            <span className="text-black">
              in seconds
            </span>

          </h2>

          <p className="text-gray-400 mt-4 text-sm sm:text-base leading-relaxed max-w-xl mx-auto md:mx-0">
            Our courses are designed and taught by industry experts who
            <br className="hidden md:block" />
            are passionate about coding and sharing their knowledge with you.
          </p>

          <div className="flex flex-row gap-4 mt-6 justify-center md:justify-start w-full">

            <button className="flex-1 bg-yellow-400 text-black p-3  rounded-md font-semibold cursor-pointer hover:scale-105 transition">
              Continue Lesson →
            </button>

            <button className="flex-1 bg-white/10 border border-white/10 py-3 rounded-md cursor-pointer hover:bg-black/20 transition text-black">
              Learn More
            </button>

          </div>


        </div>
      </div>

      <div>
        <h1 className="text-center mt-44 text-4xl">
          Unlock the <span className="text-cyan-400">Power of code</span>
        </h1>
      </div>

      <div id="featured-courses" className="mt-10 rounded-3xl border-none p-6 sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-white text-black rounded-2xl shadow-md hover:shadow-2xl transition duration-300 p-6 min-h-[280px] flex flex-col justify-between"
            >
              <div>
                <h1 className="text-lg sm:text-xl font-semibold mb-3">
                  {course.title}
                </h1>

                <p className="text-gray-600 text-sm leading-7">
                  {course.description}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3 justify-between items-center">
                <span className="text-xs bg-gray-100 px-3 py-1 rounded-full font-medium">
                  {course.level}
                </span>

                <span className="text-xs bg-gray-100 px-3 py-1 rounded-full font-medium">
                  {course.lessons}
                </span>
              </div>
            </div>
          ))}
          <div className="col-span-full mt-6 flex justify-center">

            <div className="flex gap-4 mt-6 justify-center items-center w-full">

              <button className="bg-yellow-400 text-black py-3 px-6 rounded-md font-inter font-bold text-[16px] leading-[24px] tracking-[0em] text-center cursor-pointer hover:scale-105 transition">
                Explore Full Catalog →
              </button>

              <button className="bg-black border border-white/10 py-3 px-6 rounded-md font-inter font-bold text-[16px] leading-[24px] tracking-[0em] text-center text-white cursor-pointer hover:bg-black/20 transition">
                Learn More
              </button>

            </div>
          </div>
        </div>
        <div>


        </div>
      </div>
    </div>
  );
};

export default Home1;

