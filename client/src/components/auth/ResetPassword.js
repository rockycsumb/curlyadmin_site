import React, { useState, Fragment } from "react";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {setAlert} from '../../actions/alert';
import PropTypes from 'prop-types';
import apiURL from '../../utils/apiURL';
import axios from "axios";

import {
	Form,
	Row,
	Col,
	Container,
	Input,
	Button
} from 'reactstrap';

const ResetPassword = (props) => {
	
    const [password, setPassword] = useState("");
	const [expiredLink, setExpiredLink] = useState(false);
	const checkLink = () => {
		const dateNow = Date.now();
		const body = {
			id: props.match.params.id
		}
		axios({
			url: `${apiURL}api/auth/resId`,
            data: body,
            method: "post"		
		
		}).then(res =>{
			const linkDate = new Date(res.data.reqResStamp);
			const linkTime = linkDate.getTime();
			const timeElapsed = ( dateNow - linkTime ) / 1000;
			
			if(timeElapsed > 60){
				setExpiredLink(true);
			}
		})		
	}
	
    const submitHandler = (e) => {
        e.preventDefault();
		
        const body = {
            password,
            id: props.match.params.id
        };
		
        axios({
            url: "https://mernstack-shrnu.run-us-west2.goorm.io/api/auth/reset",
            data: body,
            method: "patch"
        }).then(() => {
			props.setAlert("Password Updated", "success");
            props.history.push('/login');
        })
    }
	
	const linkExpired = (
		<div>
			<p>This link expired, please resend password reset.</p>
			<Button
					  outline
					  className="btn btn-outline-dark mb-3 mb-sm-0 shadow-sm"
					  to="/forgotpass"
					  tag={Link}
					>
					  <span className="">
						Forgot Password
					  </span>
					</Button>
		</div>
	)
	
	const showForm = (
		<Form onSubmit={submitHandler}>
            <Row>
                <Input
                    type="password"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="New Password"
                />
            </Row>
            <Row>
                <Button className="mt-2">Save</Button>
            </Row>
        </Form>
	)

    return (
		<main className="Login-main">
			<section className="">
				<div className="space">
				</div>
				<div className="container">
					<div className="d-flex justify-content-center h-100">
						<div className="ForgotPassword-card shadow border-2">
							<div className="card-header text-center">
								<h3>Reset Password</h3>
							</div>
							<div className="card-body">
								<Fragment>
									{checkLink()}
									{expiredLink ? linkExpired : showForm}
								</Fragment>
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>	
    );
};

ResetPassword.propTypes = {
	setAlert: PropTypes.func.isRequired
}

export default connect(null, {setAlert})(ResetPassword);

