import React, {useState} from "react";
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Alert from '../layout/Alert';
import {login} from '../../actions/authDemo';
import '../../assets/css/login.css';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  NavLink,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

import './Auth.css';

const dasn= `${process.env.REACT_APP_DASN}`;
const dasp= `${process.env.REACT_APP_DASP}`;
const dusn= `${process.env.REACT_APP_DUSN}`;
const dusp= `${process.env.REACT_APP_DUSP}`;


const LoginDemo = ({login, isAuthenticated}) => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	
	const {name, email, password} = formData;
	
	const onChange = e =>{
		setFormData({...formData, [e.target.name]: e.target.value})
	}
	
	const onSubmit = async e =>{
		e.preventDefault();
		login(email, password);
	}
	
	const demoSignOn = (e, emailDemo, passwordDemo) => {
		e.preventDefault();
		login(emailDemo, passwordDemo)
	}
	
	//Redirect if logged login
	if(isAuthenticated){
		return <Redirect to="/demo/dashboard/overview" />
	}
	
	
    return (
      <>
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
				<div className="Login-card shadow border-2">
					<div className="card-header text-center">
						<h3>Sign In</h3>
						<div className="d-flex justify-content-end social_icon">
							{/*<span><i class="fab fa-facebook-square"></i></span>
							<span><i class="fab fa-google-plus-square"></i></span>
							<span><i class="fab fa-twitter-square"></i></span>*/}
						</div>
					</div>
					<div className="card-header text-center">
						<h4>Demo as a:</h4>
						<button type="button" 
							onClick={e => demoSignOn(e, dasn, dasp)} 
							class="btn btn-warning mx-1">
							Demo Admin
						</button> 
							or 
						<button type="button" 
							onClick={e => demoSignOn(e, dusn, dusp)} 
							class="btn btn-warning mx-1">
							Demo User
						</button>
					</div>
					<div className="card-body">
						
						<form onSubmit={e => onSubmit(e)}>
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
									onChange={e => onChange(e)}
									
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
									
								/>
							</div>

							<div className="form-group d-flex justify-content-center mt-3 mb-1">
								  <Button
									className="btn login_btn"
									color="primary"
									type="submit"
								  >
									Sign in
								  </Button>
							</div>

						</form>
					</div>
					<div className="card-footer Login-card-footer">
						<div className="d-flex justify-content-center align-items-center links">
							Don't have an account?
							<NavLink 
									className="text-secondary signup"
									to="/demo/curlyadmin/register"
									tag={Link}
								  >
									<small>Sign Up</small>
							</NavLink>
						</div>
						<div className="d-flex justify-content-center align-items-center links">
							Forgot password? 
							<NavLink 
									className="text-secondary signup"
									to="/demo/curlyadmin/forgotpass"
									tag={Link}
								  >
									<small>Click Here</small>
							</NavLink>
						</div>

						{/*
						<div class="d-flex justify-content-center">
							<a href="#">Forgot your password?</a>
						</div>
						*/}
					</div>
				</div>
			</div>
	</div>
          </section>
        </main>	
        
      </>
    );
  }

LoginDemo.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool
}

const mapStateToProps = state =>({
	isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {login})(LoginDemo);
