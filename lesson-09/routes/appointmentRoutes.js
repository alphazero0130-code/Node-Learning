import express from "express";
import { appointments } from "../data/data.js";

const router = express.Router();

// GET all appointments
router.get("/", (req, res) => {
  res.json(appointments);
});

// GET one appointments
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const appointment = appointments.find((appointment) => appointment.id === id);

  if (!appointment) {
    return res.status(404).json({
      message: "Appointment not found",
    });
  }

  res.json(appointment);
});

// CREATE customer
router.post("/", (req, res) => {
  const newAppointment = {
    id: appointments.length + 1,
    customerName: req.body.customerName,
    service: req.body.service,
    price: req.body.price,
    status: req.body.status,
  };

  appointments.push(newAppointment);

  res.status(201).json({
    message: "Appointment created successfully",
    appointment: newAppointment,
  });
});

export default router; //router is basically a smaller route manager.
