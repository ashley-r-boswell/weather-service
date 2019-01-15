export default class OpenWeatherMapClientError extends Error {
  constructor(message, statusCode, responseBody) {
    super(message)
    this.statusCode = statusCode
    this.responseBody = responseBody
  }
}
