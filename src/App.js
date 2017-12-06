import React, {Component} from 'react';
import ListContacts from "./ListContacts"
import CreateContact from "./CreateContact"
import * as ContactsAPI from './utils/ContactsAPI'
class App extends Component {
    state = {
        contacts: [],
        screen:"list"
    };

    componentDidMount(){
        ContactsAPI.getAll().then(contacts => this.setState({contacts}))
    }

    deleteContact = (contact) => {
        ContactsAPI.remove(contact).then(contact => this.setState(prevState => ({contacts:prevState.contacts.filter(c => c.id != contact.id)})));
    }

    updateScreen = (screenName)=>{
        this.setState({
            screen:screenName,
        })
    }

    render() {
        let {screen} = this.state;
        return (

            <div>
                {screen=="list" &&(
                    <ListContacts onUpdateScreen={this.updateScreen} contacts={this.state.contacts} onDeleteContact={this.deleteContact}/>
                )}
                {screen=="create" && (
                    <CreateContact/>
                )}

            </div>
        )
    }
}

export default App
