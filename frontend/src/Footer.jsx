import React from "react";
// import {
//   FaFacebook,
//   FaGoogle,
//   FaTwitter,
//   FaYoutube,
// } from "react-icons/fa";

const reviews = [
  {
    name: "Cody Fisher",
    role: "Software Engineer",
    review:
      "Coordination of activities improved tremendously with Learn codings.",
  },
  {
    name: "Esther Howard",
    role: "Frontend Developer",
    review:
      "Everyone on the same page. Many of our people are not very organized naturally.",
  },
  {
    name: "Eleanor Pena",
    role: "UI/UX Designer",
    review:
      "I would recommend Learn codings for anyone trying to get their workflow better.",
  },
  {
    name: "Kristin Watson",
    role: "Backend Developer",
    review:
      "With Learn codings, we have finally accomplished things that have been waiting forever.",
  },
];

const footerLinks = {
  Resources: [
    "Articles",
    "Blog",
    "Chart Sheet",
    "Code challenges",
    "Docs",
    "Projects",
    "Videos",
    "Workspaces",
  ],
  Plans: [
    "Paid memberships",
    "For students",
    "Business solutions",
  ],
  Community: ["Forums", "Chapters", "Events"],
  Subjects: [
    "AI",
    "Cloud Computing",
    "Code Foundations",
    "Computer Science",
    "Cybersecurity",
    "Data Analytics",
    "Web Development",
  ],
  Languages: [
    "HTML & CSS",
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "SQL",
  ],
  Career: [
    "Career paths",
    "Career services",
    "Interview prep",
    "Professional certification",
  ],
};

const Footer = () => {
  return (
    <div className=" text-white">
      {/* Reviews Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        {/* <h2 className="text-4xl font-bold text-center ">
          Reviews from other learners
        </h2> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((item, index) => (
            <div
              key={index}
              className="bg-[#161D29] border border-[#2C333F] rounded-xl p-6 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center text-black font-bold text-lg">
                  {item.name.charAt(0)}
                </div>

                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-400">{item.role}</p>
                </div>
              </div>

              <p className="text-gray-300 text-sm leading-6 mb-4">
                {item.review}
              </p>

              <div className="text-yellow-400">★★★★★</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold mb-5 text-yellow-400">
              StudyNotion
            </h2>

            <ul className="space-y-2 text-green-400">
              <li className="hover:text-red-500 cursor-pointer">About</li>
              <li className="hover:text-red-500 cursor-pointer">Careers</li>
              <li className="hover:text-red-500 cursor-pointer">Affiliates</li>
            </ul>

            <div className="flex gap-4 mt-6 text-xl text-gray-400">
              {/* <FaFacebook className="hover:text-white cursor-pointer" /> */}
              {/* <FaGoogle className="hover:text-white cursor-pointer" /> */}
              {/* <FaTwitter className="hover:text-white cursor-pointer" /> */}
              {/* <FaYoutube className="hover:text-white cursor-pointer" /> */}
            </div>
          </div>

          {/* Dynamic Links */}
          {Object.entries(footerLinks).map(([title, links], index) => (
            <div key={index}>
              <h3 className="text-lg font-bold mb-5">{title}</h3>

              <ul className="space-y-3 text-black text-sm">
                {links.map((link, i) => (
                  <li
                    key={i}
                    className="hover:text-black transition-all duration-200 cursor-pointer"
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-[#2C333F]">
          <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-red-400">
            <div className="flex gap-5">
              <p className="hover:text-black cursor-pointer">
                Privacy Policy
              </p>
              <p className="hover:text-black cursor-pointer">
                Cookie Policy
              </p>
              <p className="hover:text-black cursor-pointer">Terms</p>
            </div>

            <p>Made with ❤️ CodeHelp © 2026 StudyNotion</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;