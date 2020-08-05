
import React from "react";
import '../../assets/css/contact.css';
import emailjs from 'emailjs-com';
import ScrollAnimation from 'react-animate-on-scroll';
import Recaptcha from 'react-recaptcha';

// reactstrap components
import {
  Button,
  Container,
  Row,
  Col,
  FormGroup,
  Input,
  Label
} from "reactstrap";

const EMAIL_JS_KEY = `${process.env.REACT_APP_EMAILJS_API_KEY}`;
const recapKey = `${process.env.REACT_APP_RECAPTCHA}`;

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
			preferemail: "",
			isVerified: false,
			verifyRequired: false
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
		this.verifyCallback = this.verifyCallback.bind(this);
	}
	
	handleChange(evt){
		this.setState({
			[evt.target.name]: evt.target.value
		})
	}
	
	recaptchaLoaded() {
		console.log("captcha loaded succesfully")
	}
	
	handleSubmit(evt){
		
		evt.preventDefault();
		
		// if(!this.state.isVerified) {
		// 	this.setState({
		// 		verifyRequired: true
		// 	})
		// } else {
		
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
		var user_id = EMAIL_JS_KEY;
		
		emailjs.send(service_id, template_id, templateParams, user_id);
		
		this.setState({
			plan: "Basic",
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
	// }
	
	 verifyCallback(response){
	  if(response){
		  this.setState({
			  isVerified: true,
			  verifyRequired: false
		  })
	  }
  }
  render() {
	 return (
      <>
        <main ref="main" className="">
			<div style={{height: "80px"}}>
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
		<section className="mt-4 py-lg-4 services-background">
            <Container>
				<div className="justify-content-center text-center mb-lg-1 row">
					<div className="col-lg-8">
						<h2 className="contact-header mb-3 text-color-default">Contact Us</h2>
					</div>
				</div>
			</Container>
		</section>
	
		<ScrollAnimation animateIn="fadeInUp">
	   <form onSubmit={this.handleSubmit}>
       <section class="section pt-lg-0 section-contact-us">
		   <div class="container">
			   <div class="justify-content-center mt--300 row">
				   <div class="col-lg-10">
					   <div class="bg-gradient-secondary shadow card">
						   <div class="p-lg-5 card-body">
							   <h4 class="mb-0">Task Details</h4>
							   <div class="mt-3 form-group">
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
									  <option value="Basic" >Basic $35</option>
									  <option value="Super" >Super $90</option>
									  <option value="Curly" >Curly $150</option>
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
									  <option value="reply_to_correspondence" >Reply to Correspondence</option>
									  <option value="schedule_meeting" >Schedule Meeting</option>
									  <option value="make_a_payment" >Make a Payment</option>
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
									   maxLength="500"
									>
								   </textarea>
									<div>
										Limit: {this.state.taskdescription.length} / 500
									</div>
							   </div>
							  							 
								<hr className="my-3" />
								<h6 class="heading-small text-muted mb-4">Your Contact Info</h6>
								  
							<Container className="pl-0">
								<Row className="">
									<Col className="col-md-6">
										<div class="form-group">
											<Label for="name">Your Name</Label>
										   <div class="input-group-alternative input-group">
											   <input 
												   placeholder="Your Name (required)" 
												   type="text" 
												   id="name"
												   name="name"
												   value={this.state.name}
												   onChange={this.handleChange}
												   class="form-control" 
												   required
												/>
										   </div>
									   </div>
									</Col>
								
									<Col className="col-md-6">
									   <div class="form-group">
										   <Label for="phonenumber">Phone Number</Label>
										   <div class="input-group-alternative input-group">
											   <input 
												   placeholder="Phone Number (required)" 
												   type="text" 
												   id="phonenumber"
												   name="phonenumber"
												   value={this.state.phonenumber}
												   onChange={this.handleChange}
												   class="form-control" 
												   required
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
												   placeholder="Email Address (required)" 
												   type="email"
												   id="email"
												   name="email"
												   value={this.state.email}
												   onChange={this.handleChange}
												   class="form-control" 
												   required
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
							   <h6 class="heading-small text-muted mb-2 mt-4">Preferred way to contact</h6>

							   <Container>
								
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
							 <div className="mb-3 justify-content-center row">
								
								 {/*
								<div>
									<div className={this.state.verifyRequired ? `please-verify` : "please-verify-hide"}>
										Please verify
									</div>
									<div  className={this.state.verifyRequired ? `recaptcha-border` : ""}>
										<div className="m-1">
											 <Recaptcha
												sitekey="6LdN0KQZAAAAAH104p0wqY4tUhL59v_BL2q7ZCXy"
												render="explicit"
												onloadCallback={this.recaptchaLoaded}
												verifyCallback={this.verifyCallback}
											  />
										</div>
									</div>
								</div>
								*/}
								
							  </div>
							  
							   <div>
								   <Button
									  block
									  className="btn-round bg-color-default btn-rollover-color-default"
									  size="lg"
									  type="submit" 
									>
									  Send Message
									</Button>
							   </div>
							
						   </div>
					   </div>
				   </div>
			   </div>
		   </div>
		</section>
			</form>
			</ScrollAnimation>
        </main>
      </>
    );
  }
}

export default Contact;
