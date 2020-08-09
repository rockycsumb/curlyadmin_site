import React, { useState } from "react";
import apiURL from '../../utils/apiURL';
import {Link} from 'react-router-dom';
import axios from "axios";

import {
	Form,
	Row,
	Col,
	Container,
	Input,
	Button
} from 'reactstrap';

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
	const [noUser, setNoUser] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();
        const body = {
            email,
        };
        axios({
            url: `${apiURL}api/demo/auth/forgot`,
            data: body,
            method: "post",
        }).then(res => {
			if(res.data === 'No account exists') {
				setNoUser(true);
			} else {
				setEmailSent(true)
			}
		})
    }

    let body;
    if (emailSent) {
        body = (
			<div>
				<span>An email with reset instructions is on its way</span>
				<p>feel free to browse around until you receive the reset instructions.</p>
					<Button
					  outline
					  className="btn btn-outline-dark mb-3 mb-sm-0 shadow-sm"
					  to="/demo/curlyadmin"
					  tag={Link}
					>
					  <span className="">
						Home
					  </span>
					</Button>
			</div>
            
        );
    } else {
        body = (
            <Form onSubmit={submitHandler}>
                <Row>
                    <Input
                        name="email"
                        placeholder="email"
                        type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </Row>
				{!noUser ? "" : 
				<Row>
					<p className="text-danger ml-1">User does not exist</p>
				</Row>}
				
                <Row>
                    <Button className="mt-2">Get reset link</Button>
                </Row>
            </Form>
        );
    }

    return (
		<main className="Login-main">
			<section className="">
				<div className="space">
				</div>
				<div className="container">
					
					<div className="d-flex justify-content-center h-100">
						<div className="ForgotPassword-card shadow border-2">
							<div className="card-header text-center">
								<h3>Forgot Password</h3>
							</div>
							<div className="card-body">
								{emailSent ? "" : <p>Please enter the email you used to sign up:</p>}
								{body}
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>	
    );
};

export default ForgotPassword;