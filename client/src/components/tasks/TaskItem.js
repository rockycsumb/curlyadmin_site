import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {NavLink, Link, withRouter} from 'react-router-dom';
import Moment from 'react-moment';
import {connect} from 'react-redux';
import {deleteTask} from '../../actions/task';
import {setAlert} from '../../actions/alert';
import Spinner from '../layout/Spinner';

import {
	CardText,
	Badge,
	Button
} from 'reactstrap';

const TaskItem = ({
	auth, 
	task:{_id, status, urgency, description, name, title, user, comment, date},
	deleteTask,
	history,
	setAlert
	}) => {
	
	const urgencyColor = (urgency) =>{
		if (urgency === "low") {
			return "success";
		} else if (urgency === "medium") {
			return "warning";
		} else {
			return "danger"
		}
	}
	
	const handleEdit = (_id) =>{
		history.push({
			pathname: '/dashboard/edit-task',
			state: _id
		})
	}
	return (
			<Fragment>
			
			{(!auth.loading && auth.user._id === user._id || !auth.loading && auth.user.rights === "admin" ) && (
					<div className="card-stats mb-4 card">
			
						<div className="card-body">
							<div className="d-flex justify-content-between">
								<div className="">
									Task Date: <Moment format='MM/DD/YYYY'>{date}</Moment>
								</div>
								
									<div className="">
										{status === "locked" ? (
											<Button color="secondary" size="sm" 
												onClick={e => setAlert('Agreement is locked, cannot be deleted', 'danger')} >
												<i className="fas fa-times" />
											</Button>
										) : (
											<Button color="danger" size="sm" onClick={e => deleteTask(_id)}>
												<i className="fas fa-times" />
											</Button>
										)}
										
									</div>
								
							</div>
							<div className="row">
								<div className="col">
									<h5 className="h2 font-weight-bold mb-0 card-title">{title}</h5>
								</div>
							</div>
							<hr />
							<CardText>
							  {description}
							</CardText>
							<p className="mt-3 mb-0 text-muted text-sm">

								<Badge 
									className="mr-1" 
									color={urgencyColor(urgency)}
									>Urgency: {urgency}
								</Badge>
								<Badge 
									className="mr-2" 
									color={status === "pending" ? "success" : "danger"}
									>Agreement: {status}
								</Badge>
							</p>
							<hr />
							
								<p>
									{status === 'locked' && auth.user.rights !== 'admin' ? (
										<Button 
											className="text-nowrap mr-2" 
											color="secondary" 
											onClick={e => setAlert('Agreement is locked, cannot be edited', 'danger')}
											>
											Edit
										</Button>
									
									) : (
										<Button 
											className="text-nowrap mr-2" 
											color="info" 
											onClick={e => handleEdit(_id)}
											>
											Edit
										</Button>
									)}
									
									<Link to={`/dashboard/task/${_id}`} >See Comments...</Link>
								</p>
							
						</div>
					</div>
				)}
			</Fragment>
	)
}

TaskItem.propTypes = {
	auth: PropTypes.object.isRequired,
	task: PropTypes.object.isRequired,
	deleteTask: PropTypes.func.isRequired,
	setAlert: PropTypes.func.isRequired
}

const mapStateToProps = state =>({
	auth: state.auth
})

export default connect(mapStateToProps, {deleteTask, setAlert})(withRouter(TaskItem));
		