import dotenv from 'dotenv'

dotenv.config()

module.exports = {
  openweathermap: {
    apiKey: process.env.OPEN_WEATHER_MAP_API_KEY
  }
}
