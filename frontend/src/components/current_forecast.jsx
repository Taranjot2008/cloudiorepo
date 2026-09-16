import {
    clearDay,
    clearNight,
    cloudyDay,
    cloudyNight,
    pm_cloudyDay,
    pm_cloudyNight,
    rainyDay,
    rainyNight,
    rainy,
    snowDay,
    snowNight,
    tsDay,
    tsNight
} from "../assets/index"

export default function CurrentForecast({ weatherData }) {

    const weatherMap = {
        "01d": {
            iconType: clearDay,
            message: "Clear skies, the sun is shining bright!"
        },
        "01n": {
            iconType: clearNight,
            message: "Clear skies, the moon is in a good mood!"
        },
        "02d": {
            iconType: pm_cloudyDay,
            message: "Partly cloudy, the sun is playing hide and seek"
        },
        "02n": {
            iconType: pm_cloudyNight,
            message: "Partly cloudy, the moon is playing hide and seek"
        },
        "03d": {
            iconType: cloudyDay,
            message: "Cloudy mood, visibility is optional"
        },
        "03n": {
            iconType: cloudyNight,
            message: "Cloudy mood, visibility is optional"
        },
        "04d": {
            iconType: cloudyDay,
            message: "Cloudy with a chance of confusion"
        },
        "04n": {
            iconType: cloudyNight,
            message: "Cloudy with a chance of confusion"
        },
        "09d": {
            iconType: rainyDay,
            message: "Rainy day, the clouds are crying"
        },
        "09n": {
            iconType: rainyNight,
            message: "Rainy night, the clouds are crying"
        },
        "10d": {
            iconType: rainy,
            message: "Rainy day, the clouds are crying"
        },
        "10n": {
            iconType: rainy,
            message: "Rainy night, the clouds are crying"
        },
        "11d": {
            iconType: tsDay,
            message: "Thunderstorm — the sky is throwing a tantrum"
        },
        "11n": {
            iconType: tsNight,
            message: "Thunderstorm — the sky is throwing a tantrum"
        },
        "13d": {
            iconType: snowDay,
            message: "Snowy day, the clouds are having a snowball fight"
        },
        "13n": {
            iconType: snowNight,
            message: "Snowy night, the clouds are having a snowball fight"
        }
    };



    const getPrecipation = (precipitationAmount) => {
        
        if (!precipitationAmount) {
            return "None"
        }
        
        else if (precipitationAmount > 0 && precipitationAmount <= 3) {
            return "Light"
        }
        else if (precipitationAmount >= 4 && precipitationAmount <= 6) {
            return "Moderate"
        }
        else {
            return "Heavy"
        }
    }

    const getProperTime = (timepoint) => {
        const currentTime = new Date();
        const forecastTime = new Date(timepoint * 1000);
        const hoursDifference = Math.floor((forecastTime - currentTime) / (1000 * 60 * 60));
        
        return hoursDifference;
    }

    const getWindSpeed = (windSpeedValue) => {
        const windSpeedKmh = windSpeedValue * 3.6;
        return Math.round(windSpeedKmh);
    }

    const getWindDirection = (windDirection) => {
        const directions = ["N","NE","E","SE","S","SW","W","NW"]

        //calculate the direction
        const index = Math.round(windDirection / 45) % 8;
        return directions[index]
    }

    const getWeatherInfo = (icon) => {
        for (const key in weatherMap) {
            if (key === icon) {
                return weatherMap[key];
            }
        }

        return null;
    }


    const weather = weatherData;

    const city = localStorage.getItem('city');

    const timepoint = weather ? getProperTime(weather.list[0].dt) : null;

    const cloudCoverValue = weather ? weather.list[0].clouds.all : null;

    const windSpeedValue = weather ? getWindSpeed(weather.list[0].wind.speed) : null;

    const weatherIcon = getWeatherInfo(weather?.list?.[0]?.weather?.[0]?.icon)?.iconType || null;

    const weatherMessage = getWeatherInfo(weather?.list[0]?.weather[0]?.icon)?.message || null;

    const windDirection = getWindDirection(weather?.list[0]?.wind?.deg) || null;

    const precipitationAmount = weather ? getPrecipation(weather.list[0].rain ? weather.list[0].rain['3h'] : 0) : null;

    return (

        <section className="results-section mt-30 py-20 px-8 flex flex-col gap-12 max-lg:mt-10 max-lg:p-0 max-lg:w-[80vw]">

            <h1 className="city-heading text-6xl font-bold font-(family-name:--font-h) text-purple-500">{city}</h1>


            {weather && 
                <div className="current-forecast w-[60vw] flex flex-col items-center rounded-xl py-10 px-18 max-lg:w-full max-sm:p-6 lg:px-10">
                    
                    <section className="top-section w-full flex items-center justify-between mb-18">

                        <div className="logo_description flex flex-col gap-4">
                            <img src={weatherIcon} alt="Weather Icon" className="w-36 aspect-square max-sm:w-20" />
                            <p className="img_description text-white font-(family-name:--font-link) text-[17px] font-bold mt-4">{weatherMessage}</p>
                        </div>

                        <div className="details_div flex h-full flex-col items-center gap-10 max-sm:items-end max-sm:gap-4">
                            <div className="timepoint_div flex flex-col items-end">
                                <h2 className="timepoint text-[16px] font-bold text-white max-sm:text-sm">Last Updated</h2>
                                <p className="timepoint_value text-[13px] text-gray-300 font-(family-name:--font-secondary) max-sm:text-[12px]">{timepoint} hours ago</p>
                            </div>

                            <div className="temp_div flex items-center justify-center font-(family-name:--font-h)">
                                <h2 className="temp text-[72px] font-bold text-white max-sm:text-4xl">{Math.round(weather.list[0].main.temp - 273.15)}°C</h2>
                            </div>

                            <div className="feels_like_div flex items-center justify-end font-(family-name:--font-h)">
                                <p className="feels_like text-[14px] text-gray-300">Feels like {Math.round(weather.list[0].main.feels_like - 273.15)}°C</p>
                            </div>
                            
                        </div>

                    </section>

                    <hr className="hr1 w-full text-gray-700 mb-12 max-sm:mb-8" />

                    <section className="features-grid grid gap-y-16 w-full max-sm:flex max-sm:flex-col max-sm:gap-y-4">
                        <div className="feature-div cloud_cover flex items-center justify-around border border-purple-500 rounded-xl p-2">
                            
                            <div className="text_container flex flex-col items-start">
                                 <h2 className="cloudCover text-2xl font-bold text-white max-sm:text-lg">Cloud Cover</h2>
                                <p className="cloudCover_value text-lg text-gray-300 font-(family-name:--font-secondary)">{cloudCoverValue}%</p>

                            </div>
                           
                            <div className="anim_container">
                                <dotlottie-wc
                                src="https://lottie.host/b3ac2f9d-49c2-4f3d-a2bf-9ff5f06cf867/q1exQH7ban.lottie"
                                style={{ width: '100px', height: '100px' }}
                                autoplay
                                loop
                                >
                                </dotlottie-wc>
                            </div>
                        </div>

                        <div className="feature-div relative_humidity flex items-center justify-around border border-purple-500 rounded-xl p-2">
                            
                            <div className="text_container flex flex-col items-start">
                                <h2 className="relativeHumidity text-2xl font-bold text-white max-sm:text-lg">Humidity</h2>
                                <p className="relativeHumidity_value text-lg text-gray-300 font-(family-name:--font-secondary)">{weather.list[0].main.humidity}%</p>
                            </div>
                            
                            <div className="anim_container">
                                <dotlottie-wc
                                src="https://lottie.host/422ff822-1bf8-4071-9c60-c3895f6e9d66/ERwcVKH1B7.lottie"
                                style={{ width: '80px', height: '80px' }}
                                autoplay
                                loop
                                >
                                </dotlottie-wc>
                            </div>

                        </div>

                        <div className="feature-div wind_speed flex items-center justify-around border border-purple-500 rounded-xl p-2">
                            
                            <div className="text_container">
                                <h2 className="windSpeed text-2xl font-bold text-white max-sm:text-lg">Wind Speed</h2>
                                <p className="windSpeed_value text-lg text-gray-300 font-(family-name:--font-secondary)">{windSpeedValue} km/h</p>
                            </div>

                            <div className="anim_container w-14 aspect-square p-3 rounded-lg flex items-center justify-center
                            bg-linear-to-bl from-violet-500 to-fuchsia-500">

                                <h2 className="direction-label text-2xl font-bold text-white font-(family-name:--font-h) leading-1">{windDirection}</h2>
                            </div>


                        </div>

                        <div className="feature-div precipitation_amount flex items-center justify-around border border-purple-500 rounded-xl p-2">

                            <div className="text-container flex flex-col items-start">
                                <h2 className="precipitationAmount text-2xl font-bold text-white max-sm:text-lg">Precipitation</h2>
                                <p className="precipitationAmount_value text-lg text-gray-300 font-(family-name:--font-secondary)">{precipitationAmount}</p>
                                
                            </div>
                            

                            <div className="anim_container">
                                <dotlottie-wc
                                    src="https://lottie.host/aec0e72c-4ab9-4fd8-85d4-f0624fad4c1d/GLhXpy5NGQ.lottie"
                                    style={{ width: '60px', height: '60px' }}
                                    autoplay
                                    loop
                                >        
                                </dotlottie-wc>
                            </div>
                        </div>

                        <div className="feature-div precipitation_amount flex items-center justify-around border border-purple-500 rounded-xl p-2">
                            <div className="text_container">
                                <h2 className="pressureLevel text-2xl font-bold text-white max-sm:text-lg">Pressure Level</h2>
                                <p className="pressureLevel_value text-lg text-gray-300 font-(family-name:--font-secondary)">{weather.list[0].main.pressure}hPa</p>
                            </div>

                            <div className="anim_container">
                                <dotlottie-wc
                                src="https://lottie.host/23fa31e1-9629-458b-9391-3b063978d9b1/Nd3gYXZmip.lottie"
                                style={{ width: '60px', height: '60px' }}
                                autoplay
                                loop
                                >
                                </dotlottie-wc>
                            </div>

                        </div>

                        <div className="feature-div precipitation_amount flex items-center justify-around border border-purple-500 rounded-xl p-2">
                            
                            <div className="text_container">
                                <h2 className="seaLevel text-2xl font-bold text-white max-sm:text-lg">Sea Level</h2>
                            <p className="seaLevel_value text-lg text-gray-300 font-(family-name:--font-secondary)">{weather.list[0].main.sea_level}m</p>

                            </div>
                            
                            <div className="anim_container">
                                <dotlottie-wc
                                src="https://lottie.host/4386b2bc-1e8f-4004-9386-c33fad43f37a/jr0tZPfKP5.lottie"
                                style={{ width: '60px', height: '60px' }}
                                autoplay
                                loop
                                >
                                </dotlottie-wc>
                            </div>


                        </div>
                    </section>

                </div>
            }

        </section>
        
    )
}