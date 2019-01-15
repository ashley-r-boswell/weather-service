import restify from 'restify'

class WeatherServer {
  async start() {
    const server = restify.createServer({
      name: 'weather-service',
      version: '1.0.0'
    })

    server.use(restify.plugins.acceptParser(server.acceptable))
    server.use(restify.plugins.queryParser())
    server.use(restify.plugins.bodyParser())

    server.get('/echo/:name', (req, res, next) => {
      res.send(req.params)
      return next()
    })

    return new Promise(resolve => server.listen(8080, resolve))
  }
}

export default new WeatherServer()