var dotenv = require('dotenv')
var path = require('path')

dotenv.config()

module.exports = {
  openweathermap: {
    apiKey: process.env.OPEN_WEATHER_MAP_API_KEY
  },
  cities: {
    relativeFilePath: path.join('..', 'resources', 'city.list.json.gz')
  }
}
