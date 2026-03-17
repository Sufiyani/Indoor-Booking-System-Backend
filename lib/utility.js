// Backend/lib/utility.js

export class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    // Maintain proper stack trace (for debugging)
    Error.captureStackTrace(this, this.constructor);
  }
}
