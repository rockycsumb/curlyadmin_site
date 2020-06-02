/*!

=========================================================
* Argon Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {useState} from "react";
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {setAlert} from '../../actions/alert';
import {register} from '../../actions/auth';
import Facebook from './Facebook';
import Google from './Google';


import PropTypes from 'prop-types';
import Alert from '../layout/Alert';

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
// core components
import SimpleFooter from "../Footers/SimpleFooter.js";


const Register = ({setAlert, register, isAuthenticated}) => {
	
	const [formData, setFormData] = useState({
		name:'',
		email: '',
		password: '',
		password2:'',
		privacy: ''
	});
	
	const {name, email, password, password2, privacy} = formData;
	
	const onChange = e =>{
		
		setFormData({...formData, [e.target.name]: e.target.value})
		
	}
	
	const handleCheckbox = e =>{
		console.log("this is from handlebox before setform ", e.target.checked);
		
		setFormData({...formData, privacy: e.target.checked.toString()})
		
	}
	
	
	const onSubmit = async e =>{
		e.preventDefault();
		console.log("from onSubmit privacy check ", formData.privacy);
		
		// if(!privacy){
		// 	setAlert('Privacy needs to be agreed to', 'danger');
		// 	console.log("Privacy agreement must be confirmed")
		// } else 
		
		if(password !== password2){
			setAlert('Passwords dont match', 'danger');
		} else {
			register({name, email, password, privacy})
		}
	}
	
	//Redirect if logged login
	if(isAuthenticated){
		return <Redirect to="/dashboard/overview" />
	}
	
	

    return (
      <>
        <main>
          <section className="section section-shaped section-lg">
            <div className="shape registerBackground">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <Container className="pt-lg-7">
				
				<Alert />
				
			  
              <Row className="justify-content-center">
                <Col lg="5">
                  <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-white pb-5">
                      <div className="text-muted text-center mb-3">
                        <small>Sign up with</small>
                      </div>
                      <div className="text-center">
						  
                       {/*----GOOGLE LOGIN----*/}             
                          <Google />
						  
						  
						{/*----FACEBOOK LOGIN----*/}
						  <Facebook />
						  
						  
                      </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                      <div className="text-center text-muted mb-4">
                        <small>Or sign up with credentials</small>
                      </div>
						
						
                      <Form role="form" onSubmit={e => onSubmit(e)}>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-hat-3" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input 
								placeholder="Name" 
								type="text" 
								name='name' 
								value={name}
								onChange={e =>onChange(e)}
							
							/>
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input 
								placeholder="Email" 
								type="email"
								name='email'
								value={email}
								onChange={e =>onChange(e)}
								
							/>
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Password"
                              type="password"
                              autoComplete="off"
							  name='password'
							  value={password}
							  onChange={e =>onChange(e)}
							  
                            />
                          </InputGroup>
                        </FormGroup>
						  <FormGroup>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Confirm Password"
                              type="password"
							  name='password2'
                              autoComplete="off"
							  value={password2}
							  onChange={e =>onChange(e)}
							  
                            />
                          </InputGroup>
                        </FormGroup>
						{/*
                        <div className="text-muted font-italic">
                          <small>
                            password strength:{" "}
                            <span className="text-success font-weight-700">
                              strong
                            </span>
                          </small>
                        </div>
						*/}
                        <Row className="my-4">
                          <Col xs="12">
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
                                  I agree with the{" "}
                                  <a
                                    href="#pablo"
                                    onClick={e => e.preventDefault()}
                                  >
                                    Privacy Policy
                                  </a>
                                </span>
                              </label>
                            </div>
                          </Col>
                        </Row>
						  
                        <div className="text-center">
                          <Button
                            className="mt-4"
                            color="primary"
                            type="submit"
                          >
                            Create account
                          </Button>
                        </div>
                      </Form>
						
						
						<div className="text-muted text-center mt-2">
                          <small>
                            Already have an account? <span><NavLink to="/login" tag={Link}>Sign In</NavLink></span>
                          </small>
                        </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
        
      </>
    );
  }

Register.propTypes = {
	
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = state =>({
	isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {setAlert, register})(Register);
