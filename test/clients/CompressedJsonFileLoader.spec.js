import CompressedJsonFileLoader from '../../src/clients/CompressedJsonFileLoader'

import { CITY } from '../fixtures/Cities'

test('load compressed json file', async () => {
  const loader = new CompressedJsonFileLoader(
    './test/resources/tiny.city.list.json.gz'
  )

  await loader.init()

  const result = loader.getCity(1283710)

  expect(result).toEqual(CITY)
})
