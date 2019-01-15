import WeatherServer from './WeatherServer'

WeatherServer.start()
  .then(() => console.log('Server started.'))
  .catch(error =>
    console.error('Error starting server:' + JSON.stringify(error))
  )
