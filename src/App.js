import React, {Component} from 'react';
import {Route} from 'react-router-dom'
import ListContacts from "./ListContacts"
import CreateContact from "./CreateContact"
import * as ContactsAPI from './utils/ContactsAPI'
class App extends Component {
    state = {
        contacts: [],
    };

    componentDidMount(){
        ContactsAPI.getAll().then(contacts => this.setState({contacts}))
    }

    deleteContact = (contact) => {
        ContactsAPI.remove(contact).then(contact => this.setState(prevState => ({contacts:prevState.contacts.filter(c => c.id != contact.id)})));
    }

    render() {
        let {screen} = this.state;
        return (

            <div>
                <Route exact path="/" render={() =>(
                        <ListContacts
                        contacts={this.state.contacts}
                        onDeleteContact={this.deleteContact}
                        />
                    )}
                />
            <Route path="/create" component={CreateContact} />


            </div>
        )
    }
}

export default App
