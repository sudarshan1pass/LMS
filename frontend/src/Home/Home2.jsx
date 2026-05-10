import React from "react";

const Home2 = () => {
  const stats = [
    { value: "25K+", label: "Active learners" },
    { value: "180+", label: "Expert mentors" },
    { value: "92%", label: "Completion rate" },
    { value: "320+", label: "Hands-on projects" },
  ];

  const tracks = [
    {
      title: "Frontend Engineer",
      duration: "12 Weeks",
      level: "Beginner to Intermediate",
      topics: ["HTML", "CSS", "JavaScript", "React"],
      color: "from-cyan-400/20 to-sky-400/5",
    },
    {
      title: "Backend Developer",
      duration: "14 Weeks",
      level: "Intermediate",
      topics: ["Node.js", "Express", "MongoDB", "API Design"],
      color: "from-emerald-400/20 to-teal-400/5",
    },
    {
      title: "MERN Full Stack",
      duration: "20 Weeks",
      level: "Intermediate to Advanced",
      topics: ["React", "Node", "MongoDB", "Deployment"],
      color: "from-fuchsia-400/20 to-violet-400/5",
    },
    {
      title: "Data & AI Basics",
      duration: "10 Weeks",
      level: "Beginner",
      topics: ["Python", "Pandas", "Visualization", "ML Intro"],
      color: "from-amber-300/20 to-orange-300/5",
    },
  ];

  const testimonials = [
    {
      name: "Priya S.",
      role: "Frontend Intern",
      quote:
        "The project-based flow helped me build a portfolio and get my first internship in just 4 months.",
    },
    {
      name: "Rohit K.",
      role: "MERN Developer",
      quote:
        "Clear roadmap, strong mentor support, and weekly code reviews made all the difference.",
    },
    {
      name: "Ananya M.",
      role: "Computer Science Student",
      quote:
        "I finally understood backend architecture after the guided labs and live debugging sessions.",
    },
  ];

  return (
    <section id="about" className="bg-[#040b1a] px-6 py-20 text-white md:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.26em] text-cyan-300">Built For Progress</p>
          <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
            Learn with structure.
            <span className="text-cyan-400"> Grow with confidence.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm text-slate-300 md:text-base">
            From beginner-friendly tracks to real-world project workflows, everything is designed to help you
            become job-ready without confusion.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-5 text-center shadow-lg"
            >
              <h3 className="text-2xl font-bold text-yellow-300 md:text-3xl">{item.value}</h3>
              <p className="mt-1 text-xs text-slate-300 md:text-sm">{item.label}</p>
            </div>
          ))}
        </div>

        <div id="learning-paths" className="mt-16">
          <div className="mb-6 flex items-end justify-between gap-3">
            <h3 className="text-2xl font-semibold md:text-3xl">Choose Your Learning Path</h3>
            <button className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-2 text-xs font-semibold text-cyan-200 transition hover:bg-cyan-300/20">
              View all tracks
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {tracks.map((track) => (
              <article
                key={track.title}
                className={`rounded-2xl border border-white/10 bg-gradient-to-br ${track.color} p-6 shadow-xl`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h4 className="text-xl font-semibold">{track.title}</h4>
                  <span className="rounded-full bg-white/15 px-3 py-1 text-xs text-slate-200">{track.duration}</span>
                </div>

                <p className="mt-2 text-sm text-slate-200">{track.level}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {track.topics.map((topic) => (
                    <span
                      key={topic}
                      className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-slate-100"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                <button className="mt-6 rounded-lg bg-yellow-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-yellow-200">
                  Start this path
                </button>
              </article>
            ))}
          </div>
        </div>

        <div id="testimonials" className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <div key={item.name} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <p className="text-sm leading-7 text-slate-200">"{item.quote}"</p>
              <div className="mt-5 border-t border-white/10 pt-4">
                <p className="font-semibold text-cyan-300">{item.name}</p>
                <p className="text-xs text-slate-400">{item.role}</p>
              </div>
            </div>
          ))}
        </div>

        <div id="home-cta" className="mt-16 overflow-hidden rounded-3xl border border-cyan-200/20 bg-gradient-to-r from-cyan-600/30 via-sky-600/20 to-indigo-700/30 p-8 md:p-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-100">Start Today</p>
              <h3 className="mt-2 text-2xl font-bold md:text-4xl">Ready to build your tech career?</h3>
              <p className="mt-2 max-w-2xl text-sm text-slate-200 md:text-base">
                Join live cohorts, practice with guided projects, and get mentor feedback every week.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="rounded-lg bg-yellow-300 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-yellow-200">
                Join Next Batch
              </button>
              <button className="rounded-lg border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20">
                Book Free Counseling
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home2;

