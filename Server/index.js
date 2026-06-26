const express = require("express");
const app = express();

const userRoutes = require("./Routes/User");
const courseRoutes = require("./Routes/Course");

const database = require("./Config/database");
const { cloudinaryConnect } = require("./Config/cloudinary");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");

dotenv.config();

const PORT = process.env.PORT || 4000;

// Database Connection
database.connect();
cloudinaryConnect();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Debug middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Allowed Origins
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "https://lms-git-main-sudarshans-projects-b011b1eb.vercel.app",
  "https://lms-d44nlz905-sudarshans-projects-b011b1eb.vercel.app",
].filter(Boolean);

// CORS Configuration
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (Postman, mobile apps)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS not allowed"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle OPTIONS requests
app.options(/.*/, cors());

// File Upload Middleware
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/course", courseRoutes);

// Default Route
app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Your server is up and running....",
  });
});

// Unknown Routes Handler
app.use("*", (req, res) => {
  return res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err);

  return res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server started at PORT ${PORT}`);
});