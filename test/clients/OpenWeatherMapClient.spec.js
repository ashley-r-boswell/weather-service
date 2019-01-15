import OpenWeatherMapClient from '../../src/clients/OpenWeatherMapClient'
import config from '../../config'
import nock from 'nock'
import {
  SUCCESSFUL_RESPONSE,
  UNSUCCESSFUL_RESPONSE
} from '../fixtures/OpenWeatherMap'

test('get weather by city id', async () => {
  nock('https://api.openweathermap.org')
    .filteringPath(/appid=.*/g, 'appid=myAppId')
    .get('/data/2.5/weather?id=2172797&appid=myAppId')
    .reply(200, SUCCESSFUL_RESPONSE)
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

test('unknown city id - error thrown', async () => {
  nock('https://api.openweathermap.org')
    .filteringPath(/appid=.*/g, 'appid=myAppId')
    .get('/data/2.5/weather?id=0&appid=myAppId')
    .reply(400, UNSUCCESSFUL_RESPONSE)
  const client = new OpenWeatherMapClient(config.openweathermap.apiKey)

  await expect(client.getWeather(0)).rejects.toThrowError(
    /Unexpected response code/
  )
})

test('unknown city id - error thrown', async () => {
  nock('https://api.openweathermap.org')
    .filteringPath(/appid=.*/g, 'appid=myAppId')
    .get('/data/2.5/weather?id=0&appid=myAppId')
    .replyWithError('timeout')
  const client = new OpenWeatherMapClient(config.openweathermap.apiKey)

  await expect(client.getWeather(0)).rejects.toThrowError(/Error occurred/)
})
