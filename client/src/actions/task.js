import axios from 'axios';
import apiURL from '../utils/apiURL';
import {setAlert} from './alert';
import {updateAccount} from './auth';
import {
	GET_TASKS,
	GET_TASK,
	UPDATE_TASK,
	TASK_ERROR,
	DELETE_TASK,
	ADD_TASK,
	ADD_COMMENT,
	DELETE_COMMENT
} from './types';


//GET TASKS
export const getTasks = () => async dispatch => {
	console.log("from get tasks actions ")
	try {
		const res = await axios.get(`${apiURL}api/task`);
		dispatch({
			type: GET_TASKS,
			payload: res.data
		})
	} catch(err) {
		
		dispatch({
			type: TASK_ERROR,
			payload: {msg: err.response.statusText, status: err.response.status}
		});
	}
}

//GET TASK BY ID
export const getTaskById = id => async dispatch => {
	try {
		const res = await axios.get(`${apiURL}api/task/${id}`);
		dispatch({
			type: GET_TASK,
			payload: res.data
		})
	} catch(err) {
		
		dispatch({
			type: TASK_ERROR,
			payload: {msg: err.response.statusText, status: err.response.status}
		});
	}
}

// DELETE TASK
export const deleteTask = id => async dispatch => {
	try {
		const res = await axios.delete(`${apiURL}api/task/${id}`);
		dispatch({
			type: DELETE_TASK,
			payload: {id}
		})
		
		dispatch(getTasks());
		
		dispatch(setAlert('Task deleted', 'success'))
		
	} catch(err) {
		dispatch({
			type: TASK_ERROR,
			payload: {msg: err.response.statusText, status: err.response.status}
		});
	}
}

// ADD TASK
export const addTask = (formData, history, edit = false) => async dispatch => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json'
				}
		}
		const res = await axios.post(`${apiURL}api/task`, formData, config);
		dispatch({
			type: ADD_TASK,
			payload: res.data
		})
		
		dispatch(setAlert('Task Added', 'success'))
		
		if(!edit){
			history.push('/dashboard/task')
		} else {
			history.push('dashboard/task')
		}
	} catch(err) {
		dispatch({
			type: TASK_ERROR,
			payload: {msg: err.response.statusText, status: err.response.status}
		});
	}
}

// EDIT TASK
export const editTask = (formData, history, edit = true, taskId) => async dispatch => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}
		let res = await axios.patch(`${apiURL}api/task/${taskId}`, formData, config);
		
		if(formData.agreement === 'locked'){
			
			let deductInfo = {
				plan: 'none', 
				method: 'minus', 
				amount: formData.cost, 
				taskId: taskId
			}
			dispatch(updateAccount(deductInfo, history));
		}
		
		dispatch(getTasks());
		dispatch(setAlert('Task Edited', 'success'))
		
	} catch(err) {
		dispatch({
			type: TASK_ERROR,
			payload: {msg: err.response.statusText, status: err.response.status}
		});
	}
}

// ADD COMMENT
export const addComment = (taskId, formData) => async dispatch => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json'
				}
		}
		const res = await axios.post(`${apiURL}api/task/comment/${taskId}`, formData, config);
		dispatch({
			type: ADD_COMMENT,
			payload: res.data
		})
		
		
		dispatch(setAlert('Comment Added', 'success'))
		
	
	} catch(err) {
		dispatch({
			type: TASK_ERROR,
			payload: {msg: err.response.statusText, status: err.response.status}
		});
	}
}

// DELETE COMMENT
export const deleteComment = (taskId, commentId) => async dispatch => {
	try {
		const res = await axios.delete(`${apiURL}api/task/comment/${taskId}/${commentId}`);
		dispatch({
			type: DELETE_COMMENT,
			payload: commentId
		})
		
		dispatch(setAlert('Comment DELETED', 'success'))
		
	} catch(err) {
		dispatch({
			type: TASK_ERROR,
			payload: {msg: err.response.statusText, status: err.response.status}
		});
	}
}