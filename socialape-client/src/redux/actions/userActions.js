import { 
	SET_USER, 
	SET_ERRORS, 
	CLEAR_ERRORS, 
	LOADING_UI, 
	SET_UNAUTHENTICATED, 
	LOADING_USER,
	MARK_NOTIFICATIONS_READ
} from '../types'
import axios from 'axios'

export const loginUser = (data, history) => dispatch => {
	dispatch({ type: LOADING_UI })
	axios.post('/login', data)
		.then(res => {
			setAuthorizationHeader(res.data.token)
			dispatch(getUserData(res.data.token))
			dispatch({ type: CLEAR_ERRORS	})
			history.push('/')
		})
		.catch(err => 
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data
			})
		)
}

export const signupUser = (data, history) => dispatch => {
	dispatch({ type: LOADING_UI })
	axios.post('/signup', data)
		.then(res => {
			setAuthorizationHeader(res.data.token)
			dispatch(getUserData(res.data.token))
			dispatch({ type: CLEAR_ERRORS	})
			history.push('/')
		})
		.catch(err => 
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data
			})
		)
}

export const logoutUser = () => dispatch => {
	localStorage.removeItem('FBIdToken')
	delete axios.defaults.headers.common['Authorization']
	dispatch({ type: SET_UNAUTHENTICATED })
}

export const setAuthorizationHeader = token => {
	const FBIdToken = `Bearer ${token}`
	localStorage.setItem('FBIdToken', FBIdToken)
	axios.defaults.headers.common['Authorization'] = FBIdToken
}

export const getUserData = () => dispatch => {
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('FBIdToken') || undefined
	dispatch({ type: LOADING_USER })
	axios.get('/user')
		.then(res => dispatch({
			type: SET_USER,
			payload: res.data
		}))
		.catch(err => console.log(err))
}

export const uploadImage = formData => dispatch => {
	axios.post('/user/image', formData)
		.then(() => dispatch(getUserData()))
		.catch(err => console.log(err))
}

export const editUserDetails = userDetails => dispatch => {
	axios.post('/user', userDetails)
		.then(() => dispatch(getUserData()))
		.catch(err => console.log(err))
}

export const markNotificationsRead = notificationIds => dispatch => {
	axios.post('/notifications', notificationIds)
		.then(() => {
			dispatch({
				type: MARK_NOTIFICATIONS_READ
			})
		})
		.catch(err => console.log(err))
}