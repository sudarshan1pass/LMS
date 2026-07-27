import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
// import { setSignupData } from "../Slices/authSlice";
import { setSignupData, setemail } from "../Slices/authSlice";
import { useNavigate } from "react-router-dom";
import { apiConnector } from "../services/apiConnector";
import { endpoints } from "../services/apis";

const FieldIcon = ({ children }) => (
  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
    {children}
  </span>
);

const IconUser = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M20 21a8 8 0 0 0-16 0" />
    <circle cx="12" cy="8" r="4" />
  </svg>
);

const IconMail = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M4 6h16v12H4z" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

const IconPhone = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M22 16.92v2a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.3 19.3 0 0 1-6-6A19.8 19.8 0 0 1 2.12 3.2 2 2 0 0 1 4.11 1h2a2 2 0 0 1 2 1.72c.12.9.34 1.78.65 2.62a2 2 0 0 1-.45 2.11L7.4 8.4a16 16 0 0 0 6.2 6.2l.95-.91a2 2 0 0 1 2.11-.45c.84.31 1.72.53 2.62.65A2 2 0 0 1 22 16.92z" />
  </svg>
);

const IconLock = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
);

const IconEye = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconEyeOff = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-6.5 0-10-7-10-7a20.82 20.82 0 0 1 5.17-5.94" />
    <path d="M9.9 4.24A10.91 10.91 0 0 1 12 4c6.5 0 10 7 10 7a20.61 20.61 0 0 1-2.94 4.47" />
    <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
    <path d="m1 1 22 22" />
  </svg>
);

