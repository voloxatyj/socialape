import {
	SET_SCREAMS,
	LOADING_DATA,
	LIKE_SCREAM,
	UNLIKE_SCREAM,
	DELETE_SCREAM,
	LOADING_UI,
	POST_SCREAM,
	CLEAR_ERRORS,
	SET_ERRORS,
	SET_SCREAM,
	STOP_LOADING_UI,
	SUBMIT_COMMENT,
	CLEAR_SCREAM
} from '../types'
import axios from 'axios'

//Get all screams
export const getScreams = () => dispatch => {
	dispatch({ type: LOADING_DATA })
		axios.get('/screams')
			.then(res => {
				dispatch({
					type: SET_SCREAMS,
					payload: res.data
				})
			})
			.catch(() => 
				dispatch({
					type: SET_SCREAMS,
					payload: []
				})
			)
}

// Get scream
export const getScream = screamId => dispatch => {
	dispatch({ type: LOADING_UI })	
	axios.get(`/scream/${screamId}`)
		.then(res => {
			dispatch({
				type: SET_SCREAM,
				payload: res.data
			})
			dispatch({ type: STOP_LOADING_UI })	
		})
		.catch(err => console.log(err))
}

// Like scream
export const likeScream = screamId => dispatch => {
	axios.get(`/scream/${screamId}/like`)
		.then(res => 
			dispatch({
				type: LIKE_SCREAM,
				payload: res.data
			})
		)
		.catch(err => console.log(err))
}
	
// UnLike scream
export const unlikeScream = screamId => dispatch => {
	axios.get(`/scream/${screamId}/unlike`)
		.then(res => 
			dispatch({
				type: UNLIKE_SCREAM,
				payload: res.data
			})
		)
		.catch(err => console.log(err))
}

// Submit Comment
export const submitComment = (screamId, commentData) => dispatch => {
	axios.post(`/scream/${screamId}/comment`, commentData)
		.then(res => {
			dispatch({
				type: SUBMIT_COMMENT,
				payload: res.data
			})
			dispatch(clearErrors())
		})
		.catch(err =>
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data
			})
		)
}

// Delete scream
export const deleteScream = screamId => dispatch => {
	axios.delete(`/scream/${screamId}`)
		.then(() =>
			dispatch({
				type: DELETE_SCREAM,
				payload: screamId
			})
		)
		.catch(err =>
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data
			})
		)
}

// Post scream
export const postScream = newScream => dispatch => {
	dispatch({ type: LOADING_UI })
	axios.post('/scream', newScream)
	.then(res => {
		dispatch({
			type: POST_SCREAM,
			payload: res.data
		})
		dispatch(clearErrors())
	})
		.catch(err =>
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data
			})
		)
}

// get ScreamData
export const getUserDetails = userHandle => dispatch => {
	dispatch({ type: LOADING_DATA })
	axios.get(`/user/${userHandle}`)
		.then(res => 
			dispatch({
				type: SET_SCREAMS,
				payload: res.data.screams
			})
		)
		.catch(err => 
			dispatch({
				type: SET_SCREAMS,
				action: null
			})
		)
}

// Clear errors
export const clearErrors = () => dispatch =>
	dispatch({ type: CLEAR_ERRORS })

// Clear scream
export const clearScream = () => dispatch =>
	dispatch({ type: CLEAR_SCREAM })