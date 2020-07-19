import axios from 'axios';
import {setAlert} from './alert';
import apiURL from '../utils/apiURL';
import setAuthToken from '../utils/setAuthToken';
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	GET_ALL_USERS,
	AUTH_ERROR,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	LOGOUT,
	CLEAR_PROFILE,
	FROM_SERVICE,
	REMOVE_FROM_SERVICE,
	UPDATE_ACCOUNT,
	GET_ACCOUNT
} from './types';


//Load User
export const loadUser = () => async dispatch => {
	if(localStorage.token){
	    setAuthToken(localStorage.token);
	 }
	
	try {
		const res = await axios.get(`${apiURL}api/auth`);
		
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
export const register = ({name, email, password, privacy}, history ) => async dispatch => {
	const config = {
		headers: {
			'Content-type': 'application/json'
		}
	}
	const body = JSON.stringify({name, email, password, privacy});
	if(history.location.state !== undefined){
		
		const fromService = {
								pay: history.location.state.pay,
								service: history.location.state.service
							}
		dispatch({
			type: FROM_SERVICE,
			payload: fromService
		});
	}
	try {
		const res = await axios.post(`${apiURL}api/users`, body, config);
		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data
		});
		
		dispatch(loadUser());
		
	}catch(err) {
	 	console.log(err);
		const errors = err.response.data.errors;
		
		if(errors){
		    errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
		 }
		
		dispatch({
			type: REGISTER_FAIL
		})
	}
}


//Remove pay from service
export const removeFromService = (props) => dispatch => {
	dispatch({
		type: REMOVE_FROM_SERVICE
	})
}


// Update Account 
export const updateAccount = (formData, history) => async dispatch => {
	console.log("from update account ", formData);
	
	const config = {
		headers: {
			'Content-type': 'application/json'
		}
	}
	
	const body = JSON.stringify({formData});
	
	try {
		
		const res = await axios.post(`${apiURL}api/auth/updateAccount`, formData, config);
		
		console.log("from updatea ccount ", res.data);
		
		dispatch({
			type: UPDATE_ACCOUNT,
			payload: res.data
		})
		
	} catch(err){
		console.log("from update err catch ", err);
		// dispatch({
		// 	type: TASK_ERROR,
		// 	payload: {msg: err.response.statusText, status: err.response.status}
		// })
	}
}

export const getAccountUpdate = props => async dispatch =>{
	try{
	const res = await axios.get(`${apiURL}api/auth/getAccount`);
	
		dispatch({
		type: GET_ACCOUNT,
		payload: res.data
	})
	} catch(err){
		console.log("from update err catch ", err);
	}
	
}


//Get All Users
export const getAllUsers = props => async dispatch =>{
	
	try{
		const res = await axios.get(`${apiURL}api/users/allusers`);
	
		dispatch({
			type: GET_ALL_USERS,
			payload: res.data
		})
	}catch(err){
		console.log("from update err catch ", err);
	}
	
}


//Get account by id
export const getAccountById = (formData) => async dispatch =>{
	
	const config = {
		headers: {
			'Content-type': 'application/json'
		}
	}
	
	const body = JSON.stringify({formData});
	const res = await axios.post(`${apiURL}api/auth/getAccountById`, body, config);
	
	dispatch({
		type: GET_ACCOUNT,
		payload: res.data
	})
}

//Login User
export const login = (email, password) => async dispatch => {
	const config = {
		headers: {
			'Content-type': 'application/json'
		}
	}
	
	const body = JSON.stringify({email, password});
	
	try {
		
		const res = await axios.post(`${apiURL}api/auth`, body, config);
		
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
