import WeatherServer from '../src/WeatherServer'
import Config from '../config'
import path from 'path'
import request from 'request'
import { CITY_VIEW_WITH_COORDINATES } from './fixtures/Cities'

describe('weather server integration test', () => {
  test('get city by id', async done => {
    Config.cities.relativeFilePath = path.join(
      '..',
      'test',
      'resources',
      'tiny.city.list.json.gz'
    )
    await WeatherServer.start(Config)

    expect.assertions(3)
    request('http://localhost:8080/cities/1283710', (error, response, body) => {
      expect(error).toBeFalsy()
      expect(response.statusCode).toEqual(200)
      expect(JSON.parse(body)).toEqual(CITY_VIEW_WITH_COORDINATES)

      WeatherServer.stop().then(done)
    })
  })
})
