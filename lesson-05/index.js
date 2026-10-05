const {customer, getCustomerNane} = require("./customer");
require("dotenv").config();
const salon = require("./salon");

console.log(customer);
console.log(getCustomerNane());
console.log(process.env.PORT);
console.log(process.env.SALON_NAME);
console.log("Salon:", salon);