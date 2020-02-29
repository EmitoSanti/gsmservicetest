import convert from 'convert-units';
import {
    CLOUD,
    SUN,
    RAIN,
    SNOW,
    THUNDER,
    DRIZZLE
} from '../constants/weathers';

const getTemp = kelvin => {
    return Number(convert(kelvin).from("K").to("C").toFixed(0));
}

const getWeatherState = weather_data => {
    const { id } = weather_data;
    switch (true) {
        case ( id < 300): {
            return THUNDER;
        }
        case ( id < 400): {
            return DRIZZLE;
        }
        case ( id < 600): {
            return RAIN;
        }
        case ( id < 700): {
            return SNOW;
        }
        case ( id === 800): {
            return SUN;
        }
        default: {
            return CLOUD;
        }
    }
}

const transformWeather = weather_data => {
    const { temp, humidity } = weather_data.main;
    const { speed } = weather_data.wind;
    const weatherState = getWeatherState(weather_data.weather[0]);
    const temperature = getTemp(temp);

    const data = {
        humidity,
        temperature,
        weatherState,
        wind: speed
    };

    return data;
}
export default transformWeather;