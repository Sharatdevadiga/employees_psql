const routeNotDefined = async (req, res) => {
  res.status(400).json({
    message: "This route is not defined",
  });
};

const globalErrorHandler = (err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "Internal server error",
  });
};

export { routeNotDefined, globalErrorHandler };
