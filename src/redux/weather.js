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
		case 'GET_WEATHER_TODAY_FAILURE': {
			return {
				error: action.payload
			}
		}
		case 'GET_WEATHER_HOURLY_SUCCESS':
			return {
				...state,
				coordWeather: action.payload,
				isLoading: false
			}
		case 'GET_WEATHER_HOURLY_FAILURE': {
			return {
				error: action.payload
			}
		}
		case 'GET_WEATHER_BYCOORD_SUCCESS':
			return {
				...state,
				coordWeather: action.payload,
				isLoading: false
			}
		case 'GET_WEATHER_BYCOORD_FAILURE': {
			return {
				error: action.payload
			}
		}
		case 'RESET_PARAMS':
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