import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {connect} from 'react-redux';
import {deleteTask} from '../../actions/task';
import {setAlert} from '../../actions/alert';
import {withRouter} from 'react-router-dom';
import Spinner from '../layout/Spinner';

import {
	CardText,
	Badge,
	Button
} from 'reactstrap';

const TasksCompleted = ({
	auth, 
	user, 
	title, 
	description, 
	cost,
	urgency, 
	status, 
	id,
	deadlinedate,
	history,
	deleteTask,
	setAlert
}) =>{
	
	let descriptionShort = description.substring(0, 50);
	
	const urgencyColor = (urgency) =>{
		if (urgency === "low") {
			return "success";
		} else if (urgency === "medium") {
			return "warning";
		} else {
			return "danger"
		}
	}
	
	const handleEdit = (id) =>{
		history.push({
			pathname: '/dashboard/edit-task',
			state: id
		})
	}
		
	return (	
		<tr>
            <td>{user}</td>
            <td>{title}</td>
			<td>{descriptionShort} ...</td>
			<td>{cost}</td>
			<td>
				<Badge 
					className="mr-1" 
					color={urgencyColor(urgency)}>
					Urgency: {urgency}
				</Badge>
			</td>
			<td>
				<Badge 
					className="mr-2" 
					color={status === "pending" ? "success" : "danger"}>
					Agreement: {status}
				</Badge>
			</td>
			<td><Moment format='MM/DD/YYYY' add={{day: 1}}>{deadlinedate}</Moment></td>
        </tr>		  
	)
}

TasksCompleted.propTypes = {
	task: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	deleteTask: PropTypes.func.isRequired,
	setAlert: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth,
	task: state.task
})

export default connect(mapStateToProps, {deleteTask, setAlert})(withRouter(TasksCompleted));


		
			
		
		