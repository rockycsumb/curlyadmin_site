import React, {useEffect, Fragment} from 'react'
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getTaskById} from '../../actions/taskDemo'
import Spinner from '../layout/Spinner';
import TaskItemForComment from './TaskItemForComment';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import Alert from '../layout/Alert';



const Task = ({getTaskById, task: {task, loading}, match}) =>{
	
	useEffect(()=>{
		getTaskById(match.params.id);
	}, [getTaskById, match.params.id])
	
	return (
		<div className="Dashboard-content">
			<div className="header bg-gradient-info pb-8 pt-5 pt-md-4">
				<div className="Dashboard-header-container">
					<div className="Dashboard-page-title">
						Dashboard View Comments 
					</div>
					<div className="ml-3">
						<Alert  />
					</div>
					<div className="Dashboard-user">
						{/*
						<span className="avaar avatar-sm rounded-circle">
							<i className="fa fa-user" />
						</span>
						<span className="ml-1 mb-0 text-sm font-weight-bold">blank</span>
						*/}
					</div>
				
				</div>
				<div className="container-fluid">
					<div className="header-body pb-4">
						
						{loading || task === null ? (<Spinner /> 

						):(
							<Fragment>
							{/*<Link to="/dashboard/task">
									 -Back To Tasks
								</Link>
							*/}
								<TaskItemForComment task={task} showActions={true} />
							
						<div className="card-stats mb-4 card">
							<div className="card-body">
								<CommentForm taskId={task._id} />
								<div>
									{task.comment.map(comment => (
										<CommentItem 
											key={comment._id} 
											comment={comment} 
											taskId={task._id} 
											/>
									))}
								</div>
							</div>
						</div>
							</Fragment>
							)
						}
					</div>
				</div>
				
			</div>
		</div>
	)
}

Task.propTypes = {
	getTaskById: PropTypes.func.isRequired,
	task: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
	task: state.task
})

export default connect(mapStateToProps, {getTaskById})(Task);