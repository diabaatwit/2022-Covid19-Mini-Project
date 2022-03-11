import React, {Component} from 'react';
import '../css/table.css'
/**
 * Renders the search bar
 */
class SearchBar extends Component{
    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div id="search-container">
                <p id="search-label">Search:</p>
                <input className="search-bar" type="text"
                value={this.props.searchTerm}
                onChange={event => {
                this.props.setSearchTerm(event.target.value)} }/>
            </div>
          )
    }
  
}

export default SearchBar;