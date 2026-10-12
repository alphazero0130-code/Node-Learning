import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    customer: {
      //customer is the field that stores the reference.
      type: mongoose.Schema.Types.ObjectId, //ObjectId is MongoDB's identifier type.
      ref: "Customer", // tells Mongoose which model this reference points to. // It does not automatically verify that the customer exists. We'll handle that when creating an appointment.
      require: true,
    },
    serviceName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      require: true,
    },

    // serviceName: {
    //   type: String,
    //   require: true,
    // },

    price: {
      type: Number,
      require: true,
      min: 0,
    },

    appointmentDate: {
      type: Date,
      require: true,
    },

    status: {
      type: String,
      enum: ["booked", "completed", "cancelled"],
      default: "booked",
    },
  },
  { timestamps: true },
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
