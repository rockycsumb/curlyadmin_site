import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {connect} from 'react-redux';
import {getTasks} from '../../actions/taskDemo';
import {NavLink, Link} from 'react-router-dom';
import Spinner from '../layout/Spinner';
import TaskItem from '../tasks/TaskItem';

import {
	CardText,
	Badge
} from 'reactstrap';

const Tasks = ({getTasks, task: {tasks, loading}}) =>{
	useEffect(()=>{
		getTasks();
	}, [getTasks])
	
	return loading ? <Spinner /> : (
		<div className="container-fluid">
			<div className="header-body">
				<div className="row">
					{tasks.map(task =>(
						<div className="col-lg-6">
							<TaskItem key={task._id} task={task} />
						</div>
					))}
				</div>
			</div>
		</div>
		);	
}

Tasks.propTypes = {
	task: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	getTasks: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth,
	task: state.task
})

export default connect(mapStateToProps, {getTasks})(Tasks);