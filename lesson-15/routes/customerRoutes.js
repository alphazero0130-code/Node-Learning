import express from "express";
import Customer from "../model/Customer.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const customer = await Customer.create({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      status: req.body.status,
    });

    res.status(201).json({
      message: "Customer created successfully",
      customer: customer,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      // This checks whether Mongoose rejected the data because it broke a schema rule.
      return res.status(400).json({
        message: "Validation failed",
        error: Object.values(error.errors).map((item) => item.message), // collects the individual validation messages into an array.
      });
    }

    res.status(500).json({
      message: "Failed to create customer",
      error: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const customer = await Customer.find();
    res.json({
      menubar: "Data found",
      customer: customer,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch customer",
      error: error.message,
    });
  }
});

/// PATCH
router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const allowedFields = ["name", "phone", "email"]; // We explicitly decide which customer fields this API allows the client to update.

    //Build the update object -> json req to Object
    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: "Please provide at least one valid field to update",
      });
    }

    const customer = await Customer.findByIdAndUpdate(
      id,
      { $set: updates }, // MongoDB's $set operator updates only the specified fields.
      {
        returnDocument: "after", // returns the updated customer.
        runValidators: true, // asks Mongoose to validate the updated fields against the schema rules.
      },
    );

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }
    res.json({
      message: "Customer updated successfully",
      customer: customer,
    });
  } catch (error) {
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid update data",
        error: error.message,
      });
    }

    res.status(500).json({
      message: "Failed to update customer",
      error: error.message,
    });
  }
});

export default router;

/*
Important: Mongoose schema validation runs automatically when you use methods such as Customer.create(). 
Update methodmessage: "Validation Error",s need special attention: findByIdAndUpdate() does not run update validators by default. 
You can enable them with { runValidators: true }.
*/
