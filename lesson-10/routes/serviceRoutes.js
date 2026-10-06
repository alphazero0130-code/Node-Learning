import express from "express";
import { services } from "../data/data.js";

const router = express.Router();

// GET all services
router.get("/", (req, res) => {
  res.json(services);
});

// GET one services
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const service = services.find((service) => service.id === id);

  if(!service) {
    return res.status(404).json({
        message : "Service not Found"
    })
  }
  res.json({
    message: "Service found",
    service: service
  })
});

// CREATE services
router.post("/", (req, res) => {
    const newServices = {
        id: services.length + 1,
        name: req.body.name,
        price: req.body.price
    }

    services.push(newServices);

    res.status(201).json({
        message: "Service Created Successfully",
        services: newServices
    })
});

export default router;