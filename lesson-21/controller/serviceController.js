import Service from "../model/Service.js";

const createService = async (req, res, next) => {
  try {
    const { serviceName, price, status } = req.body;

    const service = await Service.create({
      serviceName,
      price,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Service created successfully",
      service,
    });
  } catch (error) {
    if (error.name == "ValidationError") {
      const validationError = new Error["Validation Error"]();
      ((validationError.statusCode = 400),
        (validationError.error = Object.values(error.errors).map(
          (item) => item.message,
        )));
      return next(validationError);
    }

    next(error);
  }
};

const getService = async (req, res, next) => {
  try {
    const service = await Service.find().sort({ serviceName: 1 });

    res.status(200).json({
      success: true,
      message: "Data found",
      service,
    });
  } catch {
    next(error);
  }
};

export default {createService, getService};
