import WeatherController from '../../src/controllers/WeatherController'
import WeatherInformationService from '../../src/services/WeatherInformationService'
import { WEATHER_INFORMATION } from '../fixtures/Weather'
import OpenWeatherMapClientError from '../../src/clients/OpenWeatherMapClientError'
import { NotFoundError } from 'restify-errors'

jest.mock('../../src/services/WeatherInformationService')

let mockRequest
let mockResponse
let mockNextCallback
let serviceMock

beforeEach(() => {
  mockRequest = {}
  mockResponse = { send: jest.fn(result => {}) }
  mockNextCallback = jest.fn(() => {})
  serviceMock = new WeatherInformationService()
})

describe('get weather', () => {
  test('by city id', async () => {
    serviceMock.getWeatherForCity.mockResolvedValue(WEATHER_INFORMATION)
    const weatherController = new WeatherController(serviceMock)
    mockRequest.params = { city_id: '5' }

    await weatherController.getWeatherForCity(
      mockRequest,
      mockResponse,
      mockNextCallback
    )

    expect(serviceMock.getWeatherForCity).toHaveBeenCalledTimes(1)
    expect(serviceMock.getWeatherForCity).toHaveBeenCalledWith('5')
    expect(mockResponse.send).toHaveBeenCalledTimes(1)
    expect(mockResponse.send).toHaveBeenCalledWith(WEATHER_INFORMATION)
    expect(mockNextCallback).toHaveBeenCalledTimes(1)
    expect(mockNextCallback).toHaveBeenCalledWith()
  })

  test('by unknown city id', async () => {
    serviceMock.getWeatherForCity.mockImplementation(() =>
      Promise.reject(
        new OpenWeatherMapClientError(
          'Unexpected response code when requesting weather:',
          404,
          { message: 'city not found' }
        )
      )
    )
    const weatherController = new WeatherController(serviceMock)
    mockRequest.params = { city_id: '5' }

    await weatherController.getWeatherForCity(
      mockRequest,
      mockResponse,
      mockNextCallback
    )

    expect(serviceMock.getWeatherForCity).toHaveBeenCalledTimes(1)
    expect(serviceMock.getWeatherForCity).toHaveBeenCalledWith('5')
    expect(mockResponse.send).not.toBeCalled()
    expect(mockNextCallback).toHaveBeenCalledTimes(1)
    expect(mockNextCallback).toHaveBeenCalledWith(
      new NotFoundError({ code: 'NotFoundError' }, 'not found')
    )
  })
})
