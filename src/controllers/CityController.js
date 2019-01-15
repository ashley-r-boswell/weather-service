export default class CityController {
  constructor(cityInformationService) {
    this.cityInformationService = cityInformationService
  }

  getCity(req, res, next) {
    try {
      const city = this.cityInformationService.getCity(
        parseInt(req.params.city_id)
      )
      res.send(city)
      return next()
    } catch (error) {
      console.error(error)
      return next(false)
    }
  }
}
