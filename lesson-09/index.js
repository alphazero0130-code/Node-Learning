import customerRoutes  from "./routes/customerRoutes.js";
import  appointmentRoutes  from "./routes/appointmentRoutes.js";
import  serviceRoutes  from "./routes/serviceRoutes.js";
import express from "express"

const app = express();

app.use(express.json());

app.use("/customers", customerRoutes);  // the main application connects it:
app.use("/appointments", appointmentRoutes) // the main application connects it:
app.use("/services", serviceRoutes)

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
