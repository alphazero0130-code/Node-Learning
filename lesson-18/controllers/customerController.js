import Customer from "../models/Customer.js";

const getCustomer = async (req, res) => {
  try {
    const customers = await Customer.find();

    res.json({
      message: "Customers fetched successfully",
      customers: customers,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const createCustomer = async (req, res) => {
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
      return res.status(400).json({
        message: "Validation Error",
        error: Object.values(error.errors).map((item) => item.message),
      });
    }

    res.status(500).json({
      message: "Failed to create customer",
      error: error.message,
    });
  }
};

export default {getCustomer, createCustomer};
