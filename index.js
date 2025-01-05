import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import candidateRoutes from "./routes/candidate.js";
import path from 'path'
const __dirname = path.resolve()

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: process.env.CLIENT_URL, // Allow requests from this origin
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));

// if (process.env.NODE_ENV === "production") {

// } else {
//   app.get("*", (req, res) => {
//     res.send("api running");
//   });
// }


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.CLIENT_URL);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  next();
});

app.use("/api/test", (req, res) => {
  res.json({ message: "API is working" });
});
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/candidate", candidateRoutes);

app.use(express.static("client/dist"));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
// });

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
