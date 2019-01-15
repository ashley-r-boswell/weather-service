import { NotFoundError, BadRequestError } from 'restify-errors'

export default class CityController {
  constructor(cityInformationService) {
    this.cityInformationService = cityInformationService
  }

  getCity(req, res, next) {
    try {
      const city = this.cityInformationService.getCity(
        parseInt(req.params.city_id)
      )
      if (!city) {
        return next(new NotFoundError({ code: 'NotFoundError' }, 'not found'))
      }
      res.send(city)
      return next()
    } catch (error) {
      console.error(error)
      return next(false)
    }
  }

  findNearbyCities(req, res, next) {
    try {
      if (!req.query || !req.query.lat || !req.query.lng) {
        return next(
          new BadRequestError({ code: 'BadRequestError' }, 'lat/lng required')
        )
      }
      const cities = this.cityInformationService.findNearbyCities(
        parseFloat(req.query.lat),
        parseFloat(req.query.lng)
      )
      res.send(cities)
      return next()
    } catch (error) {
      console.error(error)
      return next(error)
    }
  }
}
