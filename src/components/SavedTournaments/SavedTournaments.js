import React from 'react';
import PropTypes from 'prop-types';
import OneResult from '../OneResult/OneResult';
import './SavedTournaments.css';

const savedTournaments = (props) => {

	let items = props.items;

	return (
		<div className="savedTournamentsContainer" >
		{items
			? <OneResult
					items={items}
        	resultAction={props.resultAction}
        	remove={true} />
  		: null
		}
		</div>
	)
}

savedTournaments.propTypes = {
	items: PropTypes.array.isRequired,
}

export default savedTournaments;