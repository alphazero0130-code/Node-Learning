const validateService = (req, res, next) => {
    const body = req.body ?? {};
    const serviceName = body.serviceName;
    const price = body.price
    
    if(!serviceName.trim() || !price) {
        return res.status(400).json({
            message: "name and price are required."
        })
    } 

    if (body.status !== undefined && typeof body.status !== "boolean") {
    return res.status(400).json({
      message: "Status must be a boolean",
    });
  }

  next();
}
export default validateService;