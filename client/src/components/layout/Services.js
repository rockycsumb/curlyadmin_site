import React from "react";
import {Link, withRouter} from 'react-router-dom';
import './Services.css';
// nodejs library that concatenates classes

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
		console.log("from service page", evt.target.name);
		this.setState({serviceLevel: evt.target.name})
		this.props.history.push({
			pathname: '/contact',
			state: evt.target.name
		});
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
          <section className="section section-lg pt-lg-5">
            <Container>
				<div class="justify-content-center text-center mb-lg-1 row">
					<div class="col-lg-8">
						<h2 class="display-3">Service Pricing</h2>
						<p class="lead text-muted">
							Prices are based on price per task. Select how many tasks you will like, then assign your task details. Tasks are an average of 20 minutes, price for projects or more complex items can be separated into tasks. Please contact us, we are happy to assist you for best plan or project.
						</p>
					</div>
				</div>	
              <Row className="justify-content-center mt-4">
                <Col lg="12">
                  <Row className="row-grid">
                    <Col lg="4">
                      <Card className="card-lift--hover shadow border-0 text-center">
                        <CardBody className="py-3">
							{/*
                          <div className="icon icon-shape icon-shape-primary rounded-circle mb-4">
                            <i className="fa fa-table" />
                          </div>
						  */}
                          <h3 className="text-primary text-uppercase">
                            Basic Plan
                          </h3>
                          <p className="description Services-description">
							  <div className="Services-task-amount">5</div>
                            Request Per month
                          </p>
							<hr className="my-1 mb-3" />
                          <Button
                            className="mt-1"
                            color="primary"
							  to="/contact"
							  tag={Link}
							  name="basic"
							  onClick={this.handleClick}
                          >
							   $35 MONTHLY
                          </Button>
						  <p className="description mt-3">
                            $7/Request
                          </p>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg="4">
                      <Card className="card-lift--hover shadow border-0 text-center">
                        <CardBody className="py-3">
							{/*
                          <div className="icon icon-shape icon-shape-primary rounded-circle mb-4">
                            <i className="fa fa-table" />
                          </div>
						  */}
                          <h3 className="text-warning text-uppercase">
                            Premium Plan
                          </h3>
                          <p className="description Services-description">
							  <div className="Services-task-amount">15</div>
                            Request Per month
                          </p>
							<hr className="my-1 mb-3" />
                          <Button
                            className="mt-1"
                            color="warning"
							to="/contact"
							  name="premium"
							  onClick={this.handleClick}
							tag={Link}
                          >
							  $90 MONTHLY
                          </Button>
							
						  <p className="description mt-3">
                            $6/Request
                          </p>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg="4">
                      <Card className="card-lift--hover shadow border-0 text-center">
                        <CardBody className="py-3">
							{/*
                          <div className="icon icon-shape icon-shape-primary rounded-circle mb-4">
                            <i className="fa fa-table" />
                          </div>
						  */}
                          <h3 className="text-success text-uppercase">
                            Daily Plan
                          </h3>
                          <p className="description Services-description">
							  <div className="Services-task-amount">30</div>
                            Request Per month
                          </p>
							<hr className="my-1 mb-3" />
                          <Button
                            className="mt-1"
                            color="success"
							  to="/contact"
							  name="daily"
							  onClick={this.handleClick}
							  tag={Link}
                          >
							  $150 MONTHLY
                          </Button>
						  <p className="description mt-3">
                            $5/Request
                          </p>
                        </CardBody>
                      </Card>
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
}

export default withRouter(Services);
