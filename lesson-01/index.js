const name = "Mayank";
const age = 25;
console.log(`My name is ${name} and I am ${age} years old.`);

const user = {
    id: 1,
    name: "Mayank",
    email: "mayank@example.com",
    age: 25,
}
console.log(`My name is ${user.name} and I am ${user.age} years old.\nEmail: ${user.email}`);

const services =[
    'Web Development',
    'Mobile App Development',
    'UI/UX Design',
    'Digital Marketing',
]
console.log(services)
console.log(`I am ${services[0]}`);

const customers =[
    {
        id: 1,
        name: "Mayank",
        phone: "1234567890",
    },
     {
        id: 2,
        name: "Kumar",
        phone: "123456789",
    },
     {
        id: 1,
        name: "Piyush",
        phone: "12345678",
    },
]
console.log(customers[0]);
console.log(customers[0].name);

function greetUser(name) {
    console.log("Hello " + name);
}
greetUser("Mayank");



const calculateBill = (price, quantity) => {
    return price * quantity;
}
const total = calculateBill(500, 2);
console.log("Total bill is " + total);


const calculateBill2 = (price, quantity) => {
    const total = price * quantity;
    return total;
}

const total2 = calculateBill2(1000, 3);
console.log("Total bill is " + total2);

const salon = {
    name: "Mayank's Salon",
    city : "Mohali",
    customers : [
        {
          id: 1,
          name: "Rahul",
          phone: "9876543210",
          service: "Hair Cut"
        },
        {
          id: 2,
          name: "Priya",
          phone: "9876543211",
          service: "Facial"
        },
        {
          id: 3,
          name: "Amit",
          phone: "9876543212",
          service: "Massage"
        }
    ]
}

console.log("Welcome to " + salon.name + " Located in " + salon.city);
console.log("We have total " + salon.customers.length + " customers.");
console.log("Our First customer is " + salon.customers[0].name + " and He has bood for " + salon.customers[0].service);