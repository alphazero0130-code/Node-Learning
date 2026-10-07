const userMiddleware = (req, res, next) => {
    req.user = {
        id: "1",
        name: "Admin"
    };

    next();
}
// Middleware can also add information to the request.
// middleware can prepare information for the next step.
export default userMiddleware;