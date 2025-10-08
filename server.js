import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import User from "./models/User.js";
import empRoutes from "./routes/employeeRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/emp", empRoutes);

// Connect to MongoDB
connectDB();

// Temporary test route (optional)
app.get("/test", async (req, res) => {
  const user = new User({ username: "test", email: "test@email.com", password: "123456" });
  await user.save();
  res.json({ message: "Test user saved!" });
});

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Server is running..." });
});

// Mount routes
app.use("/api/v1/user", userRoutes);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