const IconGoogle = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
    <path d="M21.99 12.23c0-.8-.07-1.36-.22-1.95H12v3.78h5.74c-.12.94-.75 2.35-2.16 3.3l-.02.13 3.14 2.38.22.02c2.02-1.82 3.07-4.5 3.07-7.66Z" fill="#4285F4" />
    <path d="M12 22c2.82 0 5.18-.9 6.91-2.45l-3.34-2.53c-.9.61-2.1 1.05-3.57 1.05-2.76 0-5.09-1.82-5.93-4.34l-.13.01-3.26 2.47-.04.12C4.37 19.75 7.94 22 12 22Z" fill="#34A853" />
    <path d="M6.07 13.73A6.11 6.11 0 0 1 5.72 12c0-.6.12-1.18.33-1.73l-.01-.12-3.3-2.51-.11.05A9.88 9.88 0 0 0 2 12c0 1.58.38 3.08 1.05 4.31l3.02-2.58Z" fill="#FBBC05" />
    <path d="M12 5.93c1.86 0 3.11.79 3.82 1.44l2.78-2.64C17.17 3.44 14.82 2 12 2 7.94 2 4.37 4.25 2.63 7.69l3.42 2.58C6.91 7.75 9.24 5.93 12 5.93Z" fill="#EA4335" />
  </svg>
);

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      otp: "",
      terms: false,
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { SENDOTP_API } = endpoints;

  const [accountType, setAccountType] = useState("Student");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordValue = watch("password");
  const googleAuthUrl = import.meta.env.VITE_GOOGLE_AUTH_URL || "https://accounts.google.com/";

  const onSubmit = async (data) => {
  try {
    const payload = {
      ...data,
      accountType,
    };

    const response = await apiConnector(
      "POST",
      SENDOTP_API,
      {
        email: data.email,
      }
    );

    console.log("OTP RESPONSE:", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    dispatch(setSignupData(payload));
    dispatch(setemail(data.email));

    toast.success("OTP sent successfully");

    navigate("/verify-email");
  } catch (error) {
    console.error(error);

    if (error.code === "ECONNABORTED") {
      toast.error("OTP request timed out. Please try again.");
      return;
    }

    toast.error(
      error?.response?.data?.error ||
        error?.response?.data?.message ||
        "Failed to send OTP"
    );
  }
};

  const inputClass =
    "w-full rounded-xl border border-white/15 bg-white/5 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30";

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,#164e63,#0b1120_45%,#020617)] px-4 py-8 md:px-8">
      <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-slate-950/75 shadow-2xl backdrop-blur-xl md:grid-cols-2">
        <section className="hidden border-r border-white/10 p-10 text-slate-100 md:flex md:flex-col md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/90">Learning Hub</p>
            <h1 className="mt-6 text-4xl font-bold leading-tight">
              Build your
              <br />
              future in one
              <br />
              place.
            </h1>
            <p className="mt-6 max-w-sm text-sm text-slate-300">
              Create a secure account to manage courses, connect with instructors, and track progress in real-time.
            </p>
          </div>

          <div className="space-y-3 text-sm text-slate-300">
            <p>Complete profile onboarding</p>
            <p>Email verification via OTP</p>
            <p>Google quick signup option</p>
          </div>
        </section>

        <section className="p-6 text-white sm:p-8 md:p-10">
          <h2 className="text-2xl font-semibold">Create your account</h2>
          <p className="mt-2 text-sm text-slate-300">Use your email details or continue with Google.</p>

          <div className="mt-6">
            <p className="mb-2 text-xs uppercase tracking-wider text-slate-300">Account Type</p>
            <div className="grid grid-cols-2 rounded-xl bg-white/10 p-1">
              {["Student", "Instructor",].map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => setAccountType(item)}
                  className={`rounded-lg px-2 py-2 text-xs font-semibold transition sm:text-sm ${accountType === item ? "bg-cyan-500 text-white" : "text-slate-300 hover:bg-white/10"
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs text-slate-300">First Name</label>
                <div className="relative">
                  <FieldIcon>
                    <IconUser />
                  </FieldIcon>
                  <input
                    type="text"
                    placeholder="John"
                    {...register("firstName", { required: "First name is required" })}
                    className={inputClass}
                  />
                </div>
                {errors.firstName && <p className="mt-1 text-xs text-red-300">{errors.firstName.message}</p>}
              </div>

              <div>
                <label className="mb-1 block text-xs text-slate-300">Last Name</label>
                <div className="relative">
                  <FieldIcon>
                    <IconUser />
                  </FieldIcon>
                  <input
                    type="text"
                    placeholder="Doe"
                    {...register("lastName", { required: "Last name is required" })}
                    className={inputClass}
                  />
                </div>
                {errors.lastName && <p className="mt-1 text-xs text-red-300">{errors.lastName.message}</p>}
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs text-slate-300">Email Address</label>
              <div className="relative">
                <FieldIcon>
                  <IconMail />
                </FieldIcon>
                <input
                  type="email"
                  placeholder="name@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                      message: "Enter a valid email address",
                    },
                  })}
                  className={inputClass}
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-300">{errors.email.message}</p>}
            </div>

            <div>
              <label className="mb-1 block text-xs text-slate-300">Phone Number</label>
              <div className="relative">
                <FieldIcon>
                  <IconPhone />
                </FieldIcon>
                <input
                  type="tel"
                  placeholder="9876543210"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^\d{10,14}$/,
                      message: "Use 10 to 14 digits",
                    },
                  })}
                  className={inputClass}
                />
              </div>
              {errors.phone && <p className="mt-1 text-xs text-red-300">{errors.phone.message}</p>}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs text-slate-300">Password</label>
                <div className="relative">
                  <FieldIcon>
                    <IconLock />
                  </FieldIcon>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Use at least 8 characters",
                      },
                    })}
                    className={`${inputClass} pr-11`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-white"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <IconEyeOff /> : <IconEye />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-xs text-red-300">{errors.password.message}</p>}
              </div>

              <div>
                <label className="mb-1 block text-xs text-slate-300">Confirm Password</label>
                <div className="relative">
                  <FieldIcon>
                    <IconLock />
                  </FieldIcon>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    {...register("confirmPassword", {
                      required: "Please confirm password",
                      validate: (value) => value === passwordValue || "Passwords do not match",
                    })}
                    className={`${inputClass} pr-11`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-white"
                    aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                  >
                    {showConfirmPassword ? <IconEyeOff /> : <IconEye />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="mt-1 text-xs text-red-300">{errors.confirmPassword.message}</p>}
              </div>
            </div>

            {/* <div>
              <label className="mb-1 block text-xs text-slate-300">Email OTP</label>
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                {...register("otp", {
                  required: "OTP is required",
                  pattern: {
                    value: /^\d{6}$/,
                    message: "OTP must be exactly 6 digits",
                  },
                })}
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
              />
              {errors.otp && <p className="mt-1 text-xs text-red-300">{errors.otp.message}</p>}
            </div> */}

            <label className="flex items-start gap-2 text-xs text-slate-300">
              <input
                type="checkbox"
                {...register("terms", { required: "Please accept terms and privacy policy" })}
                className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/10"
              />
              <span>I agree to the Terms of Service and Privacy Policy.</span>
            </label>
            {errors.terms && <p className="text-xs text-red-300">{errors.terms.message}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-cyan-500 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Sending OTP..." : "Create Account"}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <hr className="flex-1 border-white/15" />
            <p className="text-xs uppercase tracking-wide text-slate-400">or continue with</p>
            <hr className="flex-1 border-white/15" />
          </div>

          <a
            href={googleAuthUrl}
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 py-3 text-sm font-medium text-slate-100 transition hover:bg-white/10"
          >
            <IconGoogle />
            Sign up with Google
          </a>

          <p className="mt-6 text-center text-sm text-slate-300">
            Already have an account?{" "}
            <Link to="/Login" className="font-semibold text-cyan-300 hover:text-cyan-200">
              Sign in
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
};

export default Signup;
