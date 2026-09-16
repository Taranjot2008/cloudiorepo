import React from 'react'

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


const DailyForecast = ({ weatherData, initDate }) => {

  const [dateState, setDateState] = React.useState([]);

  React.useEffect(() => {
    if (!initDate) return;

    const tomorrow = new Date(initDate.getTime() + 1 * 86400000).toDateString().slice(4, 15);
    const secondDay = new Date(initDate.getTime() + 2 * 86400000).toDateString().slice(4, 15);
    const thirdDay = new Date(initDate.getTime() + 3 * 86400000).toDateString().slice(4, 15);
    const fourthDay = new Date(initDate.getTime() + 4 * 86400000).toDateString().slice(4, 15);
    const fifthDay = new Date(initDate.getTime() + 5 * 86400000).toDateString().slice(4, 15);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDateState([tomorrow, secondDay, thirdDay, fourthDay, fifthDay]);
  }, [initDate]);

  const getWeatherInfo = (date) => {
    if (!weatherData) return null;

    const weatherInfo = weatherData.list.find(item => {
      const itemDate = new Date(item.dt_txt).toDateString().slice(4, 15);
      return itemDate === date;
    });

    if (!weatherInfo) return null;

    return {
      temp: weatherInfo.main.temp,
      description: weatherInfo.weather[0].description,
      icon: weatherInfo.weather[0].icon
    };
  };

  const getWeatherIcon = (iconCode) => {
    if (!iconCode) return null;

    const iconInfo = weatherMap[iconCode];

    return iconInfo ? iconInfo.iconType : null;
  }

  
  const loadDates = dateState.map((date, index) => {

    const info = getWeatherInfo(date);

      return (
        <div key={index} className='w-full h-80 mr-10 max-sm:mr-0'>
          <div className='daily-forecast h-full rounded-lg w-full flex flex-col items-center gap-6 px-10 py-6 max-sm:p-4'>
            <p className="daily-details date font-(family-name:--font-h) font-bold text-2xl">{date}</p>
            <div className="daily-info-icon flex items-center justify-between px-1 w-full">
              <div className="daily-info flex flex-col">
                <p className="daily-details description text-lg font-(family-name:--font-secondary) max-sm:text-sm"><span className="font-medium">Description:</span> {info?.description ?? "No data"}</p>
                <p className="daily-details temp text-lg font-(family-name:--font-secondary) max-sm:text-sm"><span className="font-medium">Temperature:</span> {info ? `${(info.temp - 275.15).toFixed(1)}°C` : "No data"}</p>
              </div>
              <img src={getWeatherIcon(info?.icon)} alt="Icon" className="w-16 aspect-square max-sm:w-12" />
            </div>
            
          </div>
          
        </div>
      )
  })
  
    
  return (
    <div className='forecast-container h-screen w-full flex flex-col items-center gap-4 max-lg:w-[80vw] max-lg:mt-20'>
      {loadDates}
    </div>
  )
}

export default DailyForecast