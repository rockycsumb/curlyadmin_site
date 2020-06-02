import axios from 'axios';
import {setAlert} from './alert';
import {
	GET_TASKS,
	TASK_ERROR
} from './types';


//GET TASK
export const getTasks = () => async dispatch => {
	try {
		const res = await axios.get('https://mernstack-shrnu.run-us-west2.goorm.io/api/task');
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