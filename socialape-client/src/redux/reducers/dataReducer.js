import {
	SET_SCREAMS,
	SET_SCREAM,
	LOADING_DATA,
	LIKE_SCREAM,
	UNLIKE_SCREAM,
	DELETE_SCREAM,
	POST_SCREAM,
	SUBMIT_COMMENT,
	CLEAR_SCREAM
} from '../types'

const initialState = {
	screams: [],
	scream: [],
	loading: false
}

export default function (state=initialState, action) {
	switch(action.type) {
		case LOADING_DATA: 
			return {
				...state,
				loading: true
			}
		case SET_SCREAMS:
			return {
				...state,
				screams: action.payload,
				loading: false
			}
		case SET_SCREAM:
			return {
				...state,
				scream: action.payload
			}
	 	case LIKE_SCREAM:
		case UNLIKE_SCREAM: 
			let index = state.screams.findIndex(
				scream => scream.screamId === action.payload.screamData.screamId)
			state.screams[index] = action.payload.screamData
			return {
				...state,
				scream: action.payload.screamData
			} 
		case DELETE_SCREAM:
			let daleteIndex = state.screams.findIndex(
				scream => scream.screamId === action.payload)
			state.screams.splice(daleteIndex,1)
			return {
				...state
			}
		case POST_SCREAM:
			return {
				...state,
				screams: [
					action.payload, ...state.screams
				],
			}
		case CLEAR_SCREAM:
			return {
				...state,
				scream: []
			}
		case SUBMIT_COMMENT:
			return {
				...state,
				scream: {
					...state.scream,
					comments: [action.payload, ...state.scream.comments],
					commentCount: state.scream.commentCount + 1
				}
			}
		default:
			return state
	}
}