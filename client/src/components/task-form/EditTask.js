import React, {useState, Fragment, useEffect} from 'react';
import {Link, NavLink as NavLinkRRD, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getTaskById, deleteTask, editTask} from '../../actions/task';
import '../dashboard/dashboard.css';


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


const EditTask = ({auth, history, deleteTask, getTaskById, editTask, task:{tasks}}) =>{
	
	// console.log("this is task ", tasks)
	
	const taskId = history.location.state;
	// console.log("thask id ", taskId);
	
	
	let thisTask = tasks.filter(task => task._id === taskId);
	
	[thisTask] = thisTask;
	
	// console.log('this task ', thisTask );
	
	const [formData, setFormData] = useState({
		title: thisTask.title,
		description: thisTask.description,
		urgency: thisTask.urgency,
		agreement: thisTask.status
	});

	
	const {
		title,
		description,
		urgency,
		agreement
	} = formData;
	
	
	
	// console.log('this task ', thisTask);
	// console.log("thask id ", taskId);
	// console.log("from edittask task ", tasks)
	
	
	
	const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
	
	const onSubmit = e => {
		e.preventDefault();
		// console.log(formData);
		let edit = true;
		editTask(formData, history, edit, taskId);
		
		{auth.user.rights === 'admin' ? history.push("/dashboard/overview") : history.push("/dashboard/task")}
		
	}	
	return(
		<div className="Dashboard-content">
			<div className="header bg-gradient-info pb-8 pt-5 pt-md-4">
				<div className="Dashboard-header-container">
					<div className="Dashboard-page-title">
						Dashboard Task Edit
					</div>
				</div>
				<div className="col-xl-8 container-fluid">
					<div className="shadow card">
						<div className="bg-white border-0 card-header">
							<div className="align-items-center row">
								<div className="col-5">
									<h3 className="mb-0">Edit Task</h3>
								</div>
								<div className="col-7 pr-0">
									<div className="justify-content-end EditProfile-update-delete" >
										<div className="">
											<Button 
												className="EditProfile-update-delete-buttons" 
												color="primary"
												type="submit" 
												onClick={e => onSubmit(e)}>
												Update
											</Button>
										</div>
										{/*
										<div className="">
											<Button 
												className="btn btn-danger EditProfile-update-delete-buttons" 
												onClick={e => deleteTask(taskId)}>
												 Delete
											</Button>
										</div>
										*/}
										<NavLinkRRD
											className="bg-transparent EditProfile-close-x"
											size="sm"
											to={auth.user.rights === 'admin' ? ("/dashboard/overview") : ("/dashboard/task")}
											tag={Link}
											 >
											<i class="fa fa-times" aria-hidden="true"></i>
										</NavLinkRRD>
										
									</div>
								</div>
							</div>
						</div>
						<div className="card-body">
							<form className="" onSubmit={e => onSubmit(e)}>
								<div className="">
										<div className="row">
											<div className="col">
												<div className="form-group">
													<label className="form-control-label" htmlFor="input-title">
														Title
													</label>
													<input
														className="form-control-alternative form-control" 
														id="input-title"
														type="text"
														name="title"
														value={title}
														onChange={e => onChange(e)}
													/>
												</div>
											</div>
										</div>
								</div>								
								<hr className="my-4" />
										<div className="">
											<div className="form-group">
												<label>
													Description
												</label>
												<textarea
													className="form-control-alternative form-control"
													rows="4" 
													name="description"
													value={description}
													onChange={e => onChange(e)}
												/>
											</div>
										</div>
								<hr className="my-4" />
										  <div class="form-group">
											<label htmlFor="urgency">Select Urgency</label>
											<select class="form-control" id="urgency"
												name='urgency'
												value={urgency}
												onChange={e => onChange(e)}
												id="urgency"
												>
											  <option>low</option>
											  <option>medium</option>
											  <option>high</option>
											</select>
										  </div>
								
								{ (!auth.loading && auth.user.rights === "admin") && 
									(<div>
									<hr className="my-4" />
										  <div class="form-group">
											<label htmlFor="agreement">Select Agreement</label>
											<select class="form-control"
												name='agreement'
												value={agreement}
												onChange={e => onChange(e)}
												id="agreement"
												>
											  <option>pending</option>
											  <option>locked</option>
											</select>
										  </div>
									
									</div>)
								}
								
										</form>
									</div>
								</div>
						</div>
			</div>
		</div>
	)
}
EditTask.propTypes = {
	getTaskById: PropTypes.func.isRequired,
	deleteTask: PropTypes.func.isRequired,
	editTask: PropTypes.func.isRequired,
	task: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
	task: state.task,
	auth: state.auth
})
export default connect(mapStateToProps, {getTaskById, deleteTask, editTask}) (withRouter(EditTask));