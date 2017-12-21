

export default (React, { Component } = React) => {
  class ResultList extends Component {
    // deleteContactHandler = ({target:{attributes:{contact:{value}}}}) => {
    //   const contact = JSON.parse(value);
    //   const { onDeleteContact } = this.props;
    //   onDeleteContact(contact);
    // }
    render(){
      const { contacts=[] , onDeleteContact} = this.props;
      return (
        <ol className="contact-list">
          {contacts.map((contact)=>(
            <li key={contact.id}  className="contact-list-item">
              <div>
                <div className="contact-avatar" style={{backgroundImage:`url(${contact.avatarURL})`}}></div>
              </div>
              <div className="contact-details">
                <p>{contact.name}</p>
                <p>{contact.email}</p>
              </div>
              <button className="contact-remove" onClick={() => {onDeleteContact(contact)}}>
                Remove
              </button>
            </li>
          ))}
        </ol>
      )
    }
  };
  return ResultList;
}
