import restify from 'restify'
import WeatherController from './controllers/WeatherController'

class WeatherServer {
  async start() {
    this.buildServer()
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

  configureRoutes() {
    this.server.get('/echo/:name', (req, res, next) => {
      res.send(req.params)
      return next()
    })
    this.server.get('/cities/:city_id/weather', (req, res, next) =>
      WeatherController.getWeatherForCity(req, res, next)
    )
  }

  async listen() {
    return new Promise(resolve => this.server.listen(8080, resolve))
  }
}

export default new WeatherServer()
