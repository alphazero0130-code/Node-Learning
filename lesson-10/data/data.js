let customers = [
  {
    id: 1,
    name: "Rahul",
    phone: "9876543210"
  },
  {
    id: 2,
    name: "Priya",
    phone: "9876543211"
  }
];

let appointments = [
  {
    id: 1,
    customerName: "Rahul",
    service: "Hair Cut",
    price: 500,
    status: "booked"
  },
  {
    id: 2,
    customerName: "Priya",
    service: "Facial",
    price: 800,
    status: "completed"
  }
];

let services = [
  {
    id: 1,
    name: "Hair Cut",
    price: 500
  },
  {
    id: 2,
    name: "Facial",
    price: 800
  },
  {
    id: 3,
    name: "Massage",
    price: 1200
  }
];

export {
  customers,
  appointments,
  services
};