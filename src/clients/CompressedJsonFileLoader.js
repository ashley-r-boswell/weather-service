import JSONStream from 'JSONStream'
import es from 'event-stream'
import fs from 'fs'
import zlib from 'zlib'

export default class CompressedJsonFileLoader {
  async parseFile(fileName) {
    return new Promise((resolve, reject) => {
      fs.createReadStream(fileName)
        .on('error', () =>
          reject(new Error('Error loading file. fileName: ' + fileName))
        )
        .pipe(zlib.createGunzip())
        .pipe(JSONStream.parse('*'))
        .pipe(
          es.writeArray((err, array) => {
            if (err) {
              reject(err)
            } else {
              resolve(array)
            }
          })
        )
    })
  }
}
