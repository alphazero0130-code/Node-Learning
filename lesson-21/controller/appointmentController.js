import Appointment from "../model/Appointment.js";
import Customer from "../model/Customer.js";
import Service from "../model/Service.js";

const createAppointment = async (req, res, next) => {
  try {
    const { customer, serviceName, price, appointmentDate } = req.body;

    const existingCustomer = await Customer.findById(customer); // It checks whether the supplied customer ID matches an existing customer before creating the appointment.

    if (!existingCustomer) {
      const error = new Error("Customr not found");
      error.statusCode = 404;
      return next(error);
    }

    const appointment = await Appointment.create({
      customer,
      serviceName,
      price,
      appointmentDate,
    });

    res.status(201).json({
      success: true,
      message: "Appointment created successfully",
      appointment,
    });
  } catch (error) {
    next(error);
  }
};

const getAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find()
      .populate("customer", "name phone")
      .populate("serviceName", "serviceName price")
      .sort({ appointmentDate: 1 });

    res.status(200).json({
      success: true,
      message: "Data Found",
      count: appointments.length,
      appointments,
    });
  } catch (error) {
    next(error);
  }
};

const getRevenueSummary = async (req, res, next) => {
  try {
    const summary = await Appointment.aggregate([
      {
        $match: {
          // filters documents, similar to filtering records with .filter() in JavaScript.
          status: "booked", // Only appointments with status: "completed" continue to the next stage
        },
      },
      {
        $group: {
          // groups documents and calculates values, similar to using reduce() for totals and counts.
          _id: null, // puts all matching appointments into one group.
          totalRevenue: { $sum: "$price" }, // adds the price of every matching appointment. The $ means to read the price field from each document.
          totalAppointments: { $sum: 1 }, // adds one for every matching appointment, giving us the count.
        },
      },
    ]);

    const result = summary[0] || {
      totalRevenue: 0,
      totalAppointments: 0,
    };
    // Aggregation returns an array. If no completed appointments exist, the array may be empty. This fallback ensures the API returns zero rather than missing values.

    res.status(200).json({
      success: true,
      revenue: result.totalRevenue,
      completedAppointments: result.totalAppointments,
    });
  } catch (error) {
    next(error);
  }
};

const getRevenueByService = async (req, res, next) => {
  try {
    const report = await Appointment.aggregate([
      {
        $match: {
          status: "booked",
        },
      },
      {
        $group: {
          _id: "$serviceName", // MongoDB groups appointments that have the same service name.
          totalRevenue: { $sum: "$price" },
          totalAppointments: { $sum: 1 },
        },
      },
      {
        $sort: {
          totalRevenue: 1,
        },
      },
    ]);

    const result = report[0] || {
      totalRevenue: 0,
      totalAppointments: 0,
    };

    res.status(200).json({
      success: true,
      revenue: result.totalRevenue,
      completedAppointments: result.totalAppointments,
      report,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createAppointment,
  getAppointments,
  getRevenueSummary,
  getRevenueByService,
};
