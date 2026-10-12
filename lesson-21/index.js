import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import "dotenv/config";
import mongoose from "mongoose";

const app = express();

app.use(helmet()); // // Add common HTTP security headers (adds several HTTP security headers.)

app.use(express.json({limit: "100kb"})); // Parse JSON and limit request body size (restricts the size of JSON request bodies.)

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes, expressed in milliseconds
  limit: 100, // Up to 100 requests per client during the window
  standardHeaders: "draft-8", // Enables standardized rate-limit response headers
  legacyHeaders: false, // Disables older X-RateLimit-* headers
  message : {
    success : false,
    message: "Too many requests. Please try again later."
  }
});
/*
Limits repeated requests. This example allows up to 100 requests per 15-minute window per client IP, 
subject to the package's configuration and deployment environment.
*/

app.use(apiLimiter);

app.use("/appointments", appointmentRoutes);
app.use("/service", serviceRoutes);

app.use(errorHandler);

const startServer = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined");
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const port = process.env.PORT || 3000;

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Connection Failed", error);
    process.exit(1);
  }
};

startServer();
