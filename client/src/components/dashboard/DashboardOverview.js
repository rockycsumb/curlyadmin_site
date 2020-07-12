import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getTasks} from '../../actions/task';
import Spinner from '../layout/Spinner';
import TasksOverview from '../tasks/TasksOverview';
import TasksAdminOverview from '../tasks/TasksAdminOverview';
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
	return (
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
			<div>
						
			</div>
			
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
								  <th scope="col">Description</th>
								  <th scope="col">Urgency</th>
								  <th scope="col">Status</th>
								  <th scope="col">Edit</th>
								  <th scope="col">Delete</th>
								</tr>
							  </thead>
							  <tbody>
								  {tasks.map(task => (
									<TasksAdminOverview
										user={task.name}
										title={task.title}
										description={task.description}
										urgency={task.urgency}
										status={task.status} 
										id={task._id}
									/>
								))}

							  </tbody>
							</Table>
						  </Card>
						</Col>
					</Row>
				</Container>
		</div>
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

