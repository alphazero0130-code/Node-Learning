import express from "express";
import appointmentController from "../controller/appointmentController.js";

const router = express.Router();

router.get("/", appointmentController.getAppointments);

router.get("/reports/revenue", appointmentController.getRevenueSummary);

router.get("/reports/services", appointmentController.getRevenueByService);

router.post("/", appointmentController.createAppointment);

export default router;