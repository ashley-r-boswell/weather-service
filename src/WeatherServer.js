import restify from 'restify'
import WeatherController from './controllers/WeatherController'
import WeatherInformationService from './services/WeatherInformationService'
import OpenWeatherMapClient from './clients/OpenWeatherMapClient'
import Config from '../config'

class WeatherServer {
  async start() {
    this.buildServer()
    this.buildControllers()
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

  buildControllers() {
    this.weatherController = new WeatherController(
      new WeatherInformationService(
        new OpenWeatherMapClient(Config.openweathermap.apiKey)
      )
    )
  }

  configureRoutes() {
    this.server.get('/echo/:name', (req, res, next) => {
      res.send(req.params)
      return next()
    })
    this.server.get('/cities/:city_id/weather', (req, res, next) =>
      this.weatherController.getWeatherForCity(req, res, next)
    )
  }

  async listen() {
    return new Promise(resolve => this.server.listen(8080, resolve))
  }
}

export default new WeatherServer()
