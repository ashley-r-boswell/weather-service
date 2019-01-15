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
