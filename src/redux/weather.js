const weather = (state = {}, action) => {
	switch (action.type) {
		case 'GET_WEATHER_TODAY_SUCCESS':
			return {
				...state,
				todayWeather: action.payload
			}
		case 'GET_WEATHER_HOURLY_SUCCESS':
			return {
				...state,
				hourlyyWeather: action.payload
			}
		case 'GET_WEATHER_BYCOORD_SUCCESS':
			return {
				...state,
				coordWeather: action.payload
			}
		default:
			return state
	}
}
    
export default weather