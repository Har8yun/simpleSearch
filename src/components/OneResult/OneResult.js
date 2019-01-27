import React from 'react';
import Close from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import './OneResult.css';

const oneResult = props => {

	let divs = props.items.map( item => 
		<div className="flexContainer"
		  key={item.id}
		  onClick={ () => props.resultAction(item) }>
			<div>
				<img className="img" src={item.image} alt={item.title}/>
			</div>
			<div className="textEllipsis">
				<p><b>{item.title}</b></p>
				<p>{item.description}</p>
				{props.remove 
					? <Close className="deleteIcon" />
					: null
				}
			</div>
		</div>
	);

	return (
		<div className="flexWrap" >
			{divs}
		</div>
	)
}

oneResult.propTypes = {
	items: PropTypes.array.isRequired,
}

export default oneResult;