import React, {useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getTasks} from '../../actions/taskDemo';
import {getAccountUpdate} from '../../actions/authDemo';
import Alert from '../layout/Alert';

import Spinner from '../layout/Spinner';
import './dashboard.css';

const DashboardHeader = ({props, user, title, getAccountUpdate, auth: {account}}) => {
	useEffect(()=>{
		getAccountUpdate();
	}, [getAccountUpdate, account]);
	
		
	return (
				<div className="pb-8 pt-5 pt-md-4">
					<div className="mb-2 d-flex justify-content-between">
						<div className="Dashboard-page-title">
							{title}
						</div>

						<div className="ml-3">
							<Alert  />
						</div>

						<div className="d-flex">	
							<div>
								
								<span className="text-dark bg-white rounded mr-3">
									<small className="m-1">Account: ${account}.00</small>
								</span>
							</div>

							<div className="Dashboard-user">
								<span className="avaar avatar-sm rounded-circle">
									<i className="fa fa-user" />
								</span>
								<span className="ml-1 mb-0 text-sm font-weight-bold">{user.name}</span>
							</div>
						</div>

					</div>
				</div>
	)
}

DashboardHeader.propTypes = {
	getAccountUpdate: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	task: state.task,
	auth: state.auth
})

export default connect(mapStateToProps, {getAccountUpdate})(DashboardHeader);

