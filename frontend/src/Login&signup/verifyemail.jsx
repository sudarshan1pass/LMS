import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { apiConnector } from "../services/apiConnector";
import { endpoints } from "../services/apis";
import { setSignupData } from "../Slices/authSlice";

const { SIGNUP_API } = endpoints;



const Verifyemail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { signupData } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

 const onSubmit = async (data) => {
  try {
    if (!signupData) {
      toast.error("Signup data missing. Please signup again.");
      return navigate("/signup");
    }

    const payload = {
      ...signupData,
      otp: data.otp,
    };

    console.log("FINAL PAYLOAD:", payload);

    const response = await apiConnector("POST", SIGNUP_API, payload);

    console.log("SIGNUP RESPONSE:", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Account created successfully");
    dispatch(setSignupData(null));
    navigate("/Login");

  } catch (error) {
    console.log("BACKEND ERROR:", error.response?.data); // 🔥 MAIN LINE
    toast.error(error.response?.data?.message || "Signup failed");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0b132b] to-[#1c2541] p-4">
      <div className="w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-8 text-white">

        <h2 className="text-2xl font-bold mb-2 text-center">Verify OTP</h2>
        <p className="text-sm text-gray-300 text-center mb-6">
          Enter the OTP sent to your email
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <input
            type="text"
            placeholder="Enter 6-digit OTP"
            {...register("otp", {
              required: "OTP is required",
              pattern: {
                value: /^\d{6}$/,
                message: "OTP must be 6 digits",
              },
            })}
            className="w-full p-3 text-center tracking-widest text-lg rounded-lg bg-white/10 border border-white/10 outline-none focus:border-blue-500"
          />

          {errors.otp && (
            <p className="text-red-400 text-sm">{errors.otp.message}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 transition rounded-lg font-semibold"
          >
            Verify & Create Account
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-400">
          Didn’t receive OTP?{" "}
          <span className="text-blue-400 cursor-pointer hover:underline">
            Resend
          </span>
        </p>
      </div>
    </div>
  );
};

export default Verifyemail;



