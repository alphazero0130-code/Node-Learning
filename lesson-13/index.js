import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import Customer from "./model/Customer.js";

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connecetd");

    app.listen(process.env.PORT || 3000, () => {
      console.log("Server running on http://localhost:3000");
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });

app.post("/customer", async (req, res) => {
  try {
    const customer = await Customer.create({
      name: req.body.name.trim(),
      phone: req.body.phone,
      email: req.body.email,
    });

    res.status(201).json({
      message: "Customer created successfully",
      customer: customer,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create customer",
      error: error.message,
    });
  }
});

app.get("/", (req, res) => {
  res.json({
    mesaage: "Salon API",
  });
});

//GET all Customers
app.get("/customer", async (req, res) => {
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

// Route parameter
app.get("/customer/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid customer ID",
      });
    }

    const customer = await Customer.findById(id);

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }
    res.json({
      message: "Customer Found",
      customer: customer,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch customer",
      error: error.message,
    });
  }
});

// PUT
app.put("/customer/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid customer ID",
      });
    }
    const customer = await Customer.findByIdAndUpdate(
      id,
      {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
      },
      {
        // new: true,// old
        returnDocument: "after",
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
    res.status(500).json({
      message: "Failed to update customer",
      error: error.message,
    });
  }
});

// DELETE
app.delete("/customer/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid customer ID",
      });
    }

    const customer = await Customer.findByIdAndDelete(id);

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    res.json({
      message: "Customer deleted successfully",
      customer: customer,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete customer",
      error: error.message,
    });
  }
});

/*
CREATE
Customer.create()

READ
Customer.find()
Customer.findById()
Customer.findOne()

UPDATE
Customer.findByIdAndUpdate()

DELETE
Customer.findByIdAndDelete()
*/
