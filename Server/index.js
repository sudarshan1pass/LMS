const express = require("express");
const app = express();

const userRoutes = require("./Routes/User");
const courseRoutes =require("./Routes/Course")

const database = require("./Config/database");
const { cloudinaryConnect } = require("./Config/cloudinary");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");

dotenv.config();
const PORT = process.env.PORT || 4000;
const allowedOrigins = [
	process.env.FRONTEND_URL,
	"http://localhost:5173",
].filter(Boolean);

//database connect
database.connect();
cloudinaryConnect();


//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);


//Routes
app.use("/api/v1/auth", userRoutes);

app.use("/api/v1/course", courseRoutes);


//def route

app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(PORT, () => {
	 console.log(`Server started at http://localhost:${PORT} `);
})
