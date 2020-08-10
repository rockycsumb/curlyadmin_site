import React, {useState, Fragment, useEffect} from 'react';
import {Link, NavLink as NavLinkRRD, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getTaskById, deleteTask, editTask} from '../../actions/taskDemo';
import {getAllUsers} from '../../actions/authDemo';
import DashboardHeader from '../demo-dashboard/DashboardHeader';
import Spinner from '../layout/Spinner';
import '../dashboard/dashboard.css';
import moment from 'moment';


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


const EditTask = ({auth, history, deleteTask, getTaskById, editTask, getAllUsers, task:{tasks}}) =>{
	
	useEffect(()=>{
		getAllUsers();
	},[getAllUsers])
	
	const taskId = history.location.state.id;
	let thisTask = tasks.filter(task => task._id === taskId);
	[thisTask] = thisTask;

	let thisUsersFunds = null;
	if(auth.users !== null){
		thisUsersFunds = auth.users.filter(userT => userT._id === thisTask.user._id)
	}
	
	let dueDateMod = new Date(thisTask.deadlinedate);
		dueDateMod =  dueDateMod.getFullYear() + '-' + 
					  ('0' + (dueDateMod.getMonth()+1)).slice(-2) + '-' +
					  ('0' + dueDateMod.getUTCDate()).slice(-2);
	
	const [formData, setFormData] = useState({
		title: thisTask.title,
		description: thisTask.description,
		urgency: thisTask.urgency,
		agreement: thisTask.status,
		deadlinedate: dueDateMod,
		cost: thisTask.cost
	});
	
	const {
		title,
		description,
		urgency,
		agreement,
		deadlinedate,
		cost
	} = formData;
	
	const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
	
	const onSubmit = e => {
		e.preventDefault();
		// console.log(formData);
		let edit = true;
		editTask(formData, history, edit, taskId);
		
		{auth.user.rights === 'admin' ? history.push(`${history.location.state.prevPath}`) : history.push("/demo/dashboard/task")}
	}
	
	return(
		<div className="Dashboard-content">
			{auth.loading ? <Spinner /> :
			<DashboardHeader
				user={auth.user}
				title='Dashboard Edit Task'
				/>
			}
				<div className="col-xl-8 container-fluid pb-3">
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
										<NavLinkRRD
											className="bg-transparent EditProfile-close-x"
											size="sm"
											to={auth.user.rights === 'admin' ? (`${history.location.state.prevPath}`) : ("/demo/dashboard/task")}
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
								<div class="form-group">
									  <label 
										  htmlFor="input-deadlinedate" 
										  >
										  Deadline Date
									  </label>
								
									  
										<input 
											class="form-control"
											id="input-deadlinedate"
											type="date"
											
											name="deadlinedate"
											value={deadlinedate} 
											onChange={e => onChange(e)}
											required
										/>
									  
									</div>
								{ (!auth.loading && auth.user.rights === "admin") && 
									(
									<div>
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
											  <option>completed</option>
											</select>
										  </div>
										{thisUsersFunds !== null && thisUsersFunds[0].account < cost ? <h3 className="text-danger">Warning user does not have enough funds </h3> : ''}
									<hr className="my-4" />
										<div class="form-group">
											<label htmlFor="cost">Add Cost: </label>	
											<input 
												type="text"
												value={cost}
												onChange={e => onChange(e)}
												name="cost"
												id="cost"
											/>
										</div>
									</div>
									)
								}
								
										</form>
									</div>
								</div>
						</div>
			</div>
		
	)
}
EditTask.propTypes = {
	getTaskById: PropTypes.func.isRequired,
	getALlUsers: PropTypes.func.isRequired,
	deleteTask: PropTypes.func.isRequired,
	editTask: PropTypes.func.isRequired,
	task: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
	task: state.task,
	auth: state.auth
})
export default connect(mapStateToProps, {getTaskById, deleteTask, editTask, getAllUsers}) (withRouter(EditTask));