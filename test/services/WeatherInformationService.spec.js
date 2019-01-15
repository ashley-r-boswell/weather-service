import OpenWeatherMapClient from '../../src/clients/OpenWeatherMapClient'
import { SUCCESSFUL_RESPONSE } from '../fixtures/OpenWeatherMap'
import { WEATHER_INFORMATION } from '../fixtures/Weather'
import WeatherInformationService from '../../src/services/WeatherInformationService'

jest.mock('../../src/clients/OpenWeatherMapClient')

const CITY_ID = 1283710

test('get weather for city - all values correct', async () => {
  const clientMock = new OpenWeatherMapClient()
  clientMock.getWeather.mockResolvedValue(SUCCESSFUL_RESPONSE)
  const service = new WeatherInformationService(clientMock)

  const weatherInformation = await service.getWeatherForCity(CITY_ID)

  expect(weatherInformation).toEqual(WEATHER_INFORMATION)
  expect(clientMock.getWeather).toHaveBeenCalledTimes(1)
  expect(clientMock.getWeather).toHaveBeenCalledWith(CITY_ID)
})
