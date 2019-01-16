import WeatherServer from '../src/WeatherServer'
import path from 'path'
import request from 'request'
import { CITY_VIEW_WITH_COORDINATES } from './fixtures/Cities'
import { WEATHER_INFORMATION } from './fixtures/Weather'
import nock from 'nock'
import { SUCCESSFUL_RESPONSE } from './fixtures/OpenWeatherMap'

let testConfig

describe('weather server integration test', () => {
  beforeEach(() => {
    testConfig = {
      openweathermap: {
        apiKey: 'myAppId'
      },
      cities: {
        relativeFilePath: path.join(
          '..',
          'test',
          'resources',
          'tiny.city.list.json.gz'
        )
      }
    }

    nock('https://api.openweathermap.org')
      .filteringPath(/appid=.*/g, 'appid=myAppId')
      .get('/data/2.5/weather?id=1283710&appid=myAppId')
      .reply(200, SUCCESSFUL_RESPONSE)
  })

  test('get city by id', async done => {
    await WeatherServer.start(testConfig)

    expect.assertions(3)
    request('http://localhost:8080/cities/1283710', (error, response, body) => {
      expect(error).toBeFalsy()
      expect(response.statusCode).toEqual(200)
      expect(JSON.parse(body)).toEqual(CITY_VIEW_WITH_COORDINATES)

      WeatherServer.stop().then(done)
    })
  })

  test('get weather by city id', async done => {
    await WeatherServer.start(testConfig)

    expect.assertions(3)
    request(
      'http://localhost:8080/cities/1283710/weather',
      (error, response, body) => {
        expect(error).toBeFalsy()
        expect(response.statusCode).toEqual(200)
        expect(JSON.parse(body)).toEqual(WEATHER_INFORMATION)

        WeatherServer.stop().then(done)
      }
    )
  })
})
