import request from 'request'

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
              new Error(
                'Error occurred while requesting weather:' +
                  JSON.stringify(error)
              )
            )
          } else if (response) {
            if (response.statusCode === 200) {
              resolve(JSON.parse(body))
            } else {
              reject(
                new Error(
                  'Unexpected response code when requesting weather:' +
                    JSON.stringify(response.statusCode)
                )
              )
            }
          } else {
            reject(
              new Error('Unknown error occurred while requesting weather.')
            )
          }
        }
      )
    )
  }
}
