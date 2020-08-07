import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {connect} from 'react-redux';
import {deleteTask} from '../../actions/taskDemo';
import {setAlert} from '../../actions/alert';
import {withRouter} from 'react-router-dom';
import Spinner from '../layout/Spinner';

import {
	CardText,
	Badge,
	Button
} from 'reactstrap';

const TasksUserCompleted = ({
	auth, 
	title,
	cost,
	urgency, 
	status, 
	id,
	deadlinedate,
	history,
	deleteTask,
	setAlert
}) =>{
		
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
			pathname: '/demo/dashboard/edit-task',
			state: id
		})
	}
		
	return (	
		<tr>
            <td>{title}</td>
			<td>${cost}.00</td>
			<td>
				<Badge 
					className="mr-1" 
					color={urgencyColor(urgency)}>
					{urgency}
				</Badge>
			</td>
			<td>
				<Badge 
					className="mr-2" 
					color={status === "pending" ? "success" : "danger"}>
					{status}
				</Badge>
			</td>
			<td><Moment format='MM/DD/YYYY' add={{day: 1}}>{deadlinedate}</Moment></td>
        </tr>		  
	)
}

TasksUserCompleted.propTypes = {
	task: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	deleteTask: PropTypes.func.isRequired,
	setAlert: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth,
	task: state.task
})

export default connect(mapStateToProps, {deleteTask, setAlert})(withRouter(TasksUserCompleted));


		
			
		
		