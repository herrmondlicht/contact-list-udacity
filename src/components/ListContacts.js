// import React, {Component} from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import FilterBarFactory from './FilterBar'
import ShowingInfoFactory from './ShowingInfo'
import ResultListFactory from './ResultList'


export default (React, { Component } = React) => {
  const FilterBar = FilterBarFactory(React);
  const ResultList = ResultListFactory(React);
  const ShowingInfo = ShowingInfoFactory(React);
  class ListContacts extends Component {
    state = {
      search:"",
    }

    updateFilter = (value) => {
      this.setState({search:value});
    }

    filterBySearch(contacts){
      const { search } = this.state;
      let filteredContacts = [];
      if(!!search){
        const match = new RegExp(escapeRegExp(search),"i");
        filteredContacts = contacts.filter(contact => match.test(contact.name))
      }
      else{
        filteredContacts = contacts;
      }
      filteredContacts.sort(sortBy("name"))
      return filteredContacts;
    }

    clearFilter = () => {
      this.setState({search:""});
    }

    render(){
      const { contacts, onDeleteContact } = this.props;
      const { search } = this.state;
      let showingContacts = this.filterBySearch(contacts);

      return(
        <div className="list-contacts">
          <FilterBar updateFilter={this.updateFilter} search={search} />
          <ShowingInfo totalLength={contacts.length} showingLength={showingContacts.length} clearFilter={this.clearFilter} />
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
