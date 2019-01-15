import CompressedJsonFileLoader from '../clients/CompressedJsonFileLoader'
import _ from 'lodash'

export default class CityInformationService {
  constructor(fileName) {
    this.fileName = fileName
    this.loader = new CompressedJsonFileLoader()
  }

  async init() {
    this.cities = await this.loader.parseFile(this.fileName)
  }

  getCity(cityId) {
    return _.find(this.cities, city => city.id === cityId)
  }
}
