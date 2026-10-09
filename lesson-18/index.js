import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import customerRoutes from "./routes/customerRoutes.js";

const app = express();
app.use(express.json());

app.use("/customers", customerRoutes);

const startServer = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const port = process.env.PORT;
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Connection Failed", error);
    process.exit(1);
  }
};

startServer();
