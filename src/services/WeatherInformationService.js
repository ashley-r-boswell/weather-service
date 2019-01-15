import moment from 'moment'

const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSS[Z]'

export default class WeatherInformationService {
  constructor(weatherClient) {
    this.weatherClient = weatherClient
  }

  async getWeatherForCity(cityId) {
    const weatherForCity = await this.weatherClient.getWeather(cityId)
    return {
      type: weatherForCity.weather[0].main,
      type_description: weatherForCity.weather[0].description,
      sunrise: moment
        .utc(weatherForCity.sys.sunrise, 'X')
        .format(DATE_TIME_FORMAT),
      sunset: moment
        .utc(weatherForCity.sys.sunset, 'X')
        .format(DATE_TIME_FORMAT),
      temp: weatherForCity.main.temp,
      temp_min: weatherForCity.main.temp_min,
      temp_max: weatherForCity.main.temp_max,
      pressure: weatherForCity.main.pressure,
      humidity: weatherForCity.main.humidity,
      clouds_percent: weatherForCity.clouds.all,
      wind_speed: weatherForCity.wind.speed
    }
  }
}
