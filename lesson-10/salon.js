import express from "express";
import { customers } from "./data/data.js";

const app = express();

app.use(express.json());

//logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Route
app.get("/", (req, res) => {
  res.json({
    message: "Salon API",
  });
});

// Another Route
app.get("/customers", (req, res) => {
  res.json(customers);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
