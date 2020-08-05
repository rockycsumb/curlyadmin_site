import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';

import {
	CardText,
	Badge
} from 'reactstrap';

const TasksOverview = ({
	auth,
	taskData: {status, urgency, description, cost, name, title, user, comment, date, duedate}
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
		
	return (
		<Fragment>
			{ (!auth.loading && auth.user._id === user._id || !auth.loading && auth.user.rights === "admin") &&
				(
				<div className="col-lg-6 col-xl-3">
					<div className="card-stats mb-4 mb-xl-0 card">
						<div className="card-body">
							<div className="row">
								<div className="col">
									<h5 className="font-weight-bold mb-0 card-title">{title}</h5>
									<span className="text-muted mb-0">{description}</span>
									<div>Cost: {cost === 0 ? (<small><em>Pending</em></small>
										) : (
											<Fragment>
												$ {cost}.00
											</Fragment>
										)}
									</div>
								</div>
								<div className="col-auto col">
									<div className="bg-danger text-white rounded-circle shadow">
										<i className="fas fa-chart-bar m-1">
										</i>
									</div>
								</div>
							</div>
							<div>
								Due Date: <Moment format='MM/DD/YYYY' add={{day: 1}}>{duedate}</Moment>
							</div>
							<p className="mt-3 mb-0 text-muted text-sm">
								<Badge className="mr-1" color={urgencyColor(urgency)}>Urgency: {urgency}</Badge>
								<Badge className="mr-2" color={status === "pending" ? "success" : "danger"}>Agreement: {status}</Badge>
							</p>
							
						</div>
					</div>
				</div>
			 )}
		</Fragment>	
	)
}

TasksOverview.propTypes = {
	task: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth,
	task: state.task
})

export default connect(mapStateToProps, {})(TasksOverview);