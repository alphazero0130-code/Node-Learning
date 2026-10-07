/// Midleware ->  code that runs between the request and the final response.
// Middleware Order Matters
// Middleware doesn't always have to apply to the entire application.

import express from "express";
import logger from "./middleware/logger.js";
import authMiddleware from "./middleware/authMiddleware.js";
import  serviceRoutes  from "./routes/serviceRoutes.js";
import userMiddleware from "./middleware/userMiddleware.js"

const app = express();

app.use(logger); // app.use() -> Register something with Express.
app.use(authMiddleware); // authentication
app.use(userMiddleware); // user

app.use("/services", authMiddleware ,serviceRoutes); // applied to all services routers

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
app.get("/admin/customers", authMiddleware, (req, res) => { // authMiddleware only applies to /admin/customers
  res.json({
    message: "Admin customer data",
  });
});

app.get("/profile", userMiddleware, (req, res) => {
  res.json({
    user: req.user // Middleware can also add information to the request.
  });
})
//middleware can prepare information for the next step.

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
