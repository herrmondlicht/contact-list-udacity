// import React, {Component} from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import { Link } from 'react-router-dom'
import FilterBarFactory from './FilterBar';
import ResultListFactory from './ResultList'


export default (React, { Component } = React) => {
  const FilterBar = FilterBarFactory(React);
  const ResultList = ResultListFactory(React);
  class ListContacts extends Component{
    state = {
      search:"",
    }

    updateFilter = (value) => {
      this.setState({search:value});
    }

    clearFilter = () => {
      this.setState({search:""});
    }

    render(){
      const { contacts, onDeleteContact } = this.props;
      let showingContacts;
      const {search} = this.state;
      if(!!search){
        const match = new RegExp(escapeRegExp(search),"i");
        showingContacts = contacts.filter(contact => match.test(contact.name))
      }
      else{
        showingContacts = contacts;
      }

      showingContacts.sort(sortBy("name"))

      return(
        <div className="list-contacts">
          <FilterBar updateFilter={this.updateFilter} search={search} />
          {showingContacts.length !== contacts.length && (
            <div className="showing-contacts" >
              <span>Showing {showingContacts.length} out of {contacts.length}</span>
              <button onClick={this.clearFilter}>Show all</button>
            </div>
          )}
          <ResultList contacts={showingContacts} onDeleteContact={onDeleteContact} />
        </div>
      )
    }

  }

  ListContacts.propTypes = {
    contacts:PropTypes.array.isRequired,
    onDeleteContact:PropTypes.func.isRequired,
  }

  return ListContacts;
}
