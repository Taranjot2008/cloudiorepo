//searching the coords for the city name
const searchCity = async (cityName) => {
    try {
        
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${cityName}&key=${process.env.GOOGLE_API_KEY}`);

        const data = await response.json();

        const { lat, lng } = data.results[0].geometry.location;


        return { lat, lng };
    }
    catch (err) {
        console.log("Error with API Call", err)
        res.status(500).send("Error fetching city coordinates");
    }
}


const getWeatherData = async (req, res) => {
    try {
        if (!req.query.lat || !req.query.lng) {
            res.send("Welcome to Cloudio!")
        }

        const fetchData = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${req.query.lat}&lon=${req.query.lng}&appid=${process.env.OPENWEATHER_API_KEY}`
        );

        const text = await fetchData.text();
        const data = JSON.parse(text);

        res.send(data);
    } catch (err) {
        console.error("Weather API error:", err);
        res.status(500).send("Error fetching weather data");
    }
};

module.exports = { getWeatherData, searchCity };