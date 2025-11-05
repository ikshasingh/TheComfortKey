// utils/ExpressError.js to display msg along wiyh code
class ExpressError extends Error {
    constructor(message, statusCode) {
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
}
module.exports = ExpressError;
// utils/ExpressError.js