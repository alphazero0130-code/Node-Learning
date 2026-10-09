import express, { json } from "express";
import Customer from "../model/Customer.js";
import { connect } from "mongoose";

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
    const customer = await Customer.find().sort({ name: -1 }); // sorting
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

/// retrieves the search query parameter.

router.get("/search", async (req, res) => {
  try {
    const search = req.query.search;

    const customers = await Customer.find({
      name: { $regex: search || "", $options: "i" },
    });

    res.json({
      message: "Search results",
      customers: customers,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to search customers",
      error: error.message,
    });
  }
});

router.get("/filter", async (req, res) => {
  try {
    const { status } = req.query;

    const filter = {};

    if (status) {
      if (!["active", "inactive"].includes(status)) {
        return res.status(400).json({
          message: "Status must be active or inactive",
        });
      }

      filter.status = status;
    }

    const customers = await Customer.find(filter);

    res.json({
      message: "Filtered customers",
      customers: customers,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to filter customers",
      error: error.message,
    });
  }
});

/// Sorting customers
// const customers = await Customer.find().sort({ name: 1 });
/*
{ name: 1 }	A to Z
{ name: -1 }	Z to A
{ createdAt: -1 }	Newest first, if your schema records createdAt
*/

/// Pagination
// Customer.find().skip(10).limit(10);
/*
.skip(10) skips the first 10 matching documents.
.limit(10) returns at most the next 10 documents.
*/

router.get("/customer", async (req, res) => {
  try {
    const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
    /*
    req.query.page gets the page number from the URL.
    Number.parseInt(req.query.page, 10) converts the value into an integer (base 10).
    || 1 uses 1 if the value is missing, invalid, or 0.
    Math.max(1, ...) ensures the page number is never less than 1.
    */
    const limit = Math.min(
      100,
      Math.max(1, Number.parseInt(req.query.limit, 10) || 10),
      /*
    Number.parseInt(req.query.limit, 10) converts the limit to an integer.
    || 10 uses 10 as the default when the value is missing, invalid, or 0.
    Math.max(1, ...) ensures the limit is at least 1.
    Math.min(100, ...) ensures the limit never exceeds 100.
    */
    );

    const { search, status, sortBy } = req.query;
    const filter = {};

    if (search) {
      const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.name = { $regex: escapedSearch, $options: "i" }; // "i" - ignores uppercase and lowercase differences. $regex - searches for matching text.
    }

    if (status) {
      if (!["active", "inactive"].includes(status)) {
        return res.status(400).json({
          message: "Status must be active or inactive",
        });
      }

      filter.status = status;
    }

    const allowedSortFields = ["name", "createdAt"];
    const selectedSort = allowedSortFields.includes(sortBy)
      ? sortBy
      : "createdAt";

    const customers = await Customer.find(filter)
      .sort({ [selectedSort]: selectedSort === "name" ? 1 : -1, _id: 1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const totalCustomers = await Customer.countDocuments(filter);

    res.json({
      message: "Customers fetched successfully",
      page,
      limit,
      totalCustomers,
      totalPages: Math.ceil(totalCustomers / limit),
      customers,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch customers",
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
