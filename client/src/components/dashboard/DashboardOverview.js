import React, {useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getTasks} from '../../actions/task';
import Spinner from '../layout/Spinner';
import TasksOverview from '../tasks/TasksOverview';
import TasksAdminOverview from '../tasks/TasksAdminOverview';
import TasksCompleted from '../tasks/TasksCompleted';
import TasksUserCompleted from '../tasks/TasksUserCompleted';

import './dashboard.css';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  Progress,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";

const DashboardOverview = ({props, getTasks, auth:{user}, task: {tasks, loading}}) => {
	useEffect(()=>{
		getTasks();
	}, [getTasks]);
	console.log("from dash over tasks ", tasks);
	// console.log("from dash over auth user ", user);
	
	const isEmpty = (tasks) =>{
		let noTasks = true;
		tasks.map(task =>{
			if(task.status !== 'completed'){
				noTasks = false;
			} 
		})
		return noTasks;
	}
	
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
		loading ? <Spinner /> : (
			<Fragment>
			
			
		<div className="Dashboard-content">
			<div className="header bg-gradient-info pb-8 pt-5 pt-md-4">
				<div className="Dashboard-header-container">
					<div className="Dashboard-page-title">
						
						Dashboard Overview
					</div>

					<div className="Dashboard-user">
						<span className="avaar avatar-sm rounded-circle">
							<i className="fa fa-user" />
						</span>
						<span className="ml-1 mb-0 text-sm font-weight-bold">{user && user.name}</span>
					</div>
				</div>
			</div>
			
			{user.rights === 'admin' ? (
				<Fragment>
				<Container className="mt--7" fluid>
					  <Row className="mt-5">
						<Col>
						  <Card className="shadow">
							<CardHeader className="border-0">
							  <Row className="align-items-center">
								<div className="col">
								  <h3 className="mb-0">In Progress Tasks</h3>
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
								  <th scope="col">Deadline</th>
								  <th scope="col">Description</th>
								  <th scope="col">Urgency</th>
								  <th scope="col">Status</th>
								  <th scope="col">Edit</th>
								  <th scope="col">Delete</th>
								</tr>
							  </thead>
							  <tbody>
								 
								  {isEmpty(tasks) ? "no tasks" : ""}
								  
								  {tasks.map(task => {
									  if(task.status !== "completed"){
										  return (
										  <TasksAdminOverview
												user={task.name}
												title={task.title}
												deadlinedate={task.deadlinedate}
												description={task.description}
												urgency={task.urgency}
												status={task.status} 
												id={task._id}
											/>
										  )
									  }
								  })}

							  </tbody>
							</Table>
						  </Card>
						</Col>
					</Row>
				</Container>
				
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
				</Fragment>
			) : (
			<Fragment>
			{/***********  USER OVER VIEW *************/}
					
					
			{/***********  USER OVER VIEW *************/}
			<div className="container-fluid">
					<div className="header-body">
						<div className="row">
							{/*********   START TASK CARDS *********/}
							
							
							{/*********   START TASK CARDS *********/}
							
							
							
							{thisUserHasNoTasksToCompleted(tasks) ? (
								<div className="container mb-2">
									<Link to='/dashboard/add-task' className="btn btn-info">Add Task</Link>
								</div> 
								) : (
								 ""
								)}
							
							{tasks.map(task =>{
								if(task.status !== "completed"){
									return <TasksOverview key={task._id} taskData={task} />
								}
							})}
							
						</div>
					</div>
			</div>
			{/*********   USER COMPLETED TASK *********/}
							
							
			{/*********   USER COMPLETED TASK *********/}
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
				</Fragment>
		)
	)
				
}

DashboardOverview.propTypes = {
	getTasks: PropTypes.func.isRequired,
	task: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	task: state.task,
	auth: state.auth
})

export default connect(mapStateToProps, {getTasks})(DashboardOverview);

