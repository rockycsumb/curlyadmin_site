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

import './contact.css';
import emailjs from 'emailjs-com';
// nodejs library that concatenates classes

// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardBody,
  Container,
  Row,
  Col,
  FormGroup,
  Input,
  Label
} from "reactstrap";



class Contact extends React.Component {
	constructor(props){
		super(props);
		
		this.state = {
			plan: this.props.location.state,
			taskcategory: "write_emails",
			deadline: "",
			taskdescription: "",
			name: "",
			email: "",
			phonenumber: "",
			besttime: "",
			prefercall: "",
			both: "",
			preferemail: ""
		}
		
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
			plan,
			taskcategory,
			deadline,
			taskdescription,
			name,
			email,
			phonenumber,
			besttime,
			prefercall,
			both,
			preferemail
		} = this.state
		
		
		
		
		let templateParams = {
			plan: plan,
			taskcategory: taskcategory,
			deadline: deadline,
			taskdescription: taskdescription,
			name: name,
			email: email,
			phonenumber: phonenumber,
			besttime: besttime,
			prefercall: prefercall,
			both: both,
			preferemail: preferemail			
		}
			
		var service_id = "default_service";
		var template_id = "formpage";
		var user_id = "user_XKRqgVmkTkoqnvfTpqZSo"
		
		// emailjs.send(service_id, template_id, templateParams, user_id);
		
		
		this.setState({
			plan: "basic",
			taskcategory: "write_emails",
			deadline: "",
			taskdescription: "",
			name: "",
			email: "",
			phonenumber: "",
			besttime: "",
			prefercall: "",
			both: "",
			preferemail: ""
		})
		
		this.props.history.push({
			pathname: '/confirmation',
			state: templateParams.name
		})
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
			<div style={{height: "80px"}}>
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
	 
		<Container className="contact-header pt-lg-5">
			<div class="justify-content-center text-center row">
					<div class="col-lg-8">
						<h2 class="display-3">Contact Us</h2>
						<p class="lead text-muted">
							Prices are based on price per task. Select how many tasks you will like, then assign your task details. Tasks are an average of 20 minutes, price for projects or more complex items can be separated into tasks. Please contact us, we are happy to assist you for your next plan or project.
						</p>
					</div>
				</div>	
		</Container>
	   <form onSubmit={this.handleSubmit}>
       <section class="section pt-lg-0 section-contact-us">
		   <div class="container">
			   <div class="justify-content-center mt--300 row">
				   <div class="col-lg-10">
					   <div class="bg-gradient-secondary shadow card">
						   <div class="p-lg-5 card-body">
							   <h4 class="mb-1">Enter Task Details</h4>
							   <p class="mt-0">Or just message us</p>
							   <div class="mt-5 form-group">
								   <hr className="my-2" />
								   <h6 class="heading-small text-muted mb-4">Type of Task</h6>
								   
						
								   <FormGroup>
									<Label for="ServiceLevel">Service Level</Label>
									<Input 
										type="select" 
										name="plan" 
										value={this.state.plan}
										onChange={this.handleChange}
										id="ServiceLevel"
									>
									  <option value="basic" >Basic $35.00 - $ 7/Request</option>
									  <option value="premium" >Premium $90.00 - $ 6/Request</option>
									  <option value="daily" >Daily $150.00 - $ 5/Request</option>
									  <option value="One-time" >One-time $8.00/Request</option>
									</Input>
								  </FormGroup>
								   
								   <FormGroup>
									<Label for="taskcategory">Task</Label>
									<Input 
										type="select" 
										name="taskcategory" 
										value={this.state.taskcategory}
										onChange={this.handleChange}
										id="taskcategory"
									>
									  <option value="write_emails" >Place Telephone Call</option>
									  <option value="take_notes" >Make Travel Arrangements</option>
									  <option value="zoom_setup" >Draft Document</option>
									  <option value="other" >Reply to Correspondence</option>
									  <option value="other" >Schedule Meeting</option>
									  <option value="other" >Make a Payment</option>
									  <option value="other" >Other</option>
									</Input>
								  </FormGroup>
								   
								   
								   <hr className="my-3" />
								   <h6 class="heading-small text-muted mb-4">Deadline</h6>
								   <FormGroup>
									<Label for="deadlinedate">Deadline Date</Label>
									<Input 
										type="date" 
										name="deadline"
										value={this.state.deadline}
										onChange={this.handleChange}
										id="deadlinedate"
									/>
									  
									   
									   {/*<input type="date" name="from" value={from} onChange={e => onChange(e)}/>*/}
								  </FormGroup>
								   
