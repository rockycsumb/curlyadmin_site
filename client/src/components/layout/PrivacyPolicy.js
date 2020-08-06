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

class PrivacyPolicy extends React.Component {
	constructor(props){
		super(props);
		
	}

  render() {
    return (
		<div>
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
							  <h3 className="font-weight-bold text-black">
								Privacy Policy
							  </h3>
		
							  <span className="confirmation-lead-text">Privacy Policy</span>
							  
							  <p className="confirmation-lead-text-2 text-black">
								-Upon registering we save information into a database <br />
								- Information is not sold <br />
								- Tasks and communication is stored for record purposes  <br />
								- Once a task is agreed upon it is locked and cannot be changed  <br />
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

export default PrivacyPolicy;
