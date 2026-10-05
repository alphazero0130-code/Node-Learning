const salon = {
    name: "Mayank's Salon",
    city : "Mohali",
    owner : "Mayank Kumar Piyush",
    services : [
        {
            id: 1,
            serviceName: "Hair Cut"
        },
        {
            id: 2,
            serviceName: "Hair Color"
        },
        {
            id: 3,
            serviceName: "Facial"
        }
    ],
      customers : [
        {
          id: 1,
          name: "Mayank",
          phone: "9876543210",
          service: "Hair Cut"
        },
        {
          id: 2,
          name: "Kumar",
          phone: "9876543211",
          service: "Facial"
        },
        {
          id: 3,
          name: "Piyush",
          phone: "9876543212",
          service: "Massage"
        }
    ]
}

console.log("Salon Name: " + salon.name);
console.log("Salon Owner: " + salon.owner);
console.log("Number of services : " + salon.services.length);
console.log("First Customer " + salon.customers[0].name);
console.log("First Customer's services " + salon.customers[0].service);

function findCustomerById(id) {
    for (let  i = 0; i < salon.customers.length; i++) {
        if(salon.customers[i].id == id) {
            return salon.customers[i].name;
        } else { 
            return "Customer not found";
        }
    }

    // const customer = salon.customers.find((customer) => customer.id === id);
    // if(customer) {
    //     return customer.name;
    // } else {
    //     return "Customer not found";
    // }
}

const find = findCustomerById(10);
console.log("Found Customer: " + find);
