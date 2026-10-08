import express from "express";
import Service from "../model/Service.js";
import validateService from "../middleware/validateService.js";
import mongoose from "mongoose";

const router = express.Router();

router.post("/", validateService, async (req, res) => {
  try {
    const service = await Service.create({
      serviceName: req.body.serviceName.trim(),
      price: req.body.price,
      status: req.body.status,
    });

    res.status(201).json({
      message: "Service created successfully",
      service: service,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const service = await Service.find();

    res.json({
      menubar: "Data found",
      service: service,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid service ID",
      });
    }

    const service = Service.findById(id);

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    res.json({
      message: "Service found",
      service: service,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid service ID",
      });
    }
    const service = Service.findByIdAndUpdate(
      id,
      {
        serviceName: req.body.serviceName,
        price: req.body.price,
        status: req.body.status,
      },
      { returnDocument: "after" },
    );
    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }
    res.json({
      message: "Service updated successfully",
      customer: service,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error,
    });
  }
});

export default router;
