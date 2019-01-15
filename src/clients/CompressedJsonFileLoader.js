import _ from 'lodash'
import JSONStream from 'JSONStream'
import es from 'event-stream'
import fs from 'fs'
import zlib from 'zlib'

export default class CompressedJsonFileLoader {
  constructor(fileName) {
    this.fileName = fileName
  }

  async init() {
    this.cities = await this.parseFile(this.fileName)
  }

  async parseFile(fileName) {
    return new Promise((resolve, reject) => {
      fs.createReadStream(fileName)
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

  getCity(cityId) {
    return _.find(this.cities, city => city.id === cityId)
  }
}
