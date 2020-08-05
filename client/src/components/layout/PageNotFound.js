import React from "react";
import {Redirect, Link} from 'react-router-dom';
import '../../assets/css/confirmation.css';

// reactstrap components
import {
  Button,
  Container,
  Row,
  Col
} from "reactstrap";

class PageNotFound extends React.Component {
	constructor(props){
		super(props);
		
	}

  render() {
	  	let firstName = "";
		if (this.props.location.state){
			let fullName = this.props.location.state;
			fullName = fullName.split(' ');
			firstName = fullName[0];
			let firstLetterName = firstName[0].toUpperCase();
			firstName = firstLetterName + firstName.slice(1);
	}
	
    return (
		<div>
			{!this.props.location.state ? <Redirect to="/" /> : 
		<>
			 <main ref="main">
				<div style={{height: "10em"}}>
					<span />
					<span />
					<span />
					<span />
					<span />
					<span />
					<span />
				</div>
				<Container className="py-lg-md d-flex Confirmation-container">
                	<div className="col px-0 justify-content-center">
						<Row className="justify-content-center">
							<Col lg="6" className="message-container">
							  <span className="confirmation-lead-text">404 Page</span>
							  <p className="confirmation-lead-text-2 text-black">
								This is an inactive page, click the links above or below to get back on track. :D
							  </p>
							  <div className="">
								<Button
								  outline
								  className="btn btn-outline-dark mr-2 mb-3 mb-sm-0 shadow-sm"
								  to="/about"
								  tag={Link}
								>
								  <span className="">About</span>
								</Button>
								<Button
								  outline
								  className="btn btn-outline-dark mb-3 mb-sm-0 shadow-sm"
								  to="/"
								  tag={Link}
								>
								  <span className="">
									Home
								  </span>
								</Button>
							  </div>
							</Col>
                  		</Row>
					</div>
				</Container>
			</main>
		</>
		}
		</div>
    );
  }	
}

export default PageNotFound;
