/// Midleware ->  code that runs between the request and the final response.
//Middleware Order Matters

import express from "express";
import logger from "./middleware/logger.js";
import authMiddleware from "./middleware/authMiddleware.js";

const app = express();

app.use(logger); // app.use() -> Register something with Express.
app.use(authMiddleware); // authentication

app.use(express.json());

app.use((req, res, next) => {
  console.log("request received");

  next(); // Middleware is finished. Continue to the next step."
});
// middleware normally does Continue or Finish the request

app.get("/", (req, res) => {
  res.json({
    // Finish the request
    message: "Salon API",
  });
});

// authentication
app.get("/admin/customers", authMiddleware, (req, res) => {
  res.json({
    message: "Admin customer data",
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
