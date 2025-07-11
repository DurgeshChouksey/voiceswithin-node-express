const {constants} = require("../constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({ title: "Validation Error", message: err.message, stack_trace: err.stack });
      break;

    case constants.SERVER_ERROR:
      res.json({ title: "Server Error", message: err.message, stack_trace: err.stack });
      break;

    case constants.UNAUTHORIZED:
      res.json({ title: "Unauthorized", message: err.message, stack_trace: err.stack });
      break;

    case constants.FORBIDDEN:
      res.json({ title: "Forbidden", message: err.message, stack_trace: err.stack });
      break;

    case constants.NOT_FOUND:
      res.json({ title: "Not found", message: err.message, stack_trace: err.stack });
      break;

    default:
      // 🔥 Add this to handle unrecognized errors
      res.status(statusCode).json({
        title: "Unhandled Error",
        message: err.message,
        stack_trace: err.stack
      });
      break;
  }
};

module.exports = errorHandler;
