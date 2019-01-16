import OpenWeatherMapClientError from '../clients/OpenWeatherMapClientError'
import { NotFoundError } from 'restify-errors'

export default class WeatherController {
  constructor(weatherInformationService) {
    this.weatherInformationService = weatherInformationService
  }

  getWeatherForCity(req, res, next) {
    return this.weatherInformationService
      .getWeatherForCity(req.params.city_id)
      .then(weather => {
        res.send(weather)
        return next()
      })
      .catch(error => {
        if (
          error instanceof OpenWeatherMapClientError &&
          error.statusCode === 404 &&
          error.responseBody &&
          error.responseBody.message === 'city not found'
        ) {
          return next(new NotFoundError({ code: 'NotFoundError' }, 'not found'))
        }
        return next(error)
      })
  }
}
