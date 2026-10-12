import express from "express";
import serviceController from "../controller/serviceController.js";

const router = express.Router();

router.get("/", serviceController.getService);

router.post("/", serviceController.createService);

export default router;