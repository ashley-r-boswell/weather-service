import request from 'request'
import OpenWeatherMapClientError from './OpenWeatherMapClientError'

export default class OpenWeatherMapClient {
  constructor(apiKey) {
    this.apiKey = apiKey
  }

  async getWeather(cityId) {
    return new Promise((resolve, reject) =>
      request(
        `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${
          this.apiKey
        }&units=metric`,
        (error, response, body) => {
          if (error) {
            reject(
              new OpenWeatherMapClientError(
                'Error occurred while requesting weather:' +
                  JSON.stringify(error)
              )
            )
          } else if (response) {
            if (response.statusCode === 200) {
              resolve(JSON.parse(body))
            } else {
              reject(
                new OpenWeatherMapClientError(
                  'Unexpected response code when requesting weather:',
                  response.statusCode,
                  JSON.parse(body)
                )
              )
            }
          } else {
            reject(
              new OpenWeatherMapClientError(
                'Unknown error occurred while requesting weather.'
              )
            )
          }
        }
      )
    )
  }
}
