import AppError from "../utils/AppError.js";

export const notFound = (req, res, next) =>
  next(new AppError(404, `Route not found: ${req.method} ${req.originalUrl}`));

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  const isProd = process.env.NODE_ENV === "production";
  let status = err.statusCode || 500;
  let message = err.message || "Something went wrong";

  if (err.name === "CastError") {
    status = 404;
    message = "Resource not found";
  } else if (err.name === "ValidationError") {
    status = 400;
    message = Object.values(err.errors).map((e) => e.message).join(", ");
  } else if (err.code === 11000) {
    status = 409;
    message = "That record already exists";
  } else if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    status = 401;
    message = "Session expired. Please log in again";
  } else if (err.name === "MulterError") {
    status = 400;
    message = err.code === "LIMIT_FILE_SIZE" ? "Image must be under 2 MB" : err.message;
  }

  if (status === 500) {
    console.error(err);
    if (isProd) message = "Something went wrong";
  }

  res.status(status).json({ message, ...(!isProd && { stack: err.stack }) });
};
