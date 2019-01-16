import WeatherServer from '../src/WeatherServer'
import path from 'path'
import request from 'request'
import { CITY_VIEW_WITH_COORDINATES, CITY_ID_AND_NAME } from './fixtures/Cities'
import { WEATHER_INFORMATION } from './fixtures/Weather'
import nock from 'nock'
import { SUCCESSFUL_RESPONSE } from './fixtures/OpenWeatherMap'

let testConfig

describe('weather server integration test', () => {
  beforeEach(async () => {
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

    await WeatherServer.start(testConfig)
  })

  afterEach(async () => {
    await WeatherServer.stop()
  })

  test('get city by id', async done => {
    expect.assertions(3)
    request('http://localhost:8080/cities/1283710', (error, response, body) => {
      expect(error).toBeFalsy()
      expect(response.statusCode).toEqual(200)
      expect(JSON.parse(body)).toEqual(CITY_VIEW_WITH_COORDINATES)

      done()
    })
  })

  test('get nearby cities', async done => {
    expect.assertions(3)
    request(
      'http://localhost:8080/cities?lat=28&lng=85.416664',
      (error, response, body) => {
        expect(error).toBeFalsy()
        expect(response.statusCode).toEqual(200)
        expect(JSON.parse(body)).toContainEqual(CITY_ID_AND_NAME)

        done()
      }
    )
  })

  test('get weather by city id', async done => {
    expect.assertions(3)
    request(
      'http://localhost:8080/cities/1283710/weather',
      (error, response, body) => {
        expect(error).toBeFalsy()
        expect(response.statusCode).toEqual(200)
        expect(JSON.parse(body)).toEqual(WEATHER_INFORMATION)

        done()
      }
    )
  })
})
