// import React, {Component} from 'react'
import { Link } from 'react-router-dom'

export default (React, { Component } = React) => {
  class FilterBar extends Component {

    updateFilterHandler = ({target:{value:search}}) => {
      const { updateFilter} = this.props;
      updateFilter(search);
    }

    render(){
      const { search } = this.props;
      return(
        <div className="list-contacts-top">
          <input
            className="search-contacts"
            type="text"
            placeholder="Search Contacts"
            value={search}
            onChange={this.updateFilterHandler}/>
          <Link
            to="/create"
            className="add-contact">Add Contact</Link>
        </div>
      )
    }
  }
  return FilterBar
}
