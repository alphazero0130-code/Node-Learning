/// Validation Middleware

const validateCustomer = (req, res, next) => {
    const name = req.body.name.trim();
    const phone = req.body.phone.trim();

    if(!name || !phone) {
        return res.status(400).json({
            message: "Name and phone are required"
        })
    }

    if (!/^\d{10}$/.test(phone)) {
        return res.status(400),json({
            message: "Phone number must contain 10 digits"
        })
    }

    next();
}

export default validateCustomer;