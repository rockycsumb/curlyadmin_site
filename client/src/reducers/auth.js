import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	GET_ALL_USERS,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	ACCOUNT_DELETED,
	FROM_SERVICE,
	REMOVE_FROM_SERVICE,
	UPDATE_ACCOUNT,
	GET_ACCOUNT
} from '../actions/types';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
	loading: true,
	user: null,
	fromService: null,
	account: null,
	users: null
}

export default function( state = initialState, action){
	const {type, payload} = action;
	switch(type) {
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: payload,
				account: payload.account
			}
		case GET_ACCOUNT:
		case UPDATE_ACCOUNT:
			return {
				...state,
				account: payload,
				loading: false
			}
		case GET_ALL_USERS:
			return {
				...state,
				users: payload,
				loading: false
			}
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			
			localStorage.setItem('token', payload.token);
			return {
				...state, 
				...payload, 
				isAuthenticated: true, 
				loading: false
			}
		case FROM_SERVICE:
			return {
				...state,
				fromService: payload
			}
		case REMOVE_FROM_SERVICE:
			return {
				...state,
				fromService: null
			}
		case REGISTER_FAIL:
		case AUTH_ERROR:
		case LOGIN_FAIL:
		case LOGOUT:
		case ACCOUNT_DELETED:
			localStorage.removeItem('token');
			return {
				...state, 
				token: null,
				isAuthenticated: false, 
				loading: false,
				fromService: null
			}
		
		default:
			return state;
	}
	
}