import React, {useState} from "react";
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {setAlert} from '../../actions/alert';
import {register} from '../../actions/authDemo';
import PropTypes from 'prop-types';
import Alert from '../layout/Alert';
import '../../assets/css/register.css';

// reactstrap components
import {
  Button,
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  NavLink
} from "reactstrap";

import './Auth.css';

const RegisterDemo = ({setAlert, register, isAuthenticated, history}) => {	
	const [formData, setFormData] = useState({
		name:'',
		email: '',
		password: '',
		password2:'',
		privacy: ''
	});
	
	const [modal, setModal] = useState(false);
  	const toggle = () => setModal(!modal);
	
	const {name, email, password, password2, privacy} = formData;
	
	const onChange = e =>{
		setFormData({...formData, [e.target.name]: e.target.value})
	}
	
	const handleCheckbox = e =>{
		setFormData({...formData, privacy: e.target.checked.toString()})
	}
		
	const onSubmit = async e =>{
		e.preventDefault();		
		
		// if(!privacy){
		// 	setAlert('Privacy needs to be agreed to', 'danger');
		// 	console.log("Privacy agreement must be confirmed")
		// } else
				
		if(password !== password2){
			setAlert('Passwords dont match', 'danger');
		} else {
			register({name, email, password, privacy}, history)
		}
	}
	
	
	console.log("from register page ", history.location.state);
	
	
	//Redirect if logged login
	if(isAuthenticated){
		return <Redirect to="/dashboard/overview" />
	}
	
	
    return (
          <main className="Login-main">
          <section className="">
            <div className="space">
            </div>
            <div className="container">
				<div className="d-flex justify-content-center">
					<div className="alert-box-register">
						<Alert />
					</div>
				</div>
				<div className="d-flex justify-content-center h-100">
					<div className="register-card shadow border-2">
							<div className="card-header text-center">
								<h3>Sign Up</h3>
								<div className="d-flex justify-content-end social_icon">
									{/*<span><i class="fab fa-facebook-square"></i></span>
									<span><i class="fab fa-google-plus-square"></i></span>
									<span><i class="fab fa-twitter-square"></i></span>*/}
								</div>
							</div>
							<div className="card-body">
								<form onSubmit={e => onSubmit(e)}>
									<div className="input-group form-group mt-3">
										<div className="input-group-prepend">
											<span className="input-group-text"><i className="fas fa-user"></i></span>
										</div>
										<input 
											placeholder="Name"
											className="form-control"
											type="text" 
											name='name' 
											value={name}
											onChange={e =>onChange(e)}
											required
										/>										
									</div>
																
									<div className="input-group form-group">
										<div className="input-group-prepend">
											<span className="input-group-text"><i className="fas fa-user"></i></span>
										</div>
										<input 
											placeholder="Email"
											className="form-control"
											type="email"
											name='email'
											value={email}
											onChange={e =>onChange(e)}
											required
										/>
									</div>
									<div className="input-group form-group">
										<div className="input-group-prepend">
											<span className="input-group-text"><i className="fas fa-key"></i></span>
										</div>
										<input 
											placeholder="Password"
											className="form-control"
											type="password"
											autoComplete="off"
											name='password'
											value={password}
											onChange={e =>onChange(e)}
											minLength="7"
											required
										/>
									</div>
									<div className="input-group form-group">
										<div className="input-group-prepend">
											<span className="input-group-text"><i className="fas fa-key"></i></span>
										</div>
										<input 
											placeholder="Confirm Password"
											className="form-control"
											type="password"
											name='password2'
											autoComplete="off"
											value={password2}
											onChange={e =>onChange(e)}
											minLength="7"
											required
										/>
									</div>
									
									
									
									
									<div className="custom-control custom-control-alternative custom-checkbox">
									  <input
										className="custom-control-input"
										id="customCheckRegister"
										type="checkbox"
										name='privacy'
										onClick={e =>handleCheckbox(e)}
									  />
										
										
									  <label
										className="custom-control-label"
										htmlFor="customCheckRegister"
									  >
										<span>
										  I agree with the <Button onClick={toggle} color="link" className="p-0 m-0">Privacy</Button>
										</span>
									  </label>
									</div>
										<Modal isOpen={modal} toggle={toggle} >
											<ModalHeader toggle={toggle}>Privacy Policy</ModalHeader>
											<ModalBody>
											  -Upon registering we save information into a database <br />
								- Information is not sold <br />
								- Tasks and communication is stored for record purposes  <br />
								- Once a task is agreed upon it is locked and cannot be changed  <br />
											</ModalBody>
											<ModalFooter>
											  <Button color="primary" onClick={toggle}>Close</Button>
											</ModalFooter>
										</Modal>
									
									
									
									<div className="form-group d-flex justify-content-center mt-3 mb-1">
									  <Button
										className="btn register-create-btn mt-4"
										color="primary"
										type="submit"
									  >
										Create account
									  </Button>
									</div>
								</form>
							</div>
								<div className="card-footer card-footer-space">
									<div className="d-flex justify-content-center align-items-center links">
										  <small>
											Already have an account? 
											  <span>
												  <NavLink
													  className="signin"
													  to="/login" 
													  tag={Link}
													  >Sign In
												  </NavLink>
											  </span>
										  </small>
									</div>
								</div>
					</div>
				</div>
			  </div>
          </section>
        </main>
      
    );
  }

RegisterDemo.propTypes = {
	
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = state =>({
	
	isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {setAlert, register})(RegisterDemo);
