const customers = [
  {
    id: 1,
    name: "Rahul",
    service: "Hair Cut",
    active: true,
    gender: "male"
  },
  {
    id: 2,
    name: "Priya",
    service: "Facial",
    active: false,
     gender: "female"
  },
  {
    id: 3,
    name: "Amit",
    service: "Massage",
    active: true,
     gender: "male"
  }
];

const services = [
  {
    name: "Hair Cut",
    price: 500
  },
  {
    name: "Facial",
    price: 800
  },
  {
    name: "Massage",
    price: 1000
  }
];

/// Map(transform data) - Array of items
const names = customers.map((customer) => {
  return customer.name;
});
console.log(names);

const id = customers.map((customer) =>  customer.id);
console.log(id);

/// Filter(select multiple items) - Return Array
const activeCustomers = customers.filter(
    (customer) =>  customer.active === true
);
console.log(activeCustomers);

const getGender = customers.filter(
    (customer) => customer.gender === "female"
);
console.log(getGender);

/// Find(find one item) - Return Object
const findCutomer = customers.find(
  (customer) => customer.id === 1
);
console.log(findCutomer);

/// Reduce(calculate something) - Many values -> Process them -> One final value
const totalPrice = services.reduce((sum, service) => sum + service.price, 0);
console.log(totalPrice);

const total = services.reduce((sum, service) => {
  return sum + service.price;
}, 0); // 0 is initial value for sum 
console.log(total);

