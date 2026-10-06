const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;

    if(!token) {
        return res.status(401).json({
            message: "Unauchourized"
        });
    }
    next();
};

export default authMiddleware;

/*
GET /admin/customers
   ↓
authMiddleware
   ↓
Token exists?
   │
   ├── No → 401
   │
   └── Yes
        ↓
      Route
        ↓
      Data
*/