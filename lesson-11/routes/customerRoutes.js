import express from "express";
import { customers } from "../data/data";

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
