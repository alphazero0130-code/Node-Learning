import express from "express";
import { customers } from "../data/data.js";

const router = express.Router();
// Think of router as a mini Express application dedicated to one feature.

// GET all customers
router.get("/", (req, res) => {
  res.json(customers);
});


// GET one customer
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const customer = customers.find(
    (customer) => customer.id === id
  );

  if (!customer) {
    return res.status(404).json({
      message: "Customer not found"
    });
  }

  res.json(customer);
});

// CREATE customer
router.post("/", (req, res) => {
  const newCustomer = {
    id: customers.length + 1,
    name: req.body.name,
    phone: req.body.phone,
  };

  customers.push(newCustomer);

  res.status(201).json({
    message: "Customer created successfully",
    customer: newCustomer
  })
});

export default router; // makes the router available to index.js.
//router is basically a smaller route manager.
