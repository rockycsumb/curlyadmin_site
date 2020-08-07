import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {NavLink as NavLinkRRD, Link, withRouter} from 'react-router-dom';
import Moment from 'react-moment';
import {connect} from 'react-redux';
import {deleteTask} from '../../actions/taskDemo';
import Spinner from '../layout/Spinner';

import {
	CardText,
	Badge,
	Button
} from 'reactstrap';

const TaskItem = ({
	auth, 
	task:{_id, status, urgency, description, name, title, user, comment, date, cost, deadlinedate},
	deleteTask,
	history,
	showActions
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
			pathname: '/demo/dashboard/edit-task',
			state: _id
		})
	}

	return (
			<Fragment>
			
					<div className="card-stats mb-4 card">
						<div className="card-body">
							<div className="d-flex justify-content-between">
								<div className="">
									Task Date: <Moment format='MM/DD/YYYY'>{date}</Moment>
								</div>
								<div>
									Deadline Date: <Moment format='MM/DD/YYYY' add={{day: 1}}>{deadlinedate}</Moment>
								</div>
								<div>
									{showActions && <Fragment>
										<NavLinkRRD
												className="bg-transparent Comment-close-x"
												size="sm"
												to="/demo/dashboard/task"
												activeStyle={{
													borderLeft: "0",
													color: "red"
												  }}
												tag={Link}
												 >
												<i class="fa fa-times" aria-hidden="true"></i>
										</NavLinkRRD>
									</Fragment>}	
								</div>
							</div>
							
							<div className="row">
								<div className="col">
									<h5 className="h2 font-weight-bold mb-0 card-title">{title}</h5>
								</div>
								<div>
									<h5>Cost: {cost === 0 ? (<small><em>Pending</em></small>
										) : (
											<Fragment>
												$ {cost}.00
											</Fragment>
										)}</h5>
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
							
							{/*
							{showActions && <Fragment>
								<p>
									<Button 
										className="text-nowrap mr-2" 
										color="info" 
										onClick={e => handleEdit(_id)}
										>
										Edit
									</Button>
									<Link to={`/dashboard/task/${_id}`} >See Comments...</Link>
								</p>
							</Fragment>}
							*/}
						</div>
					</div>
				
			</Fragment>
	)
}

TaskItem.defaultProps = {
	showActions: true
}

TaskItem.propTypes = {
	auth: PropTypes.object.isRequired,
	task: PropTypes.object.isRequired,
	deleteTask: PropTypes.func.isRequired
}

const mapStateToProps = state =>({
	auth: state.auth
})

export default connect(mapStateToProps, {deleteTask})(withRouter(TaskItem));
		