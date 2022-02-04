class CustomErrorHandler extends Error {
  constructor(status, msg) {
    super();
    this.status = status;
    this.message = msg;
  }
  static alreadyExist(message) {
    return new CustomErrorHandler(409, message);
  }

  static wrongCreditials(message) {
    return new CustomErrorHandler(500, message);
  }
}
export default CustomErrorHandler;
