import React, { Component } from "react"
import { Link } from "react-router-dom"
import ImageInput from "../ImageInput"
import serializeForm from "form-serialize"


export default (React, serialize = serializeForm) => {
  class CreateContact extends Component{

    handleSubmit = (e) => {
      const { onAddContact } = this.props;
      e.preventDefault();
      const values = serialize(e.target, {hash:true});
      !!onAddContact && (onAddContact(values));
    }

    render(){
      return(
        <div>
          <Link className="close-create-contact" to="/">Close</Link>
          <form onSubmit={this.handleSubmit} className="create-contact-form">
            <ImageInput
              className="create-contact-avatar-input"
              name="avatarURL"
              maxHeight={64}
              />
            <div className="create-contact-details">
              <input type="text" name="name" placeholder="name"/>
              <input type="text" name="email" placeholder="email"/>
              <button>Add Contact</button>
            </div>
          </form>
        </div>
      )
    }
  }

  return CreateContact;
}
