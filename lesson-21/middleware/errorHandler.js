const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Prints error details in your terminal, which helps you debug problems.

  const response = {
    success: false,
    message: err.message || "Internal Server Error",
  };

  if (err.errors) {
    response.errors = err.errors;
  }

  res.status(err.statusCode || 500).json(response);
};

export default errorHandler;
