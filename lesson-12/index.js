import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(process.env.PORT || 3000, () => {
      console.log("Server Running");
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });
