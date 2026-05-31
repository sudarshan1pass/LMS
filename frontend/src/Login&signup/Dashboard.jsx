import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const dashboardContent = {
  Student: {
    stats: [
      { title: "Courses", value: "12", icon: "CO", bg: "bg-cyan-100" },
      { title: "Completed", value: "8", icon: "OK", bg: "bg-green-100" },
      { title: "Certificates", value: "5", icon: "CP", bg: "bg-yellow-100" },
      { title: "Hours", value: "128h", icon: "HR", bg: "bg-pink-100" },
    ],
    coursesTitle: "My Courses",
    coursesAction: "View All",
    courses: [
      { title: "React Masterclass", progress: 80 },
      { title: "Next.js Complete Guide", progress: 55 },
      { title: "Redux Toolkit", progress: 92 },
    ],
    activity: [
      "Completed React Hooks Quiz",
      "Started Next.js Course",
      "Earned JavaScript Certificate",
      "Updated Profile Information",
    ],
    quickActions: [
      "Browse Courses",
      "Assignments",
      "Certificates",
      "Settings",
    ],
    ctaTitle: "Keep Learning",
    ctaText:
      "You are doing amazing. Complete your daily learning streak and unlock new achievements.",
    ctaButton: "Continue Learning",
    ctaPath: "/catalog",
  },
  Instructor: {
    stats: [
      { title: "Created Courses", value: "6", icon: "CR", bg: "bg-cyan-100" },
      { title: "Students", value: "248", icon: "ST", bg: "bg-green-100" },
      { title: "Completed", value: "143", icon: "OK", bg: "bg-yellow-100" },
      { title: "Revenue", value: "$4.8k", icon: "RV", bg: "bg-pink-100" },
    ],
    coursesTitle: "Teaching Courses",
    coursesAction: "Manage",
    courses: [
      { title: "React Masterclass", progress: 86 },
      { title: "Advanced JavaScript", progress: 72 },
      { title: "Redux Toolkit", progress: 94 },
    ],
    activity: [
      "Reviewed 12 assignments",
      "Published a new lecture",
      "Updated course resources",
      "Answered student questions",
    ],
    quickActions: [
      "Create Course",
      "Manage Courses",
      "Student Progress",
      "Settings",
    ],
    ctaTitle: "Keep Teaching",
    ctaText:
      "Your learners are making progress. Add a new lesson or review pending submissions today.",
    ctaButton: "Create Course",
    ctaPath: null,
  },
};

const Dashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const accountType = user?.accountType === "Instructor" ? "Instructor" : "Student";
  const content = dashboardContent[accountType];
  const initials =
    `${user?.firstName?.charAt(0) || ""}${user?.lastName?.charAt(0) || ""}` ||
    "U";

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="border-b bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 px-6 py-8 md:flex-row md:items-center">
          <div>
            <h1 className="text-4xl font-black text-slate-800">
              {accountType} Dashboard
            </h1>

            <p className="mt-2 text-slate-600">
              Welcome back,
              <span className="ml-2 font-semibold text-cyan-600">
                {user?.firstName} {user?.lastName}
              </span>
            </p>

            <p className="mt-1 text-sm text-slate-500">User ID: {id}</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-white px-5 py-3 shadow-sm">
              <p className="text-sm text-slate-500">Current Role</p>

              <h3 className="text-lg font-bold text-cyan-600">
                {accountType}
              </h3>
            </div>

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500 text-2xl font-bold text-white shadow-lg">
              {initials}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {content.stats.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <p className="font-medium text-slate-600">{item.title}</p>

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.bg}`}
                >
                  <span className="text-sm font-black text-slate-700">
                    {item.icon}
                  </span>
                </div>
              </div>

              <h2 className="mt-6 text-4xl font-black text-slate-800">
                {item.value}
              </h2>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <div className="rounded-3xl bg-white p-7 shadow-sm">
              <div className="mb-8 flex items-center justify-between gap-4">
                <h2 className="text-2xl font-bold text-slate-800">
                  {content.coursesTitle}
                </h2>

                <button
                  onClick={() =>
                    accountType === "Instructor"
                      ? undefined
                      : navigate("/catalog")
                  }
                  className="rounded-xl bg-cyan-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-cyan-600"
                >
                  {content.coursesAction}
                </button>
              </div>

              <div className="space-y-6">
                {content.courses.map((course) => (
                  <div
                    key={course.title}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <div className="mb-3 flex items-center justify-between gap-4">
                      <h3 className="text-lg font-semibold text-slate-800">
                        {course.title}
                      </h3>

                      <span className="font-bold text-cyan-600">
                        {course.progress}%
                      </span>
                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full bg-cyan-500"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-white p-7 shadow-sm">
              <h2 className="mb-6 text-2xl font-bold text-slate-800">
                Recent Activity
              </h2>

              <div className="custom-scrollbar max-h-80 space-y-5 overflow-y-auto pr-2">
                {content.activity.map((activity) => (
                  <div
                    key={activity}
                    className="flex cursor-pointer items-center gap-4 rounded-2xl p-4 hover:border-cyan-300 hover:bg-cyan-50"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-100 text-sm font-black text-cyan-700">
                      AC
                    </div>

                    <div>
                      <p className="font-medium text-slate-800">{activity}</p>

                      <p className="text-sm text-slate-500">2 hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-3xl bg-white p-7 text-center shadow-sm">
              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-cyan-500 text-5xl font-black text-white shadow-lg">
                {initials}
              </div>

              <h2 className="mt-5 text-2xl font-bold text-slate-800">
                {user?.firstName} {user?.lastName}
              </h2>

              <p className="mt-2 text-slate-500">{user?.email}</p>

              <button
                onClick={() => navigate(`/edit-profile/${user?._id || id}`)}
                className="mt-6 w-full rounded-2xl bg-cyan-500 py-3 font-bold text-white transition hover:bg-cyan-600"
              >
                Edit Profile
              </button>
            </div>

            <div className="rounded-3xl bg-white p-7 shadow-sm">
              <h2 className="mb-5 text-2xl font-bold text-slate-800">
                Quick Actions
              </h2>

              <div className="space-y-4">
                {content.quickActions.map((item) => (
                  <button
                    key={item}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-left font-medium text-slate-700 transition-all duration-300 hover:border-cyan-300 hover:bg-cyan-50"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-cyan-500 p-7 text-white shadow-lg">
              <h2 className="text-2xl font-black">{content.ctaTitle}</h2>

              <p className="mt-3 text-sm text-cyan-100">{content.ctaText}</p>

              <button
                onClick={() => content.ctaPath && navigate(content.ctaPath)}
                className="mt-6 rounded-2xl bg-white px-5 py-3 font-bold text-cyan-600 transition hover:scale-105"
              >
                {content.ctaButton}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
