import axios from 'axios';
import {setAlert} from './alert';
import {
	GET_PROFILE,
	PROFILE_ERROR,
	ACCOUNT_DELETED,
	CLEAR_PROFILE
} from './types';

//Get current users profile
export const getCurrentProfile = () => async dispatch => {
	try {
		const res = await axios.get('https://mernstack-shrnu.run-us-west2.goorm.io/api/profile/me');
		dispatch({
			type: GET_PROFILE,
			payload: res.data
		})
		
	} catch(err){
		dispatch({
			type: PROFILE_ERROR,
			payload: {msg: err.response.statusText, status: err.response.status}
		});
	}
}

//Create or update profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}
		
		
		
		const res = await axios.post('https://mernstack-shrnu.run-us-west2.goorm.io/api/profile', formData, config);
		dispatch({
			type: GET_PROFILE,
			payload: res.data
		});
		
		dispatch(setAlert(edit ? 'Profile Update' : "Profile Created", 'success'));
		
		if(!edit){
			history.push('/dashboard/profile');
		} else {
			history.push('/dashboard/profile');
		}
		
		
	}catch(err){
		const errors = err.response.data.errors;
		if(errors){
		    errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
		 }
		dispatch({
			type: PROFILE_ERROR,
			payload: {msg: err.response.statusText, status: err.response.status}
		});
	}
} 

// Delete account and profile
export const deleteAccount = () => async dispatch => {
	if(window.confirm('Are you sure? This cannot be undone!')) {
		try {
			const res = await axios.delete('https://mernstack-shrnu.run-us-west2.goorm.io/api/profile');
			dispatch({type: CLEAR_PROFILE});
			dispatch({type: ACCOUNT_DELETED});
			
			dispatch(setAlert('Your account has been deleted', 'warning'));

		} catch(err){
			dispatch({
				type: PROFILE_ERROR,
				payload: {msg: err.response.statusText, status: err.response.status}
			});
		}
	}
}


