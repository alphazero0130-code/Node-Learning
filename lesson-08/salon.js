import express from "express";
import appointments from "./appointments.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Appointment detail",
  });
});

// app.get("/appointments", (req, res) => {
//   res.json(appointments);
// });

/// ROUTE PARAMETER
app.get("/appointments/:id", (req, res) => {
  const id = Number(req.params.id);

  const appointment = appointments.find((customer) => customer.id === id);

  if (!appointment) {
   return res.status(404).json({
      message: "Appoinetment not found",
    });
  }
  res.json(appointment);
});

/// POST
app.post("/appointments", (req, res) => {
  const newAppointment = {
    id: appointments.length + 1,
    customerName: req.body.customerName,
    service: req.body.service,
    price: req.body.price,
    date: req.body.date,
    status: req.body.status,
  };

  appointments.push(newAppointment);

  res.status(201).json({
    message: "Added Succesfully",
    appointment: newAppointment,
  });
});

/// PUT
app.put("/appointments/:id", (req, res) => {
  const id = Number(req.params.id);

  const appointment = appointments.find((appointment) => appointment.id === id);

  appointment.customerName = req.body.customerName;
  appointment.service = req.body.service;
  appointment.price = req.body.price;
  appointment.date = req.body.date;
  appointment.status = req.body.status;

  res.json({
    message: "Successfully Update",
    appointment: appointment,
  });
});

/// PATCH
app.patch("/appointments/:id", (req, res) => {
  const id = Number(req.params.id);

  const appointment = appointments.find((appointment) => appointment.id == id);

  if (req.body.customerName !== undefined)
    appointment.customerName = req.body.customerName;

  if (req.body.service !== undefined) appointment.service = req.body.service;

  if (req.body.price !== undefined) appointment.price = req.body.price;

  if (req.body.date !== undefined) appointment.date = req.body.date;

  if (req.body.status !== undefined) appointment.status = req.body.status;

  res.json({
    message: "Successfully Update",
    appointment: appointment,
  });
});

/// DELETE
app.delete("/appointments/:id", (req, res) => {
  const id = req.params.id;

  const appointmentIndex = appointments.findIndex(
    (appointment) => appointment.id == id,
  );

  if (appointmentIndex === -1) {
    return res.status(404).json({
      message: "Customer not found",
    });
  }

  const deletedAppointment = appointments.splice(appointmentIndex, 1);

  res.json({
    message: "Appointment deleted",
    appointments: deletedAppointment[0],
  });
});


/// QUERY APPOINTMENT
app.get("/appointments", (req, res) => {
  const status = req.query.status;

  // If no query parameter is provided
  if (!status) {
    return res.json(appointments);
  }

  // Filter appointments by status
  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.status.toLowerCase() === status.toLowerCase()
  );

  res.json(filteredAppointments);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
