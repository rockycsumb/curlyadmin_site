import React from "react";
import {Link, withRouter} from 'react-router-dom';
import Footer from '../Footers/Footer.js';
import '../../assets/css/Services.css';
import ScrollAnimation from 'react-animate-on-scroll';

// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardBody,
  Container,
  Row,
  Col
} from "reactstrap";

class Services extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			serviceLevel: ""
		}
		this.handleClick = this.handleClick.bind(this);
	}
	
	handleClick(evt){
		evt.preventDefault();
		this.setState({serviceLevel: evt.target.name})
		this.props.history.push({
			pathname: '/contact',
			state: evt.target.name
		});
	}

  render() {
    return (
      <>
        <main ref="main" className="services-background">
          <div className="services-background" style={{height: "80px"}}>
            <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
          </div>
          <section className="mt-4 pt-lg-5 services-background">
            <Container>
				<div className="justify-content-center text-center mb-lg-1 row">
					<div className="col-lg-8">
					
						<h2 className="font-weight-bold mb-4 text-color-default services-header-h2">Service Pricing</h2>
						
						<ScrollAnimation animateIn="fadeIn">
						<p className="text-muted lead-text">
							Plans are set based on the quantity of small tasks. To begin, please select a plan, then
							provide task(s) details. Individual tasks can be up to 20 minutes. For pricing for much
							more complex tasks or projects, please contact us, we are happy to assist you with a
							quote. <br /><em>*IT support pricing is not included here. To get more information please contact us.</em> 
						</p>
						</ScrollAnimation>
					</div>
				</div>
			<ScrollAnimation animateIn="fadeInUp">
              <Row className="justify-content-center mt-4 services-cards mb-5 pb-5">
                <Col lg="12">
                  <Row className="row-grid">
                    <Col lg="4">
                      <Card className="card-up-hover mb-3 shadow border-0 text-center">
                        <CardBody className="py-3">
                          <h3 className="text-color-primary Services-card-h3 text-uppercase">
                        	BASIC ADMIN
                          </h3>
                          <div className="Services-description">
							  <div className="Services-task-amount">$35</div>
                          </div>
							<hr className="my-1 mb-1" />
							<div className="card-text-description">
								<div className="card-paragraph-description">
									<div className="description mt-3">
										<ul className="list-unstyled">
											<li><i className="fas fa-angle-right card-list-bullet" />Monthly plan</li>
											<li><i className="fas fa-angle-right card-list-bullet" />up to <span className="font-weight-bold">5</span> tasks</li>
										</ul>
									</div>
								</div>
							</div>
                          <Button
                            className="mt-1 shadow-sm border-0 button-color-primary btn-rollover-color-primary"
							  to="/contact"
							  tag={Link}
							  name="basic"
							  onClick={this.handleClick}
                          >
							  <span className="card-button-text">
							  	SELECT
							  </span>
                          </Button>
                        </CardBody>
                      </Card>
                    </Col>
                   <Col lg="4">
                      <Card className="card-up-hover mb-3 shadow border-0 text-center">
                        <CardBody className="py-3">
                          <h3 className="text-color-danger Services-card-h3 text-uppercase">
                        	 SUPER ADMIN
                          </h3>
                          <div className="description Services-description">
							  <div className="Services-task-amount">$90</div>
                          </div>
							<hr className="my-1 mb-1" />
							<div className="card-text-description">
								<div className="card-paragraph-description">
									<div className="description mt-3">
										<ul className="list-unstyled">
											<li><i className="fas fa-angle-right card-list-bullet" />Monthly plan</li>
											<li><i className="fas fa-angle-right card-list-bullet" />up to <span className="font-weight-bold">15</span> tasks</li>
										</ul>
									</div>
								</div>
							</div>
                          <Button
                            className="mt-1  shadow-sm border-0 button-color-danger btn-rollover-color-danger"
							  to="/contact"
							  tag={Link}
							  name="premium"
							  onClick={this.handleClick}
                          >
							  <span className="card-button-text">
							  	SELECT
							  </span>
                          </Button>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg="4">
                      <Card className="card-up-hover mb-3 shadow border-0 text-center">
                        <CardBody className="py-3">
                          <h3 className="text-color-success Services-card-h3 text-uppercase">
                        	 CURLY ADMIN
                          </h3>
                          <div className="description Services-description">
							  <div className="Services-task-amount">$150</div>
                          </div>
							<hr className="my-1 mb-1" />
							<div className="card-text-description">
								<div className="card-paragraph-description">
									<div className="description mt-3">
										<ul className="list-unstyled">
											<li><i className="fas fa-angle-right card-list-bullet" />Monthly plan</li>
											<li><i className="fas fa-angle-right card-list-bullet" />up to <span className="font-weight-bold">30</span> tasks</li>
										</ul>
									</div>
								</div>
							</div>
                          <Button
                            className="mt-1 shadow-sm border-0 button-color-success btn-rollover-color-success"
							  to="/contact"
							  tag={Link}
							  name="daily"
							  onClick={this.handleClick}
                          >
							  <span className="card-button-text">
							  	SELECT
							  </span>
                          </Button>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
			  </ScrollAnimation>
            </Container>
          </section>
        </main>

      </>
    );
  }
}

export default withRouter(Services);
