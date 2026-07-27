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
console.log("FRONTEND_URL =", process.env.FRONTEND_URL);
console.log("MAIL_HOST =", process.env.MAIL_HOST);
console.log("BREVO_API_KEY =", !!process.env.BREVO_API_KEY);
console.log("MAIL_FROM =", !!process.env.MAIL_FROM);

const PORT = process.env.PORT || 4000;
const parseOrigins = (...values) =>
  values
    .flatMap((value) => (value || "").split(","))
    .map((origin) => origin.trim().replace(/\/+$/, ""))
    .filter(Boolean);

const allowedOrigins = new Set(parseOrigins(
  process.env.FRONTEND_URL,
  process.env.FRONTEND_URLS,
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
));

const isVercelOrigin = (origin) => {
  try {
    const { hostname, protocol } = new URL(origin);

    return protocol === "https:" && hostname.endsWith(".vercel.app");
  } catch {
    return false;
  }
};

const corsOptions = {
  origin(origin, callback) {
    if (!origin) {
      return callback(null, true);
    }

    const normalizedOrigin = origin.replace(/\/+$/, "");

    if (
      allowedOrigins.has(normalizedOrigin) ||
      isVercelOrigin(normalizedOrigin)
    ) {
      return callback(null, true);
    }

    console.warn("CORS blocked origin:", origin);
    return callback(null, false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
};

console.log("CORS origins =", [...allowedOrigins]);

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


app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

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

// 404 Route Handler (Express 5 compatible)
app.use((req, res) => {
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
