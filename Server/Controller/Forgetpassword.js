const User = require("../Models/User");
// const cryptoRandomString=require("crypto-random-string")
const crypto = require("crypto")
const bcrypt = require("bcrypt")
const { mailSender } = require("../Utils/mailSender")

exports.forgetPasswordToken = async (req, res) => {
    try {
        const { email } = req.body;

        // validation
        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }

        // user exists
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // generate random string 
        const token = crypto.randomUUID();

        // add token in user data
        const updatedData = await User.findOneAndUpdate({ email }, {
            token: token,
            tokenExpriresIn: Date.now() + 5 * 60 * 1000
        }, { new: true })

        const url = `http://localhost:5173/update-password/${token}`

        //  send mail

        await mailSender(
            email,
            "Reset Password Link",
            `Click here to reset password: ${url}`
        )

        // send response
        return res.status(200).json({
            success: true,
            message: "Reset password link sent successfully"

        })

    }
    catch (error) {

        return res.status(500).json({
            success: false,
            message: "Internal server error error occured while sending mail for forgot password"
        })

    }
}

// create new password

exports.forgetPassword = async (req, res) => {
  try {

    const {
      email,
      otp,
      password,
      confirmPassword,
    } = req.body;

    // validation
    if (
      !email ||
      !otp ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // password match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Password and confirm password do not match",
      });
    }

    // find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (
      user.resetOtp !== otp.toString() ||
      !user.resetOtpExpire ||
      user.resetOtpExpire < Date.now()
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // update password
    user.password = hashedPassword;
    user.resetOtp = undefined;
    user.resetOtpExpire = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.sendResetOtp = async (req, res) => {

    try {

        const { email } = req.body;

        // validation
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            })
        }

        // check user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        // generate otp
        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        // save otp
        user.resetOtp = otp;

        user.resetOtpExpire = Date.now() + 5 * 60 * 1000;

        await user.save();
        console.log(`Password reset OTP created for ${email}`);

        // send mail
        await mailSender(
            email,
            "Password Reset OTP",
            `Your OTP is ${otp}`
        )

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully"
        })

    }
    catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Unable to send OTP email"
        })
    }
}
