import mongoose from 'mongoose'; // We need Mongoose because we are going to create a Schema and Model.

const customerSchema = new  mongoose.Schema({ // "Mongoose, I want to define the structure of a Customer."
        name: {
            type: String,
            required: true
        }, 
        phone: {
            type: String,
            required: true
        },
        email: {
            type: String
        }
});

const Customer = mongoose.model("Customer", customerSchema); // We are creating a Customer model using our schema.

export default Customer; 