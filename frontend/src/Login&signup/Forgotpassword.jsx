import { useState } from "react"
import { useForm } from "react-hook-form"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import { setemail } from "../Slices/authSlice";

const BASE_URL = import.meta.env.VITE_BASE_URL;



const Forgotpassword = () => {
    const [step, setStep] = useState(1)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [loading, setLoading] = useState(false);
    // const [userEmail, setUserEmail] = useState("")

    const userEmail = useSelector((state) => state.auth.email);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm()

    const password = watch("password")

    // STEP 1 → send OTP
    const onSendOtp = async (data) => {
        setLoading(true);
        try {
            // Redux me email store karna
            dispatch(setemail(data.email));

            const response = await axios.post(
                `${BASE_URL}/auth/send-reset-otp`,
                {
                    email: data.email
                }
            );

            setStep(2);
        } catch (error) {
            console.log(error);
            alert(error?.response?.data?.message || "Unable to send OTP");
        } finally {
            setLoading(false);
        }
    };

    // STEP 2 → reset password
    const onResetPassword = async (data) => {

        setLoading(true);
        try {

            console.log(userEmail);

            const response = await axios.post(
                `${BASE_URL}/auth/forget-password`,
                {
                    email: userEmail,
                    otp: data.otp,
                    password: data.password,
                    confirmPassword: data.confirmPassword
                }
            );

            alert(response.data.message);

        }
        catch (error) {

            console.log(error);

            alert(
                error?.response?.data?.message || "Unable to reset password"
            );
        } finally {
            setLoading(false);
        }
    }
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

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 p-4">

            <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-lg shadow-2xl">

                <h1 className="mb-6 text-center text-3xl font-bold text-white">
                    Forgot Password
                </h1>

                {/* STEP 1 */}
                {step === 1 && (
                    <form onSubmit={handleSubmit(onSendOtp)}>

                        <label className="mb-2 block text-white">Email</label>

                        <input
                            type="email"
                            placeholder="Enter email"
                            className="w-full rounded-xl bg-white/10 p-3 text-white outline-none"
                            {...register("email", {
                                required: "Email is required"
                            })}
                        />

                        {errors.email && (
                            <p className="text-sm text-red-400">
                                {errors.email.message}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-6 w-full rounded-xl bg-cyan-500 py-3 font-bold text-white hover:bg-cyan-600 disabled:opacity-50"
                        >
                            {loading ? "Sending ..." : "Send OTP"}
                        </button>
                    </form>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                    <form onSubmit={handleSubmit(onResetPassword)}>

                        {/* OTP */}
                        <div className="mb-4">
                            <label className="mb-2 block text-white">OTP</label>
                            <input
                                type="text"
                                placeholder="Enter OTP"
                                className="w-full rounded-xl bg-white/10 p-3 text-white outline-none"
                                {...register("otp", {
                                    required: "OTP is required"
                                })}
                            />
                            {errors.otp && (
                                <p className="text-sm text-red-400">
                                    {errors.otp.message}
                                </p>
                            )}
                        </div>

                        {/* NEW PASSWORD */}
                        <div className="mb-4 relative">
                            <label className="mb-2 block text-white">
                                New Password
                            </label>

                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="New password"
                                className="w-full rounded-xl bg-white/10 p-3 pr-10 text-white outline-none"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Minimum 6 characters"
                                    }
                                })}
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-12 text-slate-300 hover:text-white"
                            >
                                {showPassword ? <IconEyeOff /> : <IconEye />}
                            </button>

                            {errors.password && (
                                <p className="text-sm text-red-400">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* CONFIRM PASSWORD */}
                        <div className="mb-4 relative">
                            <label className="mb-2 block text-white">
                                Confirm Password
                            </label>

                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm password"
                                className="w-full rounded-xl bg-white/10 p-3 pr-10 text-white outline-none"
                                {...register("confirmPassword", {
                                    required: "Confirm password is required",
                                    validate: (value) =>
                                        value === password || "Passwords do not match"
                                })}
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword((prev) => !prev)
                                }
                                className="absolute right-3 top-12 text-slate-300 hover:text-white"
                            >
                                {showConfirmPassword ? <IconEyeOff /> : <IconEye />}
                            </button>

                            {errors.confirmPassword && (
                                <p className="text-sm text-red-400">
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-4 w-full cursor-pointer rounded-xl bg-green-500 py-3 font-bold text-white hover:bg-green-600 disabled:opacity-50"
                        >
                            {loading ? "Saving..." : "Save Password"}
                        </button>
                    </form>
                )}

            </div>
        </div>
    )
}

export default Forgotpassword
