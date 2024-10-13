const express = require('express');
const axios = require('axios');
const app = express();

const API_KEY = '8872183c1965ce991860e4dfb49c3b7a';  

app.use(express.static('public'));  


app.get('/weather', async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.send({ error: 'Please provide a city name' });
    }

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        const response = await axios.get(url);
        const data = response.data;
         
         const weather = {
            city: data.name,
            temperature: data.main.temp,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            sunrise: data.sys.sunrise,   
            sunset: data.sys.sunset,     
 
        };

        res.send(weather);
    } catch (error) {
        console.error('Error fetching weather data:', error.response ? error.response.data : error.message);
        res.send({ error: 'Enter correct City name' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
