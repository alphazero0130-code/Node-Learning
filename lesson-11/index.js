import express from "express";
import { customers } from "./data/data.js";
import customerRoutes from "./routes/customerRoutes.js"

const app = express();

app.use(express.json());
app.use("/customers", customerRoutes);

app.post("/customer", (req, res) => {
  const { name, phone } = req.body.trim(); // is JavaScript destructuring.

  if (!name || !phone) {
    return res.status(400).json({
      message: "Name and phone are required",
    });
  }

//   if (phone.length !== 10) {
//     return res.status(400).json({
//       message: "Phone number must be 10 digits",
//     });
//   }

  if (!/^\d{10}$/.test(phone)) {
  return res.status(400).json({
    message: "Phone number must contain 10 digits"
  });
}

  const newCustomer = {
    id: customers.length + 1,
    name: name,
    phone: phone,
  };

  customers.push(newCustomer);

  res.status(201).json({
    message: "Customer created successfully",
    customer: newCustomer,
  });
});



app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
