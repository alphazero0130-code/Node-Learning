import express from "express";
import { appointments } from "../data/data.js";
import validateAppointment from "../middleware/validateAppointment.js";

const router = express.Router();

router.post("/", validateAppointment, (req, res) => {
  const newAppointment = {
    id: appointments.length + 1,
    customerName: req.body.customerName,
    service: req.body.service,
    price: req.body.price,
    status: req.body.status,
  };

  appointments.push(newAppointment);

  res.status(201).json({
    message: "Success",
    appointment: appointments,
  });
});

export default router;
