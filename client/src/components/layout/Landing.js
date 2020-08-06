import React from "react";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import emailjs from 'emailjs-com';
import ScrollAnimation from 'react-animate-on-scroll';
import '../../assets/css/Landing.css';
import Recaptcha from 'react-recaptcha';

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

//EJ U
const EJ_U = `${process.env.REACT_APP_EJ_U}`;
const recapU = `${process.env.REACT_APP_RECAP_U}`;

const words = {
	english: {
		administratives_support: "Administrative Support",
		learn_more: "Learn More",
		send_message: "Send Messge"
	},
	spanish: {
		administratives_support: "apoyo a la administraciรณn",
		learn_more: "Aprende Mas",
		send_message: "Spanish name for send message"
	}
}

class Landing extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			name: "",
			email: "",
			message: "",
			isVerified: false,
			verifyRequired: false
		};
		
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
		
		if(!this.state.isVerified) {
			this.setState({
				verifyRequired: true
			})
		} else {
			
		evt.preventDefault();
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
			
		var service_id = "gmail";
		var template_id = "formpage";
		var user_id = EJ_U;
		
		emailjs.send(service_id, template_id, templateParams, user_id);
		
		this.setState({
			name: "",
			email: "",
			message: ""
		})

		this.props.history.push({
			pathname: '/confirmation',
			state: templateParams.name
		})
	  }
	}
	
	verifyCallback(response){
	  if(response){
		  this.setState({
			  isVerified: true,
			  verifyRequired: false
		  })
	  }
  }

  render() {
	  
    let languageSelected = "english";
    const {language} = this.props;
    
	
	if(language !== undefined)
		{
			languageSelected = language;
		}
	
	const {learn_more, administratives_support} = words[languageSelected];
	 	
    return (
      <>
        <main ref="main">
          <div>
            <section className="pb-100">
              <div className="landingBackground">
              </div>
            </section>
          </div>
					  
		  {/*  THREE CARDS */}
		 <ScrollAnimation animateIn="fadeIn">
          <section className="landing-cards">
            <Container>
              <Row className="justify-content-center">
                <Col lg="12">
                  <Row className="row-grid justify-content-center">
                    <Col lg="4">
                      <Card className="card-up-hover landing-card shadow mb-5 border-0">
                        <CardBody className="py-5">
                          <div className="mb-4">
                            <i className="fa fa-table 
										  bg-color-primary 
										  rounded-circle p-3
										  text-color-primary" 
								/>
                          </div>
                          <h6 className="text-color-primary 
										 text-uppercase 
										 font-weight-bold"
							  >
                            {administratives_support}
                          </h6>
                          <p className="description mt-3">
                            {administratives_support}
                          </p>
                          <Button
                            className="mt-4
									   landing-card-button-font-size
									   text-uppercase 
									   button-color-primary 
									   border-0 
									   shadow 
									   btn-rollover-color-primary
									   font-weight-bold
									   py-2 px-4"
							to="/services"
							tag={Link}
                          >
							   Learn more                   
                          </Button>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg="4">
                      <Card className="card-up-hover landing-card shadow mb-5 border-0">
                        <CardBody className="py-5">
                          <div className="mb-4">
                            <i className="fa fa-clock-o 
										  bg-color-success
										  text-color-success 
										  rounded-circle p-3" 
								/>
                          </div>
                          <h6 className="text-color-success 
										 text-uppercase 
										 font-weight-bold"
							  >
                            Bookeeping
                          </h6>
                          <p className="description mt-3">
                            Budget Management
                          </p>
     
                          <Button
                            className="mt-4
									   landing-card-button-font-size
									   card-space 
									   text-uppercase 
									   button-color-success 
									   border-0 
									   shadow 
									   btn-rollover-color-success
									   font-weight-bold
									   py-2 px-4"
                        	to="/services"
							tag={Link}
                          >
							   Learn more                   
                          </Button>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg="4">
                      <Card className="card-up-hover landing-card shadow border-0">
                        <CardBody className="py-5">
                          <div className="mb-4">
                            <i className="fa fa-laptop 
										  bg-color-danger 
										  text-color-danger 
										  rounded-circle p-3" />
                          </div>
                          <h6 className="text-color-danger 
										 text-uppercase 
										 font-weight-bold">
                            IT Support
                          </h6>
                          <p className="description mt-3">
                            Maintenance, Updates and More
                          </p>
	
                          <Button
                            className="mt-4
									   landing-card-button-font-size
									   text-uppercase 
									   button-color-danger 
									   border-0 
									   shadow 
									   btn-rollover-color-danger
									   font-weight-bold
									   py-2 px-4"
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
			</ScrollAnimation>
			  
		  {/*  TWO ROUND CARDS */}			
          <section className="mb-3 two-card-top-space" >
            <Container>
              <Row className="justify-content-center">
                <Col className="mb-5 mb-lg-0" lg="6" md="6">
				  <ScrollAnimation animateIn="fadeInUp">
                  <div className="px-4">
                    <img
                      alt="..."
                      className="rounded-circle center-image make-image-fluid shadow shadow-lg--hover"
                      src={require("../../assets/images/homepgpicv1.jpg")}
                      style={{ width: "200px" }}
                    />
                    <div className="pt-4 text-center">
                      <h5 className="title">
                        <span className="d-block mb-1 round-card-title">Need administrative support?</span>
                        <small className="h6 round-card-description">We can take on any administrative task from big to small. We can make phone calls, prepare itineraries, draft documents, prepare reports based on research and much more! </small>
                      </h5>
                      <div className="mt-3">
                        <Button
                            className="mt-4
									   landing-card-button-font-size
									   text-uppercase 
									   button-color-primary 
									   border-0 
									   shadow 
									   btn-rollover-color-primary
									   font-weight-bold
									   py-2 px-4"
							to="/services"
							tag={Link}
                          >
							   Learn more                   
                          </Button>

                      </div>
                    </div>
                  </div>
				  </ScrollAnimation>
                </Col>
                <Col className="mb-5 mb-lg-0" lg="6" md="6">
				  <ScrollAnimation animateIn="fadeInUp" delay={500}>
                  <div className="px-4">
                    <img
                      alt="..."
                      className="rounded-circle center-image make-image-fluid shadow shadow-lg--hover"
                      src={require("../../assets/images/homepgpic2.jpg")}
                      style={{ width: "200px" }}
                    />
                    <div className="pt-4 text-center">
                      <h5 className="title">
                        <span className="d-block mb-1 round-card-title">Not good with numbers?</span>
                        <small className="h6 round-card-description">
                          No problem! We can create a budget report and assist you to be a
better stewart of your finances all with the
confidentiality you deserve.
                        </small>
                      </h5>
                      <div className="mt-3">
						   <Button
                            className="round-cards-button
									   mt-4
									   landing-card-button-font-size
									   text-uppercase 
									   button-color-danger 
									   border-0 
									   shadow 
									   btn-rollover-color-danger
									   font-weight-bold
									   py-2 px-4"
								to="/services"
								tag={Link}
							 >
							   Learn more                   
                          </Button>				
                      </div>
                    </div>
                  </div>
				  </ScrollAnimation>
                </Col>
              </Row>
            </Container>
          </section>
			
		  <ScrollAnimation animateIn="fadeInUp">
          <section className="landing-form">
			<form onSubmit={this.handleSubmit}>
            <section className="pt-lg-0 section-contact-us">
            <Container>
              <Row className="justify-content-center">
                <Col lg="8">
                  <Card className="bg-gradient-secondary shadow">
                    <CardBody className="p-lg-5">
                      <h4 className="mb-2 landing-form-h4">Got Questions?</h4>
                      <p className="mt-0 mb-5 landing-form-p">
                        Contact us today for a free quote, no obligation. 
                      </p>
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                            	 <i class="fas fa-running landing-form-icon" /> 
                          	</InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Your Name (required)"
                            type="text"
							name="name"
							value={this.state.name}
							onChange={this.handleChange}
                            onFocus={e => this.setState({ nameFocused: true })}
                            onBlur={e => this.setState({ nameFocused: false })}
							className="shadow-sm"
							required
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                            	 <i class="fas fa-envelope landing-form-icon" /> 
                          	</InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Email Address (required)"
                            type="email"
							name="email"
							value={this.state.email}
							onChange={this.handleChange}
                            onFocus={e => this.setState({ emailFocused: true })}
                            onBlur={e => this.setState({ emailFocused: false })}
							className="shadow-sm"
							required
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup className="mb-4">
                        <Input
                          className="form-control-alternative shadow-sm"
                          cols="80"
						  name="message"
						  value={this.state.message}
						  onChange={this.handleChange}
                          placeholder="Type a message..."
                          rows="4"
                          type="textarea"
                        />
					  </FormGroup>						
					  {/* RECAPTCHA CODE*/}
					  
					  <div className="mb-3 justify-content-center row">
						<div>
							<div className={this.state.verifyRequired ? `please-verify` : "please-verify-hide"}>
								Please verify
							</div>
							<div  className={this.state.verifyRequired ? `recaptcha-border` : ""}>
								<div className="m-1">
									<Recaptcha
										sitekey={recapU}
										render="explicit"
										onloadCallback={this.recaptchaLoaded}
										verifyCallback={this.verifyCallback}
									  />
								</div>
							</div>
						</div>
					  </div>
					  
                      <div>
                        <Button
                          block
                          className="btn-round 
									 bg-color-default 
									 btn-rollover-color-default
									 landing-form-submit-text"
                          size="lg"
                          type="submit" 
                        >
                          SEND MESSAGE
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>
		</form>
         </section>
        </ScrollAnimation>
        </main>
      </>
    );
  }
}

Landing.propTypes={
	language: PropTypes.string
}

const mapStateToProps = state =>({
	language: state.language.language.language
})

export default connect(mapStateToProps)(Landing);
