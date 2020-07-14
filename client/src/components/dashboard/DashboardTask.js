import React, {Fragment, useEffect} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getTasks} from '../../actions/task';
import Tasks from '../tasks/Tasks';
import TasksCompleted from '../tasks/TasksCompleted';
import TasksUserCompleted from '../tasks/TasksCompleted';
import TaskItem from '../tasks/TaskItem';
import TaskForm from '../task-form/TaskForm';
import Spinner from '../layout/Spinner';
import Alert from '../layout/Alert';
import './dashboard.css';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  Navbar,
  Media
} from "reactstrap";



const DashboardTasks = ({auth:{user}, task:{tasks, loading}, getTasks}) =>{
	useEffect(()=>{
		getTasks();
	}, [getTasks])
	
	const thisUsersTasks = (tasks) =>{
		let thisUsersTasks = [];
		tasks.map(task =>{
			if(task.user._id === user._id) {
				thisUsersTasks.push(task);
			} 
		})
		return thisUsersTasks;
	}
	
	const thisUsersTasksCompleted = (thisUsersTasks) =>{
		let hasCompletedTasks = false;
		
		if(thisUsersTasks.length > 0){
			thisUsersTasks.map(task =>{
				if(task.status === 'completed'){
					hasCompletedTasks = true;
				}
			})
		}
		return hasCompletedTasks;
	}
	
	const thisUserHasNoTasksToCompleted = (thisUsersTasks) =>{
		let hasNoTasksToComplete = true;
		
		thisUsersTasks.map(task =>{
			if(task.status !== 'completed'){
				hasNoTasksToComplete = false;
			}
		})
		return hasNoTasksToComplete;
	}
	
	return (
		<div className="Dashboard-content">
			<div className="header bg-gradient-info pb-8 pt-5 pt-md-4">
				<div className="Dashboard-header-container">
					<div className="Dashboard-page-title">
						Dashboard Tasks
					</div>
					<div className="ml-3">
						<Alert  />
					</div>
					<div className="Dashboard-user">
						<span className="avaar avatar-sm rounded-circle">
							<i className="fa fa-user" />
						</span>
						<span className="ml-1 mb-0 text-sm font-weight-bold">{user.name}</span>
					</div>
				</div>
				<div className="container mb-2">
					<Link to='/dashboard/add-task' className="btn btn-info">Add Task</Link>
				</div>
				<div className="container-fluid">
					<div className="header-body">
						<div className="row">
							
							{/*********   START TASK CARDS *********/}
							  
								{
									tasks.map(task => {
										if(task.status !== "completed"){
											return(
											<div key={task._id} className="col-lg-6">
												<TaskItem key={task._id} task={task} />
											</div>
											)
										}
									})
								}
						</div>
					</div>
				</div>
			</div>
			
			
			{/*********   PAST TASKS OVER VIEW ************/}
			{user.rights === 'admin' ? (
				<Container className="mt--7" fluid>
						  <Row className="mt-5">
							<Col>
							  <Card className="shadow">
								<CardHeader className="border-0">
								  <Row className="align-items-center">
									<div className="col">
									  <h3 className="mb-0">Tasks Completed</h3>
									</div>
									<div className="col text-right">
									  <Button
										color="primary"
										href="#pablo"
										to="/dashboard/task"
										tag={Link}
										size="sm"
									  >
										Task Dashboard
									  </Button>
									</div>
								  </Row>
								</CardHeader>
								<Table className="align-items-center table-flush" responsive>
								  <thead className="thead-light">
									<tr>
									  <th scope="col">User Name</th>
									  <th scope="col">Title</th>
									  <th scope="col">Description</th>
									  <th scope="col">Urgency</th>
									  <th scope="col">Status</th>
									  <th scope="col">Deadline Date</th>
									</tr>
								  </thead>
								  <tbody>
									  {tasks.map(task => {
										  if(task.status === "completed"){
											  return(
													<TasksCompleted
														user={task.name}
														title={task.title}
														description={task.description}
														urgency={task.urgency}
														status={task.status}
														deadlinedate={task.deadlinedate}
														id={task._id}
													/>
											  )
											}
										}
									)}
								  </tbody>
								</Table>
							  </Card>
							</Col>
						</Row>
				</Container>
			
			):(
				<Fragment>
				{/***********  USER OVER VIEW *************/}
					
					
				{/***********  USER OVER VIEW *************/}
				
				<Container className="mt--7" fluid>
						  <Row className="mt-5">
							<Col>
							  <Card className="shadow">
								<CardHeader className="border-0">
								  <Row className="align-items-center">
									<div className="col">
									  <h3 className="mb-0">Tasks Completed</h3>
									</div>
									<div className="col text-right">
									  <Button
										color="primary"
										href="#pablo"
										to="/dashboard/task"
										tag={Link}
										size="sm"
									  >
										Task Dashboard
									  </Button>
									</div>
								  </Row>
								</CardHeader>
								<Table className="align-items-center table-flush" responsive>
								  <thead className="thead-light">
									<tr>
									  <th scope="col">User Name</th>
									  <th scope="col">Title</th>
									  <th scope="col">Description</th>
									  <th scope="col">Urgency</th>
									  <th scope="col">Status</th>
									  <th scope="col">Deadline Date</th>
									</tr>
								  </thead>
								  <tbody>
									  {thisUsersTasksCompleted(thisUsersTasks(tasks)) ? "" : <tr><td>No tasks</td></tr>}
									  {tasks.map(task => {
										  if(task.status === "completed" && user._id === task.user._id){
											  return(
													<TasksUserCompleted
														user={task.name}
														title={task.title}
														description={task.description}
														urgency={task.urgency}
														status={task.status}
														deadlinedate={task.deadlinedate}
														id={task._id}
													/>
											  )
											}
										}
									)}
								  </tbody>
								</Table>
							  </Card>
							</Col>
						</Row>
				</Container>
				</Fragment>
			)}
			
		</div>
	)
}

DashboardTasks.propTypes = {
	auth: PropTypes.object.isRequired,
	getTasks: PropTypes.func.isRequired,
	task: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth,
	task: state.task
})

export default connect(mapStateToProps, {getTasks})(DashboardTasks);


