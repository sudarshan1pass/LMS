import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import { logout } from "./slices/authSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [catalogOpen, setCatalogOpen] =
    useState(false);

  const { token, user } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Catalog", path: "/catalog" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  const catalogLinks = [
    {
      label: "All Courses",
      section: "featured-courses",
    },
    {
      label: "Learning Paths",
      section: "learning-paths",
    },
    {
      label: "Student Stories",
      section: "testimonials",
    },
    {
      label: "Join Next Batch",
      section: "home-cta",
    },
  ];

  const scrollToSection = (sectionId) => {
    const target = document.getElementById(sectionId);

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleSectionNavigation = (
    sectionId
  ) => {
    setIsOpen(false);

    setCatalogOpen(false);

    if (location.pathname === "/") {
      scrollToSection(sectionId);

      return;
    }

    navigate("/");

    setTimeout(() => {
      scrollToSection(sectionId);
    }, 150);
  };

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");

      setTimeout(() => {
        scrollToSection(id);
      }, 100);
    }
  }, [location.hash]);

  // LOGOUT FUNCTION
  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* LOGO */}
          <Link
            to="/"
            className="text-xl font-extrabold text-cyan-500"
          >
            StudyNotion
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden items-center gap-8 lg:flex">
            
            {navLinks.map((item) =>
              item.label === "Catalog" ? (
                <div
                  key={item.label}
                  className="relative py-3"
                  onMouseEnter={() =>
                    setCatalogOpen(true)
                  }
                  onMouseLeave={() =>
                    setCatalogOpen(false)
                  }
                >
                  {/* Catalog Button */}
                  <Link
                    to={item.path}
                    className="flex cursor-pointer items-center gap-2 font-semibold text-black transition-all duration-200 hover:text-cyan-500"
                  >
                    {item.label}

                    {catalogOpen ? (
                      <svg
                        className="h-4 w-4 transition-all duration-300"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 8"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-4 w-4 transition-all duration-300"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 8"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"
                        />
                      </svg>
                    )}
                  </Link>

                  {/* DROPDOWN */}
                  {catalogOpen && (
                    <div className="absolute left-0 top-full z-50 mt-3 w-60 rounded-2xl border border-gray-200 bg-white p-3 shadow-2xl">
                      
                      {catalogLinks.map(
                        (catalogItem) => (
                          <button
                            key={catalogItem.label}
                            onClick={() =>
                              handleSectionNavigation(
                                catalogItem.section
                              )
                            }
                            className="block w-full cursor-pointer rounded-xl px-4 py-3 text-left font-semibold text-black transition-all duration-200 hover:bg-cyan-50 hover:text-cyan-600"
                          >
                            {catalogItem.label}
                          </button>
                        )
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  to={item.path}
                  className="cursor-pointer font-semibold text-black transition-all duration-200 hover:text-cyan-500"
                >
                  {item.label}
                </Link>
              )
            )}

            {/* AUTH BUTTONS */}
            {token ? (
              <>
                <button
                  onClick={() =>
                    navigate(
                      `/dashboard/${
                        user?._id || user?.id
                      }`
                    )
                  }
                  className="cursor-pointer font-semibold text-black transition-all duration-200 hover:text-cyan-500"
                >
                  Dashboard
                </button>

                <button
                  onClick={handleLogout}
                  className="cursor-pointer rounded-full bg-red-500 px-6 py-2 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="font-semibold text-black transition-all duration-200 hover:text-cyan-500"
                >
                  Login
                </Link>

                <button
                  onClick={() =>
                    navigate("/signup")
                  }
                  className="cursor-pointer rounded-full bg-cyan-400 px-8 py-2.5 font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-cyan-300 hover:shadow-lg hover:shadow-cyan-400/40 active:scale-95"
                >
                  Enroll Now
                </button>
              </>
            )}
          </div>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() =>
              setIsOpen(!isOpen)
            }
            className="text-xl font-bold text-black lg:hidden"
          >
            ☰
          </button>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="border-t border-gray-200 bg-white p-5 shadow-xl lg:hidden">
            <div className="flex flex-col gap-4">
              
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() =>
                    setIsOpen(false)
                  }
                  className="w-full text-left font-semibold text-black transition-all duration-200 hover:text-cyan-500"
                >
                  {item.label}
                </Link>
              ))}

              {token ? (
                <>
                  <button
                    onClick={() =>
                      navigate(
                        `/dashboard/${
                          user?._id || user?.id
                        }`
                      )
                    }
                    className="w-full text-left font-semibold text-black hover:text-cyan-500"
                  >
                    Dashboard
                  </button>

                  <button
                    onClick={handleLogout}
                    className="rounded-full bg-red-500 px-6 py-2 font-semibold text-white transition-all duration-300 hover:bg-red-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="font-semibold text-black hover:text-cyan-500"
                  >
                    Login
                  </Link>

                  <button
                    onClick={() =>
                      navigate("/signup")
                    }
                    className="rounded-full bg-cyan-400 px-6 py-3 font-semibold text-black transition-all duration-300 hover:bg-cyan-300"
                  >
                    Enroll Now
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      <Outlet />
    </>
  );
};

export default Navbar;