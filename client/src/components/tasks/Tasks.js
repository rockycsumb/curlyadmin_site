import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {connect} from 'react-redux';
import {NavLink, Link} from 'react-router-dom';
import Spinner from '../layout/Spinner';

import {
	CardText,
	Badge
} from 'reactstrap';

const Tasks = ({
	auth,
	taskData: {_id, status, urgency, description, name, title, user, comment, date}
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
		{!auth.loading && user._id === auth.user._id && (
		 	<div className="col-lg-6 col-xl-3">
			<div className="card-stats mb-4 mb-xl-0 card">
				<div className="card-body">
					<div>
							Task Date: <Moment format='MM/DD/YYYY'>{date}</Moment>
						</div>
					<div className="row">
						
						<div className="col">
							<h5 className="h2 font-weight-bold mb-0 card-title">{title}</h5>
						</div>
						<div className="col-auto col">
							<div className="icon icon-shape bg-danger text-white rounded-circle shadow">
								<i className="fas fa-chart-bar">
								</i>
							</div>
						</div>
					</div>
					<hr />
					<CardText>
					  {description}
					</CardText>
					<p className="mt-3 mb-0 text-muted text-sm">
					
						<Badge className="mr-1" color={urgencyColor(urgency)}>Urgency: {urgency}</Badge>
						<Badge className="mr-2" color={status === "pending" ? "success" : "danger"}>Agreement: {status}</Badge>
					</p>
					<hr />
					<p>
						<Badge className="text-nowrap mr-2" color="info">Edit</Badge>
						<Link to="/dashboard/task" >See Comments...</Link>
					</p>
				</div>
			</div>
		</div>
		 )}
	</Fragment>
		
)
}

Tasks.propTypes = {
	task: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth
})

export default connect(mapStateToProps, {})(Tasks);