import React, {Component} from 'react'

class SearchBar extends Component{
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