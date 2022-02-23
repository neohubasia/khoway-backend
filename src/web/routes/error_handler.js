const handleDuplicate = (err) => {
  let message;
  const keys = Object.keys(err.keyValue);
  if (keys) message = `${keys} already exists`;
  return { status: "ERROR", message };
};

const handleCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return { status: "ERROR", message };
};

const handleValidationError = (err) => {
  let message;
  const key = Object.keys(err.errors);
  message = `Invalid ${err.errors[key[0]].path}: ${err.errors[key[0]].value}.`;
  if (err.errors[key[0]] && err.errors[key[0]].properties) {
    message = err.errors[key[0]].properties.message;
  }
  return { status: "ERROR", message };
};

const handleError = (err) => {
  let handler_response = { status: "ERROR", message: "Something went wrong." };
  if (err.code === 11000) handler_response = handleDuplicate(err);
  if (err.name === "CastError") handler_response = handleCastError(err);
  if (err.name === "ValidationError")
    handler_response = handleValidationError(err);
  return handler_response;
};

module.exports = {
  handleError,
  handleDuplicate,
  handleCastError,
  handleValidationError,
};
