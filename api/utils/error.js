export const errorHandler = (statusCode, Message)=>{
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    return error;
}