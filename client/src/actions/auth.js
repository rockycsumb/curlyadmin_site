import axios from 'axios';
import {setAlert} from './alert';
import setAuthToken from '../utils/setAuthToken';
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	LOGOUT,
	CLEAR_PROFILE
} from './types';


//Load User
export const loadUser = () => async dispatch => {
	if(localStorage.token){
	    setAuthToken(localStorage.token);
	 }
	
	try {
		const res = await axios.get('https://mernstack-shrnu.run-us-west2.goorm.io/api/auth');
		
		dispatch({
			type: USER_LOADED,
			payload: res.data
		});
	} catch(err) {
		dispatch({
			type: AUTH_ERROR
		});
	}
}

//Register User
export const register = ({name, email, password, privacy}) => async dispatch => {
	const config = {
		headers: {
			'Content-type': 'application/json'
		}
	}
	
	const body = JSON.stringify({name, email, password, privacy});
	console.log("from actions ", body);
	
	try {
		
		const res = await axios.post('https://mernstack-shrnu.run-us-west2.goorm.io/api/users', body, config);
		
		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data
		});
		dispatch(loadUser());
		
	}catch(err) {
	 	const errors = err.response.data.errors;
		if(errors){
		    errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
		 }
		
		dispatch({
			type: REGISTER_FAIL
		})
	}
}



//Login User
export const login = (email, password) => async dispatch => {
	const config = {
		headers: {
			'Content-type': 'application/json'
		}
	}
	
	const body = JSON.stringify({email, password});
	console.log("from actions ", body);
	
	try {
		
		const res = await axios.post('https://mernstack-shrnu.run-us-west2.goorm.io/api/auth', body, config);
		
		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data
		});
		
		dispatch(loadUser());
		
	}catch(err) {
	 	const errors = err.response.data.errors;
		if(errors){
		    errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
		 }
		
		dispatch({
			type: LOGIN_FAIL
		})
	}
}

//Login User Social Media
export const loginSocialMedia = (email, password) => async dispatch => {
	const config = {
		headers: {
			'Content-type': 'application/json'
		}
	}
	
	const body = JSON.stringify({email, password});
	
	
	try {
		
		const res = await axios.post('https://mernstack-shrnu.run-us-west2.goorm.io/api/auth', body, config);
		
		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data
		});
		
		dispatch(loadUser());
		
	}catch(err) {
	 			
		dispatch({
			type: LOGIN_FAIL
		})
	}
}

//Register User With Social Media
export const registerSocialMedia = ({name, email, password, privacy}) => async dispatch => {
	const config = {
		headers: {
			'Content-type': 'application/json'
		}
	}
	
	const body = JSON.stringify({name, email, password, privacy});
	
	
	try {
		
		const res = await axios.post('https://mernstack-shrnu.run-us-west2.goorm.io/api/users', body, config);
		
		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data
		});
		dispatch(loadUser());
		
	}catch(err) {
	 	dispatch(loginSocialMedia(email, password))
	}
}

// LOGOUT
export const logout = () => dispatch => {
	dispatch({type: CLEAR_PROFILE})
	dispatch({type: LOGOUT})
}
