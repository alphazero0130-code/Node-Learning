const salon = {
    salonAppointment: [
        {
            id: 1,
            customerName: "Rahul",
            service: "Hair Cut",
            price: 500,
            status: "completed"
        },
        {
            id: 2,
            customerName: "Priya",
            service: "Hair Spa",
            price: 1200,
            status: "completed"
        },
        {
            id: 3,
            customerName: "Amit",
            service: "Beard Trim",
            price: 300,
            status: "pending"
        },
        {
            id: 4,
            customerName: "Sneha",
            service: "Hair Coloring",
            price: 1800,
            status: "confirmed"
        },
        {
            id: 5,
            customerName: "Vikram",
            service: "Facial",
            price: 1000,
            status: "cancelled"
        }
    ]
};

/// Get all customer names using map()
const customerName = salon.salonAppointment.map((appointment) => appointment.customerName);
console.log(customerName);

/// Get only completed appointments using filter().
const completedAppointments = salon.salonAppointment.filter((appointment) => appointment.status === "completed");
console.log(completedAppointments);

/// Find appointment with ID 3 using find().
const appointmentwithId3 = salon.salonAppointment.find((appointment) => appointment.id === 3);
console.log(appointmentwithId3);

/// Calculate total revenue using reduce().
const totalRevenue = salon.salonAppointment.reduce((total, appointment) => total + appointment.price, 0);
console.log(totalRevenue);

/// Calculate revenue from completed appointments only.
const completedRevenue = completedAppointments.reduce((total, appointment) => total + appointment.price, 0);
console.log(completedRevenue);