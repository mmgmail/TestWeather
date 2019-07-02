
const initialState = {
	isLoading: false,
	todayWeather: {},
	hourlyyWeather: {},
	coordWeather: {}
}

const weather = (state = {}, action) => {
	switch (action.type) {
		case 'LOADING': {
			return {
				...state,
				isLoading: true
			}
		}
		case 'GET_WEATHER_TODAY_SUCCESS':
			return {
				...state,
				todayWeather: action.payload,
				isLoading: false
			}
		case 'GET_WEATHER_HOURLY_SUCCESS':
			return {
				...state,
				hourlyyWeather: action.payload,
				isLoading: false
			}
		case 'GET_WEATHER_BYCOORD_SUCCESS':
			return {
				...state,
				coordWeather: action.payload,
				isLoading: false
			}
		default:
			return state
	}
}
    
export default weather