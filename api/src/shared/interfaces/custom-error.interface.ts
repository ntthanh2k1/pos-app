interface CustomError extends Error {
  methodName?: string;
}

export default CustomError;
