import React from "react";
// import {
//   FaCode,
//   FaGraduationCap,
// } from "react-icons/fa";
// import { GiDiamondHard } from "react-icons/gi";
// import { IoRibbon } from "react-icons/io5";
// import image from "../assets/image.png";

const Home3 = () => {
    const data = [
        {
            id: 1,
            //   icon: <IoRibbon />,
            title: "Leadership",
            desc: "Fully committed to the success company",
            color: "text-sky-500",
        },
        {
            id: 2,
            //   icon: <FaGraduationCap />,
            title: "Responsibility",
            desc: "Students will always be our top priority",
            color: "text-pink-500",
        },
        {
            id: 3,
            //   icon: <GiDiamondHard />,
            title: "Flexibility",
            desc: "The ability to switch is an important skills",
            color: "text-green-500",
        },
        {
            id: 4,
            //   icon: <FaCode />,
            title: "Solve the problem",
            desc: "Code your way to a solution",
            color: "text-yellow-500",
        },
    ];

    return (
        <div className="w-full  py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">

            {/* Top Section */}
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-10">

                {/* Left Content */}
                <div className="w-full lg:w-[50%]">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-snug text-black">
                        Get the skills you need for a{" "}
                        <span className="text-cyan-400 m-2">
                            job that is in demand
                        </span>
                    </h1>
                </div>

                {/* Right Content */}
                <div className="w-full lg:w-[40%]">
                    <p className="text-gray-600 text-base sm:text-lg leading-7">
                        The modern StudyNotion is the dictates its own terms.
                        Today, to be a competitive specialist requires more than
                        professional skills.
                    </p>

                    <button className=" mt-5 w-full sm:w-[300px] bg-yellow-400 text-black p-3 rounded-md font-semibold cursor-pointer hover:scale-105 transition">
                        Learn More →
                    </button>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="max-w-7xl mx-auto mt-16 grid grid-cols-1 lg:grid-cols-2 ">

                {/* Timeline Section */}
                <div className="bg-white p-6 sm:p-10 relative">

                    {/* Vertical Line */}
                    <div className="absolute left-[38px] sm:left-[68px] top-16 h-[72%] border-l-2 border-dotted border-gray-300"></div>

                    <div className="flex flex-col gap-10 sm:gap-12">

                        {data.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-start gap-4 sm:gap-6 relative"
                            >

                                {/* Circle */}
                                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white shadow-xl flex justify-center items-center z-10 shrink-0">
                                    <span className={`text-xl sm:text-2xl ${item.color}`}>
                                        {/* {item.icon} */}
                                    </span>
                                </div>

                                {/* Text */}
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                                        {item.title}
                                    </h2>

                                    <p className="text-gray-600 text-sm sm:text-base mt-1">
                                        {item.desc}
                                    </p>
                                </div>

                            </div>
                        ))}

                    </div>
                </div>

                {/* Image Section */}
                <div className="relative">

                    {/* <img
            // src={image}
            alt="student"
            className="w-full h-full object-cover"
          /> */}
                    <div className="mt-10 flex justify-center">
                        <video
                            width="1000"
                            height="660"
                            autoPlay
                            muted
                            loop
                            controls
                            playsInline
                        >
                            <source src="./production.mp4" type="video/mp4" />
                        </video>
                    </div>

                    {/* Bottom Stats Card */}
                    <div className="absolute left-1/2 -translate-x-1/2 lg:left-30 lg:translate-x-0 -bottom-8 bg-green-900 text-white flex items-center gap-6 sm:gap-10 px-6 sm:px-10 py-4 sm:py-6 shadow-2xl w-[90%] sm:w-auto">

                        {/* Experience */}
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold">
                                10
                            </h1>

                            <p className="text-xs sm:text-sm text-green-200 mt-1">
                                YEARS EXPERIENCE
                            </p>
                        </div>

                        {/* Divider */}
                        <div className="w-[1px] h-12 bg-green-700"></div>

                        {/* Courses */}
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold">
                                250
                            </h1>

                            <p className="text-xs sm:text-sm text-green-200 mt-1">
                                TYPES OF COURSES
                            </p>
                        </div>

                    </div>
                </div>

            </div>
            <div className="mt-20 flex justify-center items-center w-full px-4">

                <h1 className="font-inter font-semibold text-[30px] sm:text-[36px] leading-[38px] sm:leading-[44px] tracking-[-0.02em] text-center text-black max-w-4xl">

                    Your swiss knife for

                    <span className="text-cyan-400 ml-2">
                        learning any language
                    </span>

                </h1>

            </div>
            <div className="mt-2 flex justify-center items-center w-full px-4">

                <h1 className="font-inter font-semibold text-[20px]md:text-[24px] sm:text-[17px] leading-[30px] sm:leading-[44px] tracking-[-0.02em] text-center text-black max-w-4xl">

                    Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom .

                </h1>

            </div>
            <div className="mt-16 grid md:grid-cols-2 gap-10 items-center">
                <div className=" p-6  border-none rounded-xl">
                    <img
                        src="Home3.jpg"
                        alt="Home3"
                        className="w-full rounded-lg h-[600px] object-cover"
                    />
                </div>

                <div className="md:ml-12 sm:ml-10 px-4 text-center md:text-left">

                    <h2 className="font-inter font-semibold text-[28px] sm:text-[36px] md:text-[48px] leading-[38px] sm:leading-[44px] md:leading-[56px] tracking-[-0.02em] text-black">

                        Become an

                        {" "}



                        <br className="hidden sm:block" />

                        <span className="text-cyan-400 m-2">
                            instructor
                        </span>

                    </h2>

                    <p className="text-gray-400 mt-4 text-sm sm:text-base leading-relaxed max-w-xl mx-auto md:mx-0">
                        Instructors from around the world teach millions of students on <br /> StudyNotion. We provide the tools and skills to teach what you love.


                    </p>

                    <div className="flex flex-row gap-4 mt-6 justify-center md:justify-start w-full">

                        <button className="flex bg-yellow-400 text-black p-3  rounded-md font-semibold cursor-pointer hover:scale-105 transition">
                            Start Teaching Today →
                        </button>



                    </div>


                </div>


            </div>

            <div className="mt-20 flex justify-center items-center w-full px-4">

                <h1 className="font-inter font-semibold text-[30px] sm:text-[36px] leading-[38px] sm:leading-[44px] tracking-[-0.02em] text-center text-black max-w-4xl">

                    Reviews from other

                    <span className="text-cyan-400 ml-2">
                        learners
                    </span>

                </h1>

            </div>
        </div>
    );
};

export default Home3;