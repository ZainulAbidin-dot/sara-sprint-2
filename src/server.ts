import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/database";
// import userRoutes from "./routes/user.routes";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
// app.use("/api", userRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
