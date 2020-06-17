import { 
	SET_ERRORS,
	CLEAR_ERRORS, 
	LOADING_UI,
	STOP_LOADING_UI
} from '../types'

const initialState = {
	loading: false,
	error: null
}

export default function (state = initialState, action) {
	switch(action.type) {
		case LOADING_UI :
			return {
				...state,
				loading: true
			}
		case STOP_LOADING_UI :
			return {
				...state,
				loading: false
			}
		case SET_ERRORS :
			return {
				...state,
				loading: false,
				error: action.payload
			}
		case CLEAR_ERRORS :
			return {
				...state,
				loading: false,
				error: null
			}
		default:
			return state
	}
}

