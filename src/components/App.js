import React, {Component} from 'react';
import {Route} from 'react-router-dom'
import ListContactsFactory from "../components/ListContacts"
import CreateContactFactory from "../components/CreateContact"
import * as ContactsAPI from '../utils/ContactsAPI'
class App extends Component {
  state = {
    contacts: [],
  };

  componentDidMount(){
    ContactsAPI.getAll().then(contacts => this.setState({contacts}))
  }

  deleteContact = (contact) => {
    ContactsAPI.remove(contact).then(contact => this.setState(prevState => ({contacts:prevState.contacts.filter(c => c.id !== contact.id)})));
  }

  addContact = (contact) => {
    console.log(contact);
    ContactsAPI.create(contact).then(newContact => {
      this.setState(prevState=> ({
        contacts:prevState.contacts.concat([ newContact ])
      }))
    })
  }

  render() {
    const CreateContact = CreateContactFactory(React);
    const ListContacts = ListContactsFactory(React);
    return (
      <div>
        <Route exact path="/" render={() =>(
            <ListContacts
              contacts={this.state.contacts}
              onDeleteContact={this.deleteContact}
              />
          )}
          />
        <Route path="/create" render={({ history }) => (
            <CreateContact  onAddContact={(contact) =>{
                this.addContact(contact)
                history.push("/")
              }}/>
            )} />
          </div>
        )
      }
    }

    export default App
