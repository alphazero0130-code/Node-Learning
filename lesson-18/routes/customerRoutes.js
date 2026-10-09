import express from "express";
import customerConstroller from "../controllers/customerController.js";

const router = express.Router();

router.get("/", customerConstroller.getCustomer );

router.post("/", customerConstroller.createCustomer);

export default router;