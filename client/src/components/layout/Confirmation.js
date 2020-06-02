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
import {Route, Redirect} from 'react-router-dom';
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

class Confirmation extends React.Component {
	constructor(props){
		super(props);
		
	}
  
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    
  }
  render() {
	  console.log("these contact props", this.props.location.state);
	
    return (
		<div>
		{!this.props.location.state ? <Redirect to="/login" /> : 
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
			<div class="justify-content-center text-left row">
					<div class="col-lg-8">
						<h2>Dear {this.props.location.state},</h2>
						<p class="mt-1 lead text-muted">
							Thank you for your message!
 							We will contact you shortly to go over the job details. 
							For weekend requests, please allow 1-2 hours response time. 
						</p>
					</div>
				</div>	
		</Container>
        </main>
      </>
		}
			</div>
    );
  }
			
}

export default Confirmation;
