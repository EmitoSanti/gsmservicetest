export const SET_CITY = 'SET_CITY';

export const setCity = payload => ({ type: SET_CITY, payload });  // payload o value: city



const api_key = "a44e66f9f43213e2c5cb7a17ab19432e";
const url_base_forecast = "http://api.openweathermap.org/data/2.5/forecast";
export const fetchForecast = payload => {
    console.log("fetchForecast");
    return dispatch => {
        const url_forecast = `${url_base_forecast}?q=${city}&appid=${api_key}`;

        // activar en el estado un indicador de busqueda de datos
        fetch(url_forecast)
            .then(
                data => (data.json())
            ).then( 
                weather_data => {
                    console.log("Resultado del fetchForecast + transformForecast" + weather_data);
                    const forecastData = transformForecast(weather_data);
                    this.setState({ forecastData });
                    console.log(forecastData);
                    // modificar el estado con el resultado de la promise (fetch)
                }
            );
        return;
    };
};