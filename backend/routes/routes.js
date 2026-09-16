const express = require('express');

//import controllers
const { getWeatherData, searchCity } = require('../controllers/weatherController');

//create a router
const router = express.Router();

//define routes
router.get('/', (req,res) => {
    res.send("Welcome to Cloudio!")
})

router.post('/search', async (req, res) => {

    console.log(req.body);

    const cityName = req.body.city;


    const geo = await searchCity(cityName);

    res.json(geo);
});

router.get('/results', (req, res) => {
    getWeatherData(req, res);
});

//export routes
module.exports = router;