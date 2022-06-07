const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=43ddb4cdfdde030d89070f06c7f63e1e&query=${latitude},${longitude}&units=f`;

  request(url, { json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location.", undefined);
    } else {
      const { temperature, feelslike, weather_descriptions } = body.current;

      callback(undefined, {
        temperature,
        feelslike,
        weatherDescription: weather_descriptions[0],
        forecast: `${weather_descriptions[0]}. It is currently ${temperature} degrees F out. It feels like ${feelslike} degress F out `,
      });
    }
  });
};

module.exports = forecast;
