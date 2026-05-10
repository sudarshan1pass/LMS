const Course = require("../Models/Course")
const Category = require("../Models/Category")
const User = require("../Models/User")
const { uploadImageToCloudinary } = require("../Utils/imageUploader")

// Function to create a new course
exports.createCourse = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const userId = req.user.id;

    const {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag: _tag,
      category,
      status,
      instructions: _instructions,
    } = req.body || {};

    // thumbnail check
    if (!req.files || !req.files.thumbnailImage) {
      return res.status(400).json({
        success: false,
        message: "Thumbnail required",
      });
    }

    const thumbnail = req.files?.thumbnailImage;

    // parse JSON safely
    let tag = [];
    let instructions = [];

    try {
      tag = JSON.parse(_tag || "[]");
      instructions = JSON.parse(_instructions || "[]");
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Invalid JSON format",
      });
    }

    // validation
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      // !tag.length ||
      !category 
      // ||
      // !instructions.length
      ) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    const courseStatus = status || "Draft";

    // instructor check
    const instructor = await User.findById(userId);
    if (!instructor || instructor.accountType !== "Instructor") {
      return res.status(403).json({
        success: false,
        message: "Only instructor allowed",
      });
    }

    // category check
    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // upload image
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    // create course
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructor._id,
      whatYouWillLearn,
      price,
      tag,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
      status: courseStatus,
      instructions,
    });

    // update user
    await User.findByIdAndUpdate(instructor._id, {
      $push: { courses: newCourse._id },
    });

    // update category
    await Category.findByIdAndUpdate(category, {
      $push: { course: newCourse._id },
    });

    return res.status(200).json({
      success: true,
      data: newCourse,
      message: "Course Created Successfully 🚀",
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    });
  }
};

exports.editCourse = async (req, res) => {
}

exports.getAllCourses = async (req, res) => {
}

exports.getCourseDetails = async (req, res) => {
}

exports.getFullCourseDetails = async (req, res) => {
}

exports.getInstructorCourses = async (req, res) => {
}

exports.getFullCourseDetails = async (req, res) => {
}

exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body

    // Find the course
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    // Unenroll students from the course
    const studentsEnrolled = course.studentsEnrolled
    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { course: courseId },
      })
    }

    // Delete sections and sub-sections
    const courseSections = course.courseContent
    for (const sectionId of courseSections) {
      // Delete sub-sections of the section
      const section = await Section.findById(sectionId)
      if (section) {
        const subSections = section.subSection
        for (const subSectionId of subSections) {
          await SubSection.findByIdAndDelete(subSectionId)
        }
      }

      // Delete the section
      await Section.findByIdAndDelete(sectionId)
    }

    // delete course id from category schema 
    // delete ratings of this course 

    // Delete the course
    await Course.findByIdAndDelete(courseId)

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}