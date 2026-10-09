import mongoose from "mongoose"; // We need Mongoose because we are going to create a Schema and Model.

const customerSchema = new mongoose.Schema({
  // "Mongoose, I want to define the structure of a Customer."
  name: {
    type: String,
    required: [true, "Customer name is required"],
    trim: true,
    minlength: [2, "Name must contain at least 2 characters "],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    match: [/^\d{10}$/, "Phone number must contain 10 digits"],
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"],
  },
  status: {
    type: String,
    trim: true,
    enum: {
      values: ["active", "inactive"],
      message: "Status must be either active or inactive",
    },
    default: "active",
  },
});

const Customer = mongoose.model("Customer", customerSchema); // We are creating a Customer model using our schema.

export default Customer;

/*
Schema
"What should a customer look like?"

        ↓

Model
"How do I work with customers?"

        ↓

Document
"Here is Rahul's actual data."
*/
