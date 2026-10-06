import express from "express";
import services from "./services.js";  

const app = express();
const customers = [
    {
        id: 1,
        name: "Rahul",
        phone: "9876543210"
    },
    {
        id: 2,
        name: "Priya",
        phone: "9876543211"
    }
];

app.use(express.json());


/// GET
app.get("/", (req, res) => {
    res.send("Hello from Express"); // sends a response.
});

app.get("/customers",(req, res) => {
    res.json(customers);
});

app.get("/services", (req, res) => {
    res.json(services);
});

/// POST
/* (eg.)
app.post("/services", (req, res) => {
    console.log(req.body);
    res.json({
        message : "Services Received", 
        services: req.body // payload
    })
});
*/

// Use Postman, Thunder Client
app.post("/customers", (req, res) => {

  const newCustomer = {
    id: customers.length + 1,
    name: req.body.name,
    phone: req.body.phone
  };

  customers.push(newCustomer);

  res.status(201).json({ // instaed of res.writeHead
    message: "Customer created successfully",
    customer: newCustomer
  });

});

app.post("/services", (req, res) => {

  const newServices = {
    id: services.length + 1,
    name: req.body.name,
    pricee: req.body.phone
  };

  customers.push(newServices);

  res.status(201).json({
    message: "Service created successfully",
    customer: newServices
  });

});


app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
