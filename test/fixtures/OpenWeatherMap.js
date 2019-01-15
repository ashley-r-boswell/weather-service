const SUCCESSFUL_RESPONSE = {
  coord: {
    lon: 145.77,
    lat: -16.92
  },
  weather: [
    {
      id: 520,
      main: 'Rain',
      description: 'light intensity shower rain',
      icon: '09n'
    }
  ],
  base: 'stations',
  main: {
    temp: 298.15,
    pressure: 1010,
    humidity: 94,
    temp_min: 298.15,
    temp_max: 298.15
  },
  visibility: 10000,
  wind: {
    speed: 5.1,
    deg: 160
  },
  clouds: {
    all: 75
  },
  dt: 1547550540,
  sys: {
    type: 1,
    id: 9490,
    message: 0.0062,
    country: 'AU',
    sunrise: 1547495721,
    sunset: 1547542621
  },
  id: 2172797,
  name: 'Cairns',
  cod: 200
}

export { SUCCESSFUL_RESPONSE }