							   </div>
								   
								<hr className="my-3" />
								<h6 class="heading-small text-muted mb-4">Task Description</h6>
								<div class="mb-4 form-group">
								 	<Label for="deadlinedate">Task Details</Label>
								   <textarea 
									   cols="80" 
									   name="taskdescription" 
									   value={this.state.taskdescription}
									   onChange={this.handleChange}
									   placeholder="Type a message..." 
									   rows="4" 
									   class="form-control-alternative form-control"
									>
								   </textarea>
							   </div>
							 
								<hr className="my-3" />
								<h6 class="heading-small text-muted mb-4">Your Contact Info</h6>
								   {/*needs to include 
								   name, phone, 
								   email 
								   and 
								   best time to reach
									Prefer, phone call or text or email */}
							<Container className="pl-0">
								<Row className="">
									<Col className="col-md-6">
										<div class="form-group">
											<Label for="name">Your Name</Label>
										   <div class="input-group-alternative input-group">
											   <input 
												   placeholder="Your name" 
												   type="text" 
												   id="name"
												   name="name"
												   value={this.state.name}
												   onChange={this.handleChange}
												   class="form-control" 
												/>
										   </div>
									   </div>
									</Col>
								
									<Col className="col-md-6">
									   <div class="form-group">
										   <Label for="phonenumber">Phone Number</Label>
										   <div class="input-group-alternative input-group">
											   <input 
												   placeholder="Phone Number" 
												   type="text" 
												   id="phonenumber"
												   name="phonenumber"
												   value={this.state.phonenumber}
												   onChange={this.handleChange}
												   class="form-control" 
												/>
										   </div>
									   </div>
									</Col>
								</Row>
								   
							</Container>
								
							<Container className="pl-0">
								<Row>
									<Col className="col-md-6">
										<div class="form-group">
										   <div class="input-group-alternative input-group">
											   <input 
												   placeholder="Email address" 
												   type="email"
												   id="email"
												   name="email"
												   value={this.state.email}
												   onChange={this.handleChange}
												   class="form-control" 
												 />
										   </div>
							   			</div>
									</Col>
									
									<Col className="col-md-6">
										<div class="form-group">
										   <div class="input-group-alternative input-group">
											   <input 
												   placeholder="Best Time To Reach You" 
												   type="text"
												   id="besttime"
												   name="besttime"
												   value={this.state.besttime}
												   onChange={this.handleChange}
												   class="form-control" 
												 />
										   </div>
							   			</div>
									</Col>
								
								</Row>   
							</Container>

							   <Container>
								<h6 class="heading-small text-muted mb-4">Preferred way to contact</h6>
							   	<Row>
									<div className="custom-control custom-checkbox mb-3">
										  <input
											className="custom-control-input"
											id="prefercall"
											name="prefercall"
											value={"prefercall"}
											onChange={this.handleChange}
											type="checkbox"
										  />
										  <label className="custom-control-label mr-4" htmlFor="prefercall">
											Phone Call
										  </label>
								   </div>
									
									<div className="custom-control custom-checkbox mb-3 mr-4">   
											<input
												className="custom-control-input"
												name="preferemail"
												id="preferemail"
												value={"preferemail"}
												onChange={this.handleChange}
												type="checkbox"
												
												
											  />
										  <label className="custom-control-label" htmlFor="preferemail">
											Email
										  </label>
									</div>
									
									<div className="custom-control custom-checkbox mb-3">   
										   <input
												className="custom-control-input"
												id="both"
											   	name="both"
											   	value={"both"}
												onChange={this.handleChange}
												type="checkbox"
											  />
										  <label className="custom-control-label mr-5" htmlFor="both">
											both
										  </label>
								   </div>
								</Row>
							   </Container>
							   
							   
							   <div>
								   <button 
									   type="button" 
									   class="btn-round btn btn-default btn-lg"
									   onClick={this.handleSubmit}
									>
									   Send Message
								   </button>
							   </div>
							
						   </div>
					   </div>
				   </div>
			   </div>
		   </div>
		</section>
			</form>
        </main>
      </>
    );
  }
}

export default Contact;
