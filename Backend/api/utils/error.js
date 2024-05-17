//its a custom function to handle the error
//usng this function we create custom error, example ->password length whould be minnimum of 5, or minimum username length such are the custom errors which we can create
const errorHandler = (statuscode, message) => {
  const error = new Error();
  error.statusCode = statuscode;
  error.message = message;
  return error;
};

export default errorHandler;
