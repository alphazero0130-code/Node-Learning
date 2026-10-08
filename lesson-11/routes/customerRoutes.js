import express from "express";
import { customers } from "../data/data.js";
import validateCustoemr from "../middleware/validateCustomer.js";

const router = express.Router();

router.get("/:id", (req, res) => {
  try {
    const id = Number(req.params.id);

    const customer = customers.find((customer) => customer.id === id);

    if (!customer) {
      return res.status(404).json({
        message: "Not found",
      });
    }

    res.json({
      message: "Found",
      customer: customer,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});


// Validation Middleware
router.post("/", validateCustoemr, (req, res) => {
  const newCustomer = {
    id: customers.length + 1,
    name: req.body.name.trim(),
    phone: req.body.phone.trim(),
  };
  customers.push(newCustomer);

  res.status(201).json({
    message: "Success",
    customer: customers,
  });
});

export default router;
