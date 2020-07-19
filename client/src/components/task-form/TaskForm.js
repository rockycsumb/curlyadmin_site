import React, {useState} from 'react';
import {Link, withRouter, NavLink as NavLinkRRD} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {addTask} from '../../actions/task';
import DashboardHeader from '../dashboard/DashboardHeader';
import Spinner from '../layout/Spinner';
import '../dashboard/dashboard.css';

// reactstrap components
import { Button } from "reactstrap";

const TaskForm = ({addTask, history, auth:{user, loading}}) =>{

	const [formData, setFormData] = useState({
		title: '',
		description: '',
		urgency: 'low',
		deadlinedate: '',
		status: 'pending'		
	});
	
	const {
		title,
		description,
		urgency,
		deadlinedate
	} = formData;
	
	const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
	
	const onSubmit = e => {
		e.preventDefault();
		addTask(formData, history);
	}
	
	return(
		<div className="Dashboard-content">
			{loading ? <Spinner /> : 
			<DashboardHeader 
				user={user}
				title="Dashboard Add Task"
				/>
			}
				
				<div className="col-xl-8 container-fluid mb-3">
					<div className="shadow card">
						<div className="bg-white border-0 card-header">
							<div className="align-items-center row">
								<div className="col-6 pr-0">
									<h3 className="mb-0">Add a Task</h3>
								</div>
								<div className="text-right col-6">
									<Button 
										className="btn-round  bg-color-default btn-rollover-color-default"
										type="submit" 
										size="sm"
										onClick={e => onSubmit(e)} >Create Task</Button>
									<NavLinkRRD
										className="bg-transparent EditProfile-close-x"
										size="sm"
										to="/dashboard/task"
										tag={Link}
										 >
									<i class="fa fa-times" aria-hidden="true"></i>
									</NavLinkRRD>
								</div>
							</div>
						</div>
						<div className="card-body">
							<form className="" onSubmit={e => onSubmit(e)}>
								<h6 className="heading-small text-muted mb-4">Task information</h6>
								<div className="pl-lg-4">
										<div className="row">
											<div className="col-md-12">
												<div className="form-group">
													<label className="form-control-label" htmlFor="input-title">
														Title
													</label>
													<input
														className="form-control-alternative form-control" 
														id="input-title"
														type="text"
														placeholder="title"
														name="title"
														value={title}
														required
														onChange={e => onChange(e)}
													/>
												</div>
											</div>
										</div>
								</div>
										<h6 className="heading-small text-muted mb-4">
											Task Description
										</h6>
										<div className="pl-lg-4">
											<div className="form-group">
												<label>
													Task Description
												</label>
												<textarea
													className="form-control-alternative form-control"
													rows="4" 
													placeholder="Say a few words of the task ..."
													name="description"
													value={description}
													required
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
											required
											>
										  <option>low</option>
										  <option>medium</option>
										  <option>high</option>
										</select>
									  </div>
									
									<hr className="my-4" />
									<div class="form-group row">
									  <label htmlFor="input-deadlinedate" class="col-2 col-form-label">
										  Deadline Date
									  </label>
									  <div class="col-10">
										<input 
											class="form-control"
											id="input-deadlinedate"
											type="date"
											placeholder="Deadline Date"
											name="deadlinedate"
											value={deadlinedate} 
											onChange={e => onChange(e)}
											required
										/>
									  </div>
									</div>
									<hr className="my-4" />	
							</form>
						</div>
					</div>
				</div>
			</div>
	)
}

TaskForm.propTypes = {
	addTask: PropTypes.func.isRequired,	
	auth: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
	auth: state.auth
})

export default connect(mapStateToProps, {addTask})(withRouter(TaskForm));