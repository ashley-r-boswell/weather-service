import { CITY } from '../fixtures/Cities'
import CityInformationService from '../../src/services/CityInformationService'

test('get city by id - correct', async () => {
  const service = new CityInformationService(
    './test/resources/tiny.city.list.json.gz'
  )

  await service.init()

  const result = service.getCity(1283710)

  expect(result).toEqual(CITY)
})

test('find nearby cities - finds exact match', async () => {
  const service = new CityInformationService(
    './test/resources/tiny.city.list.json.gz'
  )

  await service.init()

  const nearbyCities = service.findNearbyCities(28, 85.416664)

  expect(nearbyCities).toContainEqual(CITY)
})

test('find nearby cities - finds nearby match', async () => {
  const service = new CityInformationService(
    './test/resources/tiny.city.list.json.gz'
  )

  await service.init()

  const nearbyCities = service.findNearbyCities(28.085, 85.42)

  expect(nearbyCities).toContainEqual(CITY)
})
