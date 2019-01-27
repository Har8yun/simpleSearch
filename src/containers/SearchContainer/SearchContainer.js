import React, { Component } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Aux from '../../hoc/Aux'
import SearchResults from '../../components/SearchResults/SearchResults';
import SavedTournaments from '../../components/SavedTournaments/SavedTournaments';

const API_URL = 'https://api-search.staging.win.gg/search?index=tournament&q=';
const SAVED_KEY = 'savedResults';

class SearchContainer extends Component {

	constructor(props) {
		super(props);

		//check for saved results
		let savedResults = this.getSavedResults();

		this.state = {
			searchValue: '',
    		results: [],
    		getingInfo: false,
    		savedResults,
		}
	}
	

  searchChangeHandler = (event) => {
    this.setState({
      searchValue: event.target.value,
    }, () => {
        this.getInfo();
      }
    )
  }

  getInfo = () => {
    let query = this.state.searchValue;

    //Api requirement - "q" length must be at least 2 characters long.
    if (query.length < 2) {
      return;
    }
    
		this.setState({
			getingInfo: true,
		}, () => {
			axios.get(`${API_URL}${this.state.searchValue}`)
	      .then(({ data }) => {

					let results = [];
		      if (data.length !== 0 && data[0] && data[0]['documents']) {
						results = data[0]['documents']
	      	}

	        this.setState({
	          results,
	          getingInfo: false,
	        })

	      })
	      .catch((response) => console.log('error', response));

			})
  }

  getSavedResults = () => {
  	//check for localStorage support.
		if (typeof localStorage !== 'object') {
			return null;
		}

		return JSON.parse( localStorage.getItem(SAVED_KEY) );
  }

  saveResult = (item) => {
		let items = this.getSavedResults();

		items = items !== null ? items : [];
		let olReadyExists = items.find(element => element.id === item.id);

		if (olReadyExists !== undefined) {
			return alert('Item already saved!')
		}

		items.push(item);
		localStorage.setItem(SAVED_KEY, JSON.stringify(items));
		this.setState({
			savedResults: items,
			searchValue: '',
			results: [],
		})
  }

  removeResult = (item) => {
  	let cnfrm = window.confirm("Are You sure?");

  	if (cnfrm === false) {
  		return;
  	}

		let items = this.getSavedResults();
		let restItems = items.filter((element) => element.id !== item.id)

		if (restItems.length) {
			localStorage.setItem(SAVED_KEY, JSON.stringify(restItems));
			
		} else {
			localStorage.removeItem(SAVED_KEY);
			restItems = null;
		}

		this.setState({savedResults: restItems})
  }

  render() {
		return (
			<Aux>
				<TextField
		      id="standard-search"
		      label="Search Sports"
		      type="search"
		      value={this.state.searchValue}
				  onChange={this.searchChangeHandler} 
		      margin="normal" />
			    {this.state.searchValue.length > 1 && this.state.results.length
			    	? <SearchResults
				        resultAction={this.saveResult}
				        getingInfo={this.state.getingInfo}
				        items={this.state.results} />
				    : null
			    }
	        {this.state.savedResults
	        	? <SavedTournaments
	          		resultAction={this.removeResult}
	          		items={this.state.savedResults} />
	        	: null
	        }
			</Aux>
		)
  }
}

export default SearchContainer;