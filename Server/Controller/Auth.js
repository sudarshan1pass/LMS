const User = require("../Models/User");
const OTP = require("../Models/OTP");
const Profile = require("../Models/Profile");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { mailSender } = require("../Utils/mailSender")
const emailTemplate = require("../mail/emailVerificationTemplate")

// signup

exports.SignUp = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      password,
      email,
      phone,
      accountType,
      confirmPassword,
      otp,
    } = req.body;

    console.log("SIGNUP REQUEST:", {
      firstName,
      lastName,
      email,
      phone,
      accountType,
      otpReceived: Boolean(otp),
    });

    // 1. Validation
    if (
      !firstName ||
      !lastName ||
      !password ||
      !email ||
      !phone ||
      !accountType ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // 2. Check existing user
    const userExist = await User.findOne({
      email: normalizedEmail,
    });

    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // 3. Password validation
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm password do not match",
      });
    }

    // 4. Find latest OTP
    const latestOTP = await OTP.findOne({
      email: normalizedEmail,
    }).sort({
      createdAt: -1,
    });

    console.log("OTP FOUND:", Boolean(latestOTP));

    if (!latestOTP) {
      return res.status(400).json({
        success: false,
        message: "OTP not found. Please request a new OTP.",
      });
    }

    // IMPORTANT: compare both as strings
    if (String(latestOTP.otp) !== String(otp)) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // 5. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 6. Create profile
    const additionalDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
    });

    // 7. Instructor approval
    const approved =
      accountType === "Instructor" ? false : true;

    // 8. Create user
    const user = await User.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      password: hashedPassword,
      email: normalizedEmail,
      phone,
      accountType,
      additionalDetails: additionalDetails._id,
      approved,
      image: `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
        `${firstName} ${lastName}`
      )}`,
    });

    // 9. Delete used OTP
    await OTP.deleteMany({
      email: normalizedEmail,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.error("SIGNUP ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


// otp controllers

exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const userExist = await User.findOne({
      email: normalizedEmail,
    });

    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });

    console.log("Creating OTP for:", normalizedEmail);

    const otpDocument = await OTP.create({
      email: normalizedEmail,
      otp,
    });

    console.log("OTP created, sending email...");

    try {
      await mailSender(
        normalizedEmail,
        "Verification Email",
        emailTemplate(otp)
      );
    } catch (mailError) {
      console.error("MAIL SENDER ERROR:", mailError);

      // Don't keep an OTP that was never delivered.
      await OTP.findByIdAndDelete(otpDocument._id).catch((deleteError) => {
        console.error("OTP cleanup error:", deleteError);
      });

      return res.status(500).json({
        success: false,
        message: "Unable to send OTP email",
      });
    }

    return res.status(201).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error("SEND OTP ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to process OTP request",
    });
  }
};
// login 

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        // validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            })
        }
        // user exist or not 
        const user = await User.findOne({ email }).populate("additionalDetails")
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        // password compare
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid password"
            })
        }
        else {

            // token generate 
            const token = jwt.sign({ email: user.email, id: user._id, accountType: user.accountType },
                process.env.JWT_SECRET,
                { expiresIn: "24h" }
            )

            // create cookies
            const options = {
                httpOnly: true,
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            }

            user.token = token
            user.password = undefined

            return res.cookie("token", token, options).status(200).json({
                success: true,
                message: "Login Successfull",
                token: token,
                user,

            })

        }

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message + "login failure please try again later "

        })

    }
}

// Controller for Changing Password
exports.changePassword = async (req, res) => {
    try {
        // Get user data from req.user
        const userDetails = await User.findById(req.user.id)

        // Get old password, new password, and confirm new password from req.body
        const { oldPassword, newPassword } = req.body

        // Validate old password
        const isPasswordMatch = await bcrypt.compare(
            oldPassword,
            userDetails.password
        )
        if (!isPasswordMatch) {
            // If old password does not match, return a 401 (Unauthorized) error
            return res
                .status(401)
                .json({ success: false, message: "The password is incorrect" })
        }

        // Update password
        const encryptedPassword = await bcrypt.hash(newPassword, 10)
        const updatedUserDetails = await User.findByIdAndUpdate(
            req.user.id,
            { password: encryptedPassword },
            { new: true }
        )

        // Send notification email
        try {
            const emailResponse = await mailSender(
                updatedUserDetails.email,
                "Password for your account has been updated",
                passwordUpdated(
                    updatedUserDetails.email,
                    `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
                )
            )
            console.log("Email sent successfully:", emailResponse.response)
        } catch (error) {
            // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
            console.error("Error occurred while sending email:", error)
            return res.status(500).json({
                success: false,
                message: "Error occurred while sending email",
                error: error.message,
            })
        }

        // Return success response
        return res
            .status(200)
            .json({ success: true, message: "Password updated successfully" })
    } catch (error) {
        // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
        console.error("Error occurred while updating password:", error)
        return res.status(500).json({
            success: false,
            message: "Error occurred while updating password",
            error: error.message,
        })
    }
}
