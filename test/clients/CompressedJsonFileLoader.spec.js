import CompressedJsonFileLoader from '../../src/clients/CompressedJsonFileLoader'

test('load compressed json file', async () => {
  const loader = new CompressedJsonFileLoader()

  const result = await loader.parseFile(
    './test/resources/tiny.city.list.json.gz'
  )

  expect(result.length).toEqual(28)
})

test('file does not exist - error thrown', async () => {
  const loader = new CompressedJsonFileLoader()

  await expect(
    loader.parseFile('./test/resources/non-existing-file.json.gz')
  ).rejects.toThrowError(/Error loading file/)
})
