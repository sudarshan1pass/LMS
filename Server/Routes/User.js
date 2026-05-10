// Import the required modules
const express = require("express")
const router = express.Router()

// Import the required Controllers and middleware functions
const {
  login,
  SignUp,
  sendOTP,
  changePassword,
} = require("../Controller/Auth") 


const { isInstructor, isAdmin, isStudent, auth } = require("../Middleware/auth.js") 

// const {
//   Subsection
// } = require("../Controller/Subsection")

// Routes for Login, Signup, and Authentication



// Route for user login

router.post("/login", login)

// Route for user signup
router.post("/signup", SignUp)

// Route for sending OTP to the user's email
router.post("/sendOTP",sendOTP)
// Route for Changing the password

router.post("/changePassword",auth,changePassword)


// router.post("/forget-password-token", forgetPasswordToken)

// router.post("/forget-password", forgetPassword)

 router.get("/Student",auth,isStudent,(req,res)=>{
     return res. status(200).json({
       success:true,
       message:"Welcome to the Student Account",
       user: req.user
     })
   })


    router.get("/Instructor",auth,isInstructor,(req,res)=>{
     return res. status(200).json({
       success:true,
       message:"Welcome to the Instructor Account",
       user: req.user
      })
     })

    router.get("/Admin",auth,isAdmin,(req,res)=>{
     return res. status(200).json({
       success:true,
       message:"Welcome to the Admin Account",
       user: req.user
      })
     })

    router.get("/Teacher",auth,isAdmin,(req,res)=>{
     return res. status(200).json({
       success:true,
       message:"Welcome to the Admin Account",
       user: req.user
     })
    })

// Export the router for use in the main application
module.exports = router
