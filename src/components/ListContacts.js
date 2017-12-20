import React, {Component} from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import { Link } from 'react-router-dom'


/*
EXISTEM DOIS JEITOS DE FAZER UM COMPONENT DO REACT.
UM DELES É ATRAVÉS DA CLASSE, QUE É RECOMENDADO PRA QUANDO VOCÊ TEM MAIS QUE APENAS O MÉTODO "RENDER"
O OUTRO É PELA FUNÇÃO TRADICIONAL (FUNCTION(PROPS){}) QUE RECEBE AS PROPRIEDADES E RETORNA A UI.
*/

// // JEITO 1
// class ListContacts extends Component{
//     render(){
//         let contacts = this.props.contacts;
//         return(
//             <ol className="contact-list">
//                 {contacts.map((contact)=>(
//                     <li key={contact.id}  className="contact-list-item">
//                         <div>
//                             <div className="contact-avatar" style={{backgroundImage:`url(${contact.avatarURL})`}}></div>
//                         </div>
//                         <div className="contact-details">
//                             <p>{contact.name}</p>
//                             <p>{contact.email}</p>
//                         </div>
//                         <button className="contact-remove">
//                             Remove
//                         </button>
//                     </li>
//                 ))}
//             </ol>
//         )
//     }
// }

//JEITO 2
// function ListContacts(props){
//     let contacts = props.contacts;
//     return(
//         <ol className="contact-list">
//             {contacts.map((contact)=>(
//                 <li key={contact.id}  className="contact-list-item">
//                     <div>
//                         <div className="contact-avatar" style={{backgroundImage:`url(${contact.avatarURL})`}}></div>
//                     </div>
//                     <div className="contact-details">
//                         <p>{contact.name}</p>
//                         <p>{contact.email}</p>
//                     </div>
//                     <button className="contact-remove"  onClick={()=>{props.deleteContact(contact)}}>
//                         Remove
//                     </button>
//                 </li>
//             ))}
//         </ol>
//     )
// }

export default React => {
  class ListContacts extends Component{
    state = {
      query:"",
    }

    updateQuery = ({target: { value }}) => {
      // const value = event.target.value;
      this.setState({query:value});
    }

    clearQuery = () => {
      this.setState({query:""});
    }

    render(){
      const { contacts, onDeleteContact } = this.props
      let showingContacts;
      const {query} = this.state
      if(!!query){
        const match = new RegExp(escapeRegExp(query),"i");
        showingContacts = contacts.filter(contact => match.test(contact.name))
      }
      else{
        showingContacts = contacts;
      }

      showingContacts.sort(sortBy("name"))

      return(
        <div className="list-contacts">
          <div className="list-contacts-top">
            <input
              className="search-contacts"
              type="text"
              placeholder="Search Contacts"
              value={query}
              onChange={this.updateQuery}/>
            <Link
              to="/create"
              className="add-contact">Add Contact</Link>
          </div>

          {showingContacts.length !== contacts.length && (
            <div className="showing-contacts" >
              <span>Showing {showingContacts.length} out of {contacts.length}</span>
              <button onClick={this.clearQuery}>Show all</button>
            </div>
          )}

          <ol className="contact-list">
            {showingContacts.map((contact)=>(
              <li key={contact.id}  className="contact-list-item">
                <div>
                  <div className="contact-avatar" style={{backgroundImage:`url(${contact.avatarURL})`}}></div>
                </div>
                <div className="contact-details">
                  <p>{contact.name}</p>
                  <p>{contact.email}</p>
                </div>
                <button className="contact-remove"  onClick={()=>{onDeleteContact(contact)}}>
                  Remove
                </button>
              </li>
            ))}
          </ol>
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
