const validateAppointment = (req, res, next) => {

    const customerName = req.body.customerName.trim();
    const service = req.body.service.trim();
    const price = req.body.price;
    const date = req.body.date.trim();
    const status = req.body.status.trim();

    if(!customerName || !service || !price || !date || !status) {
        return res.status(400).json({
            message: "Fields are Required"
        })
    }

    next();
}

export default validateAppointment;