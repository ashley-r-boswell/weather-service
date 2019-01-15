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
        console.error(error)
        return next(false)
      })
  }
}
