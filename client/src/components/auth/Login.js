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
import PropTypes from 'prop-types';
import Alert from '../layout/Alert';
import {login} from '../../actions/auth';
import Facebook from './Facebook';
import Google from './Google';


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


const Login = ({login, isAuthenticated}) => {
	
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
	
	//Redirect if logged login
	if(isAuthenticated){
		return <Redirect to="/dashboard/overview" />
	}
	
	

    return (
      <>
        <main>
          <section className="section section-shaped section-lg">
            <div className="shape  registerBackground">
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
                        <small>Sign in with</small>
                      </div>
                      <div className="btn-wrapper text-center">
						  
						  
           {/*----GOOGLE LOGIN----*/}             
                          <Google />
						  
						  
			{/*----FACEBOOK LOGIN----*/}
						  <Facebook />
						  
						
                      </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                      <div className="text-center text-muted mb-4">
                        <small>Or sign in with credentials</small>
                      </div>
						
						
                      <Form role="form" onSubmit={e => onSubmit(e)}>
                        <FormGroup className="mb-3">
                          <InputGroup className="input-group-alternative">
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
								onChange={e => onChange(e)}
								required
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
							  minLength='7'
							  required
                            />
                          </InputGroup>
                        </FormGroup>
						  {/*<div className="custom-control custom-control-alternative custom-checkbox">
                          <input
                            className="custom-control-input"
                            id=" customCheckLogin"
                            type="checkbox"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor=" customCheckLogin"
                          >
                            <span>Remember me</span>
                          </label>
                        </div>*/}
                        <div className="text-center">
                          <Button
                            className="my-4"
                            color="primary"
                            type="submit"
                          >
                            Sign in
                          </Button>
                        </div>
                      </Form>
						
						
						
                    </CardBody>
                  </Card>
                  <Row>
					  {/*<Col xs="6">
                      <a
                        className="text-light"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        <small>Forgot password?</small>
                      </a>
                    </Col>*/}
                    <Col xs="6">
                      <NavLink 
                        className="text-light"
                        to="/register"
						tag={Link}
                      >
                        <small>Create new account</small>
                      </NavLink>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
        
      </>
    );
  }

Login.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool
}

const mapStateToProps = state =>({
	isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {login})(Login);
