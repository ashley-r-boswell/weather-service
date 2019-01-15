import CompressedJsonFileLoader from '../clients/CompressedJsonFileLoader'
import _ from 'lodash'
import haversine from 'haversine'

const NEARBY_RADIUS = 10000
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

  findNearbyCities(latitude, longitude) {
    return _.filter(this.cities, city => {
      const metersToCity = haversine(
        { latitude: latitude, longitude: longitude },
        { latitude: city.coord.lat, longitude: city.coord.lon },
        { unit: 'meter' }
      )
      return metersToCity <= NEARBY_RADIUS
    })
  }
}
