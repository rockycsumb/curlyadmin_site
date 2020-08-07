import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addComment} from '../../actions/taskDemo';

const CommentForm = ({taskId, addComment}) =>{
	const [text, setText] = useState('');
	
	
	return(
		<div>
			<div className='post-form'>
				<div className="row">
					<div className="col">
						<h5 className="h2 font-weight-bold mb-0 card-title">Comments...</h5>
					</div>
				</div>
				<hr />
				<form
					className='form my-1'
					onSubmit={e => {
					  e.preventDefault();
					  addComment(taskId, { text });
					  setText('');

					}}
				  >
					<div className="form-group">
						<div className="row">
							<div className="col">
								<input
									className="form-control-alternative form-control form-inline" 
									id="input-text"
									type="text"
									name="text"
									value={text}
									onChange={e => setText(e.target.value)}
									required
								/>
							</div>
							<div className="col">
								<input type='submit' className='btn btn-dark' value='Post' />
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	)
}

CommentForm.propTypes = {
	addComment: PropTypes.func.isRequired
}

export default connect(null, {addComment})(CommentForm);