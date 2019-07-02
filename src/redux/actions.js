import { Api } from 'AppApi';
const { getWeather, getWeatherHourly, getWeatherHourlyByCoord } = Api;

const loadWeatherToday = () => (dispatch, getState) => {
	dispatch({ type: 'LOADING' })
	getWeather().then(res => {
		dispatch({ type: 'GET_WEATHER_TODAY_SUCCESS', payload: res })
	}).catch(function (error) {
		dispatch({ type: 'GET_WEATHER_TODAY_FAILURE', payload: error })
	})
}

const loadWeatherHourly = (city) => (dispatch, getState) => {
	dispatch({ type: 'LOADING' })
	getWeatherHourly(city).then(res => {
		dispatch({ type: 'GET_WEATHER_HOURLY_SUCCESS', payload: res })
	}).catch(function (error) {
		dispatch({ type: 'GET_WEATHER_HOURLY_FAILURE', payload: error })
	})
}

const loadWeatherByCoord = (lat, lon) => {
	return (dispatch, getState) => {
		dispatch({ type: 'LOADING' })
		getWeatherHourlyByCoord(lat, lon).then(res => {
			dispatch({ type: 'GET_WEATHER_BYCOORD_SUCCESS', payload: res })
		}).catch(function (error) {
			dispatch({ type: 'GET_WEATHER_BYCOORD_FAILURE', payload: error })
		})
	}
}

const resetParams = () => {
	return (dispatch) => {
		dispatch({ type: 'RESET_PARAMS', payload: null })
	}
}

export {
	loadWeatherToday,
	loadWeatherHourly,
	loadWeatherByCoord,
	resetParams
}