import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import OneResult from '../OneResult/OneResult';
import './SearchResults.css';

const searchResults = (props) => {

	let items = props.items;

	return (
		<div className="SearchResultsContainer">
			{props.getingInfo 
				? <CircularProgress color="secondary" />
				: ( items.length
				? <OneResult
				  	items={items}
						resultAction={props.resultAction} />
				: <p>There are no results</p> )
			}
		</div>
	)
}

searchResults.propTypes = {
	items: PropTypes.array.isRequired,
}

export default searchResults;