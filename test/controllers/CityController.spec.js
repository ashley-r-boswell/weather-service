import CityController from '../../src/controllers/CityController'
import CityInformationService from '../../src/services/CityInformationService'
import {
  CITY_VIEW_WITH_COORDINATES,
  CITY_ID_AND_NAME
} from '../fixtures/Cities'
import { BadRequestError } from 'restify-errors'

jest.mock('../../src/services/CityInformationService')

let mockRequest
let mockResponse
let mockNextCallback
let serviceMock

beforeEach(() => {
  mockRequest = {}
  mockResponse = { send: jest.fn(result => {}) }
  mockNextCallback = jest.fn(() => {})
  serviceMock = new CityInformationService()
})

describe('get city', () => {
  test('by id', () => {
    serviceMock.getCity.mockImplementation(cityId => CITY_VIEW_WITH_COORDINATES)
    const cityController = new CityController(serviceMock)
    mockRequest.params = { city_id: '5' }

    cityController.getCity(mockRequest, mockResponse, mockNextCallback)

    expect(serviceMock.getCity).toHaveBeenCalledTimes(1)
    expect(serviceMock.getCity).toHaveBeenCalledWith(5)
    expect(mockResponse.send).toHaveBeenCalledTimes(1)
    expect(mockResponse.send).toHaveBeenCalledWith(CITY_VIEW_WITH_COORDINATES)
    expect(mockNextCallback).toHaveBeenCalledTimes(1)
    expect(mockNextCallback).toHaveBeenCalledWith()
  })
})

describe('find nearby cities', () => {
  test('by latitude and longitude', () => {
    serviceMock.findNearbyCities.mockImplementation((latitude, longitude) => [
      CITY_ID_AND_NAME
    ])
    const cityController = new CityController(serviceMock)
    mockRequest.query = { lat: '21', lng: '22' }

    cityController.findNearbyCities(mockRequest, mockResponse, mockNextCallback)

    expect(serviceMock.findNearbyCities).toHaveBeenCalledTimes(1)
    expect(serviceMock.findNearbyCities).toHaveBeenCalledWith(21, 22)
    expect(mockResponse.send).toHaveBeenCalledTimes(1)
    expect(mockResponse.send).toHaveBeenCalledWith([CITY_ID_AND_NAME])
    expect(mockNextCallback).toHaveBeenCalledTimes(1)
    expect(mockNextCallback).toHaveBeenCalledWith()
  })

  test('latitude missing', () => {
    serviceMock.findNearbyCities.mockImplementation((latitude, longitude) => [
      CITY_ID_AND_NAME
    ])
    const cityController = new CityController(serviceMock)
    mockRequest.query = { lng: '22' }

    cityController.findNearbyCities(mockRequest, mockResponse, mockNextCallback)

    expect(serviceMock.findNearbyCities).not.toBeCalled()
    expect(mockResponse.send).not.toBeCalled()
    expect(mockNextCallback).toHaveBeenCalledTimes(1)
    expect(mockNextCallback).toHaveBeenCalledWith(
      new BadRequestError({ code: 'BadRequestError' }, 'lat/lng required')
    )
  })

  test('longitude missing', () => {
    serviceMock.findNearbyCities.mockImplementation((latitude, longitude) => [
      CITY_ID_AND_NAME
    ])
    const cityController = new CityController(serviceMock)
    mockRequest.query = { lat: '21' }

    cityController.findNearbyCities(mockRequest, mockResponse, mockNextCallback)

    expect(serviceMock.findNearbyCities).not.toBeCalled()
    expect(mockResponse.send).not.toBeCalled()
    expect(mockNextCallback).toHaveBeenCalledTimes(1)
    expect(mockNextCallback).toHaveBeenCalledWith(
      new BadRequestError({ code: 'BadRequestError' }, 'lat/lng required')
    )
  })

  test('latitude and longitude missing', () => {
    serviceMock.findNearbyCities.mockImplementation((latitude, longitude) => [
      CITY_ID_AND_NAME
    ])
    const cityController = new CityController(serviceMock)

    cityController.findNearbyCities(mockRequest, mockResponse, mockNextCallback)

    expect(serviceMock.findNearbyCities).not.toBeCalled()
    expect(mockResponse.send).not.toBeCalled()
    expect(mockNextCallback).toHaveBeenCalledTimes(1)
    expect(mockNextCallback).toHaveBeenCalledWith(
      new BadRequestError({ code: 'BadRequestError' }, 'lat/lng required')
    )
  })
})
