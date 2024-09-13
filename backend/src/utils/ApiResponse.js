class ApiResponse {
  constructor(statusCode, data, message = "success", success = true, isAuthenticated = false) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = success;
    this.isAuthenticated = isAuthenticated;
  }
}
module.exports = ApiResponse;
