import WeatherServer from './WeatherServer'
import Config from '../config'

WeatherServer.start(Config)
  .then(() => console.log('Server started.'))
  .catch(error => {
    console.error('Error starting server.')
    console.error(error)
  })
