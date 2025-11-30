import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import empRoutes from "./routes/employeeRoutes.js";
import path from "path";

dotenv.config();

const app = express();

// CORS
app.use(cors());

// JSON body parser
app.use(express.json());

// ⭐ REQUIRED: Parse form-data text fields
app.use(express.urlencoded({ extended: true }));

// Connect DB
connectDB();

// Serve uploaded images
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/emp", empRoutes);

// Root test endpoint
app.get("/", (req, res) => {
  res.json({ message: "Server is running..." });
});

// Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
