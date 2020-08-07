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

const TasksAdminOverview = ({
	auth, 
	user, 
	title,
	urgency, 
	status, 
	id,
	deadlinedate,
	cost,
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
			state: {id: id, prevPath: history.location.pathname}
		})
	}
		
	return (	
		<tr>
            <td>{user}</td>
            <td>{title}</td>
			<td>Deadline: <Moment format='MM/DD/YYYY' add={{day: 1}}>{deadlinedate}</Moment>
				<h6>Cost: {cost === 0 ? <small><em>Pending</em></small> : <Fragment>$ {cost}.00 </Fragment>}</h6>
			</td>
			<td>
				<Badge 
					className="mr-1" 
					color={urgencyColor(urgency)}>
					Urgency: {urgency}
				</Badge>
				<Badge 
					className="mr-2" 
					color={status === "pending" ? "success" : "danger"}>
					Status: {status}
				</Badge>
			</td>
			<td>
				<Button 
					className="text-nowrap mr-2" 
					color="info" 
					onClick={e => handleEdit(id)}
					>
					Edit
				</Button>
			</td>
		</tr>		  
	)
}

TasksAdminOverview.propTypes = {
	task: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	deleteTask: PropTypes.func.isRequired,
	setAlert: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth,
	task: state.task
})

export default connect(mapStateToProps, {deleteTask, setAlert})(withRouter(TasksAdminOverview));


		
			
		
		