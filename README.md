# A REST-based weather service - trial task

The goal of your case is to develop a small REST based service to retrieve information about the weather in different cities. The service should be powered by node.js and utilize the data from openweathermap.org. The list of available cities can be found [here](http://bulk.openweathermap.org/sample/city.list.json.gz).
Besides the requirement to use node.js, you are free to use any library or tool you need to develop the service.

Feel encouraged to dockerize your test and add a meaningful set of tests.

## Building and Running

### First things first

To run anything you need to provide your OpenWeatherMap.org api key. Do this by creating the file `.env` at the root of the project and fill it with

```
OPEN_WEATHER_MAP_API_KEY=yourapikey
```

### Starting the server

```
npm start
```

This will locally run the tests, transpile the ES6 code and start the server on port `8080`

### Running the dockerized tests

Run the following commands to build the production docker container, build a testing docker container and finally to run the test container.

```
npm dockerize
npm dockerize-tests
npm test-container
```

## Routes

The following routes should be provided by the service. All the routes should deliver the response as json and indicate the response type with the proper content type.

### `GET /cities?lat={latitude}&lng={longitude}`

List the available cities around the specified latitude/longitude within a radius of 10 kilometers Example: http://localhost:8080/cities?lat=49.48&lng=8.46

Returns:

- `HTTP 200 Ok` with body:

```js
[
  {"id":2873891,"name":"Mannheim"}, {"id":6555232,"name":"Altrip"}, ...
]
```

- `HTTP 400 Bad Request` if parameters are missing:

```js
{
  "code":"BadRequestError",
  "message":"lat/lng required"
}
```

### `GET /cities/{city_id}`

Retrieve the details for a city (by city_id) Example: http://localhost:8080/cities/2873891

Returns:

- `HTTP 200 Ok` with body:

```js
{
  "id":2873891,
  "name":"Mannheim", "lat":49.488331, "lng":8.46472
}
```

- `HTTP 404 Not Found` if the city_id was not found:

```js
{
  "code":"NotFoundError",
  "message":"not found"
}
```

### `GET /cities/{city_id}/weather`

Retrieve the weather data for a city (by city_id) Example: http://localhost:8080/cities/2873891/weather

Returns:

- `HTTP 200 Ok` with body:

```js
{
  "type": "Clear",
  "type_description": "clear sky",
  "sunrise": "2016-08-23T08:00:00.000Z",
  "sunset": "2016-08-23T22:00:00.000Z",
  "temp": 29.72,
  "temp_min": 26.67,
  "temp_max": 35,
  "pressure": 1026,
  "humidity": 36,
  "clouds_percent": 0,
  "wind_speed": 1.5
}
```

- `HTTP 404 Not Found` if the city_id was not found:

```js
{
  "code":"NotFoundError",
  "message":"not found"
}
```

### Getting started

The following libraries and tools could be helpful to implement the service:

- restify (http://restify.com/) ­ as the baseline to implement the REST web service
- request (https://github.com/request/request) ­ to make requests to the http://openweathermap.org/ API
- postman (https://www.getpostman.com/) or curl to test the service
