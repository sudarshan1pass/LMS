import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import { apiConnector } from "../services/apiConnector";
import { endpoints } from "../services/apis";

import { setToken, setUser } from "../Slices/authSlice";

const FieldIcon = ({ children }) => (
  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
    {children}
  </span>
);

const IconMail = () => (
  <svg
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <path d="M4 6h16v12H4z" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

const IconLock = () => (
  <svg
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
);

const IconEye = () => (
  <svg
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconEyeOff = () => (
  <svg
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-6.5 0-10-7-10-7a20.82 20.82 0 0 1 5.17-5.94" />
    <path d="M9.9 4.24A10.91 10.91 0 0 1 12 4c6.5 0 10 7 10 7a20.61 20.61 0 0 1-2.94 4.47" />
    <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
    <path d="m1 1 22 22" />
  </svg>
);

const IconGoogle = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
    <path
      d="M21.99 12.23c0-.8-.07-1.36-.22-1.95H12v3.78h5.74c-.12.94-.75 2.35-2.16 3.3l-.02.13 3.14 2.38.22.02c2.02-1.82 3.07-4.5 3.07-7.66Z"
      fill="#4285F4"
    />
    <path
      d="M12 22c2.82 0 5.18-.9 6.91-2.45l-3.34-2.53c-.9.61-2.1 1.05-3.57 1.05-2.76 0-5.09-1.82-5.93-4.34l-.13.01-3.26 2.47-.04.12C4.37 19.75 7.94 22 12 22Z"
      fill="#34A853"
    />
    <path
      d="M6.07 13.73A6.11 6.11 0 0 1 5.72 12c0-.6.12-1.18.33-1.73l-.01-.12-3.3-2.51-.11.05A9.88 9.88 0 0 0 2 12c0 1.58.38 3.08 1.05 4.31l3.02-2.58Z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.93c1.86 0 3.11.79 3.82 1.44l2.78-2.64C17.17 3.44 14.82 2 12 2 7.94 2 4.37 4.25 2.63 7.69l3.42 2.58C6.91 7.75 9.24 5.93 12 5.93Z"
      fill="#EA4335"
    />
  </svg>
);

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { LOGIN_API } = endpoints;

  const [accountType, setAccountType] = useState("Student");
  const [showPassword, setShowPassword] = useState(false);

  const googleAuthUrl = import.meta.env.VITE_GOOGLE_AUTH_URL;

  const onSubmit = async (data) => {
    try {
      const payload = {
        email: data.email,
        password: data.password,
        accountType,
      };

      const response = await apiConnector("POST", LOGIN_API, payload);

      const resData =
        typeof response.data === "string"
          ? JSON.parse(response.data)
          : response.data;

      if (!resData.success) {
        throw new Error(resData.message);
      }

      // REDUX STORE
      dispatch(setToken(resData.token));
      dispatch(setUser(resData.user));

      // LOCAL STORAGE
      localStorage.setItem("token", JSON.stringify(resData.token));
      localStorage.setItem("user", JSON.stringify(resData.user));

      toast.success("Login successful");

      const userId =
        resData.user?._id || resData.user?.id || "me";

      navigate(`/dashboard/${userId}`);
    } catch (error) {
      console.log("LOGIN ERROR:", error);

      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-white/15 bg-white/5 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30";

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#155e75,#0f172a_45%,#020617)] px-4 py-8 md:px-8">
      <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-slate-950/75 shadow-2xl backdrop-blur-xl md:grid-cols-2">
        
        {/* LEFT SIDE */}
        <section className="hidden border-r border-white/10 p-10 text-slate-100 md:flex md:flex-col md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/90">
              Welcome Back
            </p>

            <h1 className="mt-6 text-4xl font-bold leading-tight">
              Learn faster,
              <br />
              teach smarter,
              <br />
              stay connected.
            </h1>

            <p className="mt-6 max-w-sm text-sm text-slate-300">
              Sign in to access your dashboard, assignments,
              and classroom tools in one secure place.
            </p>
          </div>

          <div className="space-y-3 text-sm text-slate-300">
            <p>Role-based dashboard access</p>
            <p>Course and progress tracking</p>
            <p>Secure Google quick login</p>
          </div>
        </section>

        {/* RIGHT SIDE */}
        <section className="p-6 text-white sm:p-8 md:p-10">
          <h2 className="text-2xl font-semibold">
            Login to your account
          </h2>

          <p className="mt-2 text-sm text-slate-300">
            Use your email and password to continue.
          </p>

          {/* ACCOUNT TYPE */}
          <div className="mt-6">
            <p className="mb-2 text-xs uppercase tracking-wider text-slate-300">
              Account Type
            </p>

            <div className="grid grid-cols-2 rounded-xl bg-white/10 p-1">
              {["Student", "Instructor"].map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => setAccountType(item)}
                  className={`rounded-lg px-2 py-2 text-xs font-semibold transition sm:text-sm ${
                    accountType === item
                      ? "bg-cyan-500 text-white"
                      : "text-slate-300 hover:bg-white/10"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 space-y-4"
          >
            {/* EMAIL */}
            <div>
              <label className="mb-1 block text-xs text-slate-300">
                Email Address
              </label>

              <div className="relative">
                <FieldIcon>
                  <IconMail />
                </FieldIcon>

                <input
                  type="email"
                  placeholder="name@example.com"
                  {...register("email", {
                    required: "Email is required",
                  })}
                  className={inputClass}
                />
              </div>

              {errors.email && (
                <p className="mt-1 text-xs text-red-300">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <div className="mb-1 flex items-center justify-between">
                <label className="block text-xs text-slate-300">
                  Password
                </label>

                <button
                  type="button"
                  onClick={() =>
                    navigate("/Forgotpassword/token")
                  }
                  className="cursor-pointer text-xs text-cyan-300 hover:text-cyan-200"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <FieldIcon>
                  <IconLock />
                </FieldIcon>

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className={`${inputClass} pr-11`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-white"
                >
                  {showPassword ? (
                    <IconEyeOff />
                  ) : (
                    <IconEye />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="mt-1 text-xs text-red-300">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* REMEMBER */}
            <label className="flex items-center gap-2 text-xs text-slate-300">
              <input
                type="checkbox"
                {...register("remember")}
                className="h-4 w-4"
              />

              Keep me logged in
            </label>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-cyan-500 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-70"
            >
              {isSubmitting
                ? "Signing in..."
                : "Sign In"}
            </button>
          </form>

          {/* GOOGLE */}
          <div className="my-5 flex items-center gap-3">
            <hr className="flex-1 border-white/15" />

            <p className="text-xs uppercase tracking-wide text-slate-400">
              or continue with
            </p>

            <hr className="flex-1 border-white/15" />
          </div>

          <a
            href={googleAuthUrl}
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 py-3 text-sm font-medium text-slate-100 transition hover:bg-white/10"
          >
            <IconGoogle />
            Sign in with Google
          </a>

          <p className="mt-6 text-center text-sm text-slate-300">
            Need an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-cyan-300 hover:text-cyan-200"
            >
              Create account
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
