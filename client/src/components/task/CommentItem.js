import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Moment from 'react-moment';

const CommentItem = ({
	taskId,
	comment: {_id, text, user, name, date },
	auth
	}) =>{

	return(
		<div className='bg-white p-1 my-1'>
			<div>
				<h4>{text}</h4>
			</div>
			<div>
			  <p className='my-1'>
				  {name}  - Posted on <Moment format='MM/DD/YYYY'>{date}</Moment>
			  </p>
			  
			</div>
		  </div>
	)
}

CommentItem.propTypes = {
	taskId: PropTypes.number.isRequired,
	comment: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth
})

export default connect(mapStateToProps, {})(CommentItem);