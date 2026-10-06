import express from "express";
import customers from "./customer.js";
import services from "./services.js";

const app = express();

app.use(express.json());

// Home
app.get("/", (req, res) => {
  res.json({
    message: "Salon API",
  });
});

// All Customer
// app.get("/customers", (req, res) => {
//   res.json(customers);
// });

/// Route Parameters
app.get("/customers/:id", (req, res) => {
  // :id -> route parameter
  const id = Number(req.params.id); // Convert plain text to num

  const customer = customers.find((customer) => customer.id === id);

  if (!customer) {
    return res.status(404).json({
      // Return Stops the function
      message: "Customer Not Found",
    });
  }

  res.json(customer);
});

/// PUT - update the resource as a whole.
app.put("/customers/:id", (req, res) => {
  const id = Number(req.params.id);

  const customer = customers.find((customer) => customer.id === id);

  if (!customer) {
    return res.status(404).json({
      message: "Customer not found",
    });
  }

  customer.name = req.body.name;
  customer.phone = req.body.phone;

  res.json({
    message: "Customer updated successfully",
    customer: customer,
  });
});

/// PATCH - change only one/partial field.
app.patch("/services/:id", (req, res) => {
  const id = Number(req.params.id);

  const service = services.find((service) => services.id === id);

  if (!service) {
    return res.status(404).json({
      message: "Service Not Found",
    });
  }

  if (req.body.name !== undefined) {
    // upadte when not undefined
    service.name = req.body.name;
  }

  if (req.body.price !== undefined) {
    // upadte when not undefined
    service.price === req.body.price;
  }

  req.json({
    message: "Service updated successfully",
    service: service,
  });
});

/// DELETE
app.delete("/customer/:id", (req, res) => {
  const id = Numver(req.params.id);

  const customerIndex = customers.findIndex(
    // return position
    (customer) => customer.id === id,
  );

  if (customerIndex === -1) {
    return res.status(404).json({
      message: "Customer not found",
    });
  }

  const deletedCustomer = customers.splice(customerIndex, 1); // remove 1 iten from this index

  res.json({
    message: "Customer deleted successfully",
    customer: deletedCustomer[0],
  });
});

/// Query Parameters    
app.get("/customers", (req, res) => {
  const name = req.query.name;

  if (!name) {
    return res.json(customers);
  }

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase() === name.toLowerCase()
  );

  res.json(filteredCustomers);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
