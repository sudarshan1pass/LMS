// Import the required modules
const express = require("express")
const router = express.Router()

// Import the Controller

// Course Controller Import
const {
  createCourse,
  editCourse 
  
} = require("../Controller/Course")

const { auth, isInstructor } = require("../Middleware/auth");


// Importing Middlewares


// const { auth, isInstructor, isStudent, isAdmin } = require("../Middleware/auth")



router.post("/createCourse", auth, isInstructor, createCourse)
router.put("/editCourse", auth, isInstructor, editCourse)


module.exports = router