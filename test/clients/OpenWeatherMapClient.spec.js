import OpenWeatherMapClient from '../../src/clients/OpenWeatherMapClient'
import config from '../../config'

test('get weather by city id', async () => {
  const client = new OpenWeatherMapClient(config.openweathermap.apiKey)

  const weather = await client.getWeather(2172797)

  expect(weather).toBeInstanceOf(Object)
  expect(Object.keys(weather).sort()).toEqual([
    'base',
    'clouds',
    'cod',
    'coord',
    'dt',
    'id',
    'main',
    'name',
    'sys',
    'visibility',
    'weather',
    'wind'
  ])
})
