const axios = require('axios')

const getWeather = async (req , res) => {

    const city = req.params.city
    const apiKey = process.env.WEATHER_API_KEY

    try {

        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        const weatherData = {

            city: response.data.name,
            temperature: response.data.main.temp,
            humidity: response.data.main.humidity,
            description: response.data.weather[0].description,
            weatherCondition: response.data.weather[0].main
        }

        console.log(weatherData)

        res.status(200).json(weatherData);
    } catch (error) {
        res.status(500).json({ message: 'City not found or error fetching weather data', error: error.message });
      }

}

module.exports = { getWeather }