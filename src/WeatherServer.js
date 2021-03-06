import restify from 'restify'
import WeatherController from './controllers/WeatherController'
import WeatherInformationService from './services/WeatherInformationService'
import OpenWeatherMapClient from './clients/OpenWeatherMapClient'
import CityController from './controllers/CityController'
import CityInformationService from './services/CityInformationService'
import path from 'path'

class WeatherServer {
  async start(config) {
    this.config = config
    this.buildServer()
    await this.buildControllers()
    this.configureRoutes()
    return this.listen()
  }

  buildServer() {
    this.server = restify.createServer({
      name: 'weather-service',
      version: '1.0.0'
    })

    this.server.use(restify.plugins.acceptParser(this.server.acceptable))
    this.server.use(restify.plugins.queryParser())
    this.server.use(restify.plugins.bodyParser())
  }

  async buildControllers() {
    this.weatherController = new WeatherController(
      new WeatherInformationService(
        new OpenWeatherMapClient(this.config.openweathermap.apiKey)
      )
    )
    const cityInformationService = new CityInformationService(
      path.join(__dirname, this.config.cities.relativeFilePath)
    )
    await cityInformationService.init()
    this.cityController = new CityController(cityInformationService)
  }

  configureRoutes() {
    this.server.get('/cities/:city_id/weather', (req, res, next) =>
      this.weatherController.getWeatherForCity(req, res, next)
    )
    this.server.get('/cities/:city_id', (req, res, next) =>
      this.cityController.getCity(req, res, next)
    )
    this.server.get('/cities', (req, res, next) =>
      this.cityController.findNearbyCities(req, res, next)
    )
  }

  async listen() {
    return new Promise(resolve => this.server.listen(8080, resolve))
  }

  async stop() {
    return new Promise(resolve => this.server.close(resolve))
  }
}

export default new WeatherServer()
