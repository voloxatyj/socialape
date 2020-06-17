import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
// Reducers
import dataReducer from './reducers/dataReducer'
import userReducer from './reducers/userReducer'
import uiReducer from './reducers/uiReducer'

const initialState = {}

const middleware = [thunk] || [window.thunk.default]

const reducers = combineReducers({
	user: userReducer,
	data: dataReducer,
	ui: uiReducer
})

const store = createStore(
	reducers,
	initialState,
	compose(
		applyMiddleware(...middleware),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
)

export default store