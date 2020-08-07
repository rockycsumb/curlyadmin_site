import React, {Fragment} from 'react'
import {Spinner} from 'reactstrap';

// import spinner

export default () => (
	
	<Fragment>
		<div className="d-flex justify-content-center">
			<div className="align-items-center">
				<Spinner className="spinner-grow text-warning" />
				<Spinner className="spinner-grow text-warning" />
				<Spinner className="spinner-grow text-warning" />
			</div>
		</div>
			
	</Fragment>
	
)