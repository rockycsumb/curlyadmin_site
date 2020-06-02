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
import React from "react";
import {Link, Redirect, NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import emailjs from 'emailjs-com';
// nodejs library that concatenates classes
import classnames from "classnames";






// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import SimpleFooter from "../../components/Footers/SimpleFooter.js";
import './Landing.css';

class Landing extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			name: "",
			email: "",
			message: ""		
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(evt){
		this.setState({
			[evt.target.name]: evt.target.value
		})
	}
	
	handleSubmit(evt){
		evt.preventDefault();
		console.log(this.state);
		
		const {
			name,
			email,
			message
		} = this.state
		
		let templateParams = {
			name: name,
			email: email,
			message: message	
		}
			
		var service_id = "default_service";
		var template_id = "formpage";
		var user_id = "user_XKRqgVmkTkoqnvfTpqZSo"
		
		emailjs.send(service_id, template_id, templateParams, user_id);
		
		
		this.setState({
			name: "",
			email: "",
			message: ""
		})
		
		this.props.history.push('/confirmation')
	}
  
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }

  render() {
	
	  
    return (
      <>
        
        <main ref="main">
          <div className="position-relative">
            {/* shape Hero */}
            <section className="">
              <div className="landingBackground">
               
                
              </div>
              <Container className="py-lg-md d-flex heading-blurb">
                <div className="col px-0">
                  <Row className="justify-content-center">
                    <div>
					   <h1 className="display-3 text-white">
						   {' '}{/*Welcome to Your Virtual Assistance*/}
                      </h1>
					</div>
                     
						
                    
                  </Row>
                </div>
              </Container>
              {/* SVG separator */}
              <div className="separator separator-bottom separator-skew">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  version="1.1"
                  viewBox="0 0 2560 100"
                  x="0"
                  y="0"
                >
                  <polygon
                    className="fill-white"
                    points="2560 0 2560 100 0 100"
                  />
                </svg>
              </div>
            </section>
            {/* 1st Hero Variation */}
          </div>
			
			
          <section className="section section-lg pt-lg-0 mt--200 landing-cards">
            <Container>
              <Row className="justify-content-center">
                <Col lg="12">
                  <Row className="row-grid">
                    <Col lg="4">
                      <Card className="card-lift--hover shadow border-0">
                        <CardBody className="py-5">
                          <div className="icon icon-shape icon-shape-primary rounded-circle mb-4">
                            <i className="fa fa-table" />
                          </div>
                          <h6 className="text-primary text-uppercase">
                            Virtual Assistant
                          </h6>
                          <p className="description mt-3">
                            Administration Support
							<p> </p>
                          </p>
				
							
                          <Button
                            className="mt-4"
                            color="primary"
							  to="/services"
							  tag={Link}
                          >
							   Learn more                   
                          </Button>
						  
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg="4">
                      <Card className="card-lift--hover shadow border-0">
                        <CardBody className="py-5">
                          <div className="icon icon-shape icon-shape-success rounded-circle mb-4">
                            <i className="fa fa-clock-o" />
                          </div>
                          <h6 className="text-success text-uppercase">
                            Bookeeping
                          </h6>
                          <p className="description mt-3">
                            Budget Management and Expense Reports 
                          </p>
     
                          <Button
                            className="mt-lg-4"
                            color="success"
                           to="/services"
							  tag={Link}
                          >
							   Learn more                   
                          </Button>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg="4">
                      <Card className="card-lift--hover shadow border-0">
                        <CardBody className="py-5">
                          <div className="icon icon-shape icon-shape-warning rounded-circle mb-4">
                            <i className="fa fa-laptop" />
                          </div>
                          <h6 className="text-warning text-uppercase">
                            IT Support
                          </h6>
                          <p className="description mt-3">
                            Maintenance, Updates and More
                          </p>
	
                          <Button
                            className="mt-4"
                            color="warning"
                           to="/services"
							  tag={Link}
                          >
							   Learn more                   
                          </Button>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </section>
			
		
			
          <section className="section">
            <Container>
				
              <Row className="justify-content-center">
                <Col className="mb-5 mb-lg-0" lg="6" md="6">
                  <div className="px-4">
                    {/*
					  <img
                      alt="..."
                      className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                      src={require("../../assets/img/theme/homepgpicv1.jpg")}
                      style={{ width: "200px" }}
                    />
					*/}
                    <div className="pt-4 text-center">
                      <h5 className="title">
                        <span className="d-block mb-1">Need administrative support?</span>
                        <small className="h6 text-muted">We can take on any administrative task from big to small. We can make phone calls, prepare itineraries, draft documents, prepare reports based on research and much more! </small>
                      </h5>
                      <div className="mt-3">
                        <Button
                            className="mt-4"
                            color="primary"
                            to="/services"
							tag={Link}
                            
                          >
                            Learn more
                          </Button>

                      </div>
                    </div>
                  </div>
                </Col>
                <Col className="mb-5 mb-lg-0" lg="6" md="6">
                  <div className="px-4">
					 {/*
                    <img
                      alt="..."
                      className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                      src={require("../../assets/img/theme/homepgpic2.jpg")}
                      style={{ width: "200px" }}
                    />
					  */}
                    <div className="pt-4 text-center">
                      <h5 className="title">
                        <span className="d-block mb-1">Not good with numbers?</span>
                        <small className="h6 text-muted">
                          No problem! We can create a budget report and assist you to be a
better stewart of your finances all with the
confidentiality you deserve.
                        </small>
                      </h5>
                      <div className="mt-3">
                        <Button
                            className="mt-4"
                            color="warning"
                             to="/services"
							tag={Link}
                          >
                            Learn more
                          </Button>
				
                      </div>
                    </div>
                  </div>
                </Col>
				  
		
              </Row>
            </Container>
          </section>
			
	
          <section className="section section-lg bg-gradient-default">
			
            <section className="section  pt-lg-0 section-contact-us">
            <Container>
              <Row className="justify-content-center">
                <Col lg="8">
                  <Card className="bg-gradient-secondary shadow">
                    <CardBody className="p-lg-5">
                      <h4 className="mb-1">Got Questions?</h4>
                      <p className="mt-0">
                        Contact us today for a free quote, no obligation. 
                      </p>
                      <FormGroup
                        className={classnames("mt-5", {
                          focused: this.state.nameFocused
                        })}
                      >
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-user-run" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Your name"
                            type="text"
							name="name"
							value={this.state.name}
							onChange={this.handleChange}
                            onFocus={e => this.setState({ nameFocused: true })}
                            onBlur={e => this.setState({ nameFocused: false })}
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup
                        className={classnames({
                          focused: this.state.emailFocused
                        })}
                      >
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-email-83" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Email address"
                            type="email"
							name="email"
							value={this.state.email}
							onChange={this.handleChange}
                            onFocus={e => this.setState({ emailFocused: true })}
                            onBlur={e => this.setState({ emailFocused: false })}
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup className="mb-4">
                        <Input
                          className="form-control-alternative"
                          cols="80"
						  name="message"
						  value={this.state.message}
						  onChange={this.handleChange}
                          placeholder="Type a message..."
                          rows="4"
                          type="textarea"
                        />
                      </FormGroup>
                      <div>
                        <Button
                          block
                          className="btn-round"
                          color="default"
                          size="lg"
                          type="button"
						  onClick={this.handleSubmit}
                        >
                          Send Message
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>
			  
			  
            {/* SVG separator */}
            <div className="separator separator-bottom separator-skew zindex-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-white"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </section>
          
          
        </main>
   
      </>
    );
  }
}

Landing.propTypes={
	isAuthenticated: PropTypes.bool
}

const mapStateToProps = state =>({
	isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing);
