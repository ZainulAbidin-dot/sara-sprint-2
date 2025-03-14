/**
 * @class HttpError
 * @description This class is used for creating an instance of an HTTP error with a custom status code, message, and data.
 */
class HttpError extends Error {
  statusCode: number;
  error?: Record<string, string>;

  constructor({
    name,
    statusCode,
    message,
    error,
  }: {
    name: string;
    statusCode: number;
    message: string;
    error?: Record<string, string>;
  }) {
    super(message);
    this.message = message;
    this.name = name;
    this.statusCode = statusCode;
    if (error) this.error = error;
    Error.captureStackTrace(this, HttpError);
  }
}

export default HttpError;
